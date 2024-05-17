import { Request, Response } from 'express';
import { transaction } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import Cars from '../models/Car';
import Rents from '../models/Rent';
import Specs from '../models/Spec';
import Options from '../models/Option';

const getCar = async (req: Request, res: Response) => {
    try {
        const cars = await Cars.query().withGraphFetched('[rents, options, specs]');

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const formattedCar = cars.map((car: any) => ({
            id: car.id,
            plate: car.plate,
            manufacture: car.manufacture,
            model: car.model,
            image: car.image,
            capacity: car.capacity,
            description: car.description,
            transmission: car.transmission,
            type: car.type,
            year: car.year,
            rent_price: car.rents[0].rent_price,
            available_at: car.rents[0].available_at,
            available: car.rents[0].available,
            options: car.options.map((option: any) => option.option),
            specs: car.specs.map((spec: any) => spec.spec)
        }));

        res.status(200).json(formattedCar)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const getCarById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    try {
        const cars = await Cars.query().findById(id).withGraphFetched('[rents, options, specs]');

        if (!cars) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const formattedCar = {
            id: cars.id,
            plate: cars.plate,
            manufacture: cars.manufacture,
            model: cars.model,
            image: cars.image,
            capacity: cars.capacity,
            description: cars.description,
            transmission: cars.transmission,
            type: cars.type,
            year: cars.year,
            rent_price: cars.rents[0].rent_price,
            available_at: cars.rents[0].available_at,
            available: cars.rents[0].available,
            options: cars.options.map((option: any) => option.option),
            specs: cars.specs.map((spec: any) => spec.spec)
        };

        res.status(200).json(formattedCar)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const createCar = async (req: Request, res: Response) => {
    const { car, rent, spec, option } = req.body;
    const car_id = uuidv4();

    try {
        await transaction(Cars.knex(), async (trx) => {
            await Cars.query(trx).insert({ ...car, id: car_id });
            await Rents.query(trx).insert({ ...rent, car_id: car_id });
            await Promise.all(spec.spec.map((spec: any) => Specs.query(trx).insert({ spec: spec, car_id: car_id })));
            await Promise.all(option.option.map((option: any) => Options.query(trx).insert({ option: option, car_id: car_id })));

            res.status(201).json({ message: 'Car created successfully' })
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create car' });
    }
}

const updateCar = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { car, rent, spec, option } = req.body;

    try {
        await transaction(Cars.knex(), async (trx) => {
            await Cars.query(trx).where('id', id).update(car);

            await Rents.query(trx).where('car_id', id).update(rent);

            await Specs.query(trx).where('car_id', id).delete();
            await Promise.all(spec.spec.map((spec: any) => Specs.query(trx).insert({ car_id: id, spec: spec })));

            await Options.query(trx).where('car_id', id).delete();
            await Promise.all(option.option.map((option: any) => Options.query(trx).insert({ car_id: id, option: option })));

            res.status(201).json({ message: 'Car updated successfully' })
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update car' });
    }
}

const deleteCar = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        await transaction(Cars.knex(), async (trx) => {
            await Rents.query(trx).delete().where('car_id', id);
            await Options.query(trx).delete().where('car_id', id);
            await Specs.query(trx).delete().where('car_id', id);
            await Cars.query(trx).deleteById(id);
      
            res.status(204).json({ message: 'Car deleted successfully' })
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete car' });
    }
}

export { getCar, getCarById, createCar, updateCar, deleteCar }