import { Request, Response } from 'express';
import { transaction } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import Cars from '../models/Car';
import Rents from '../models/Rent';
import Specs from '../models/Spec';
import Options from '../models/Option';

const getCar = async (req: Request, res: Response) => {
    try {
        const cars = await Cars.query().withGraphFetched('[rents]');

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
            available: car.rents[0].available,
            created_at: car.created_at,
            updated_at: car.updated_at,
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
            available: cars.rents[0].available,
            options: cars.options.map((option: any) => option.option),
            specs: cars.specs.map((spec: any) => spec.spec),
            created_at: cars.created_at,
            updated_at: cars.updated_at,
        };

        res.status(200).json(formattedCar)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const createCar = async (req: Request, res: Response): Promise<void> => {
    const {
        plate,
        manufacture,
        model,
        image,
        capacity,
        description,
        transmission,
        type,
        year,
        rent_price,
        rent_start,
        rent_end,
        available,
        option,
        spec
    } = req.body;
    const car_id = uuidv4();
    
    // try {
    //     await transaction(Cars.knex(), async (trx) => {
    //         await Cars.query(trx).insert({
    //             id: car_id,
    //             plate,
    //             manufacture,
    //             model,
    //             image,
    //             capacity,
    //             description,
    //             transmission,
    //             type,
    //             year
    //         });

    //         await Rents.query(trx).insert({
    //             car_id: car_id,
    //             rent_price,
    //             rent_start,
    //             rent_end,
    //             available
    //         });

    //         if (Array.isArray(option)) {
    //             await Promise.all(option.map((opt: string) => 
    //                 Options.query(trx).insert({
    //                     car_id: car_id,
    //                     option: opt
    //                 })
    //             ));
    //         } else {
    //             await Options.query(trx).insert({
    //                 car_id: car_id,
    //                 option
    //             })
    //         }

    //         if (Array.isArray(spec)) {
    //             await Promise.all(spec.map((sp: string) => 
    //                 Specs.query(trx).insert({
    //                     car_id: car_id,
    //                     spec: sp
    //                 })
    //             ));
    //         } else {
    //             await Specs.query(trx).insert({
    //                 car_id: car_id,
    //                 spec
    //             })
    //         }
    //     });
        
    //     res.status(201).json({ message: 'Car created successfully' });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Failed to create car' });
    // }
};

const updateCar = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const {
        plate,
        manufacture,
        model,
        image,
        capacity,
        description,
        transmission,
        type,
        year,
        rent_price,
        rent_start,
        rent_end,
        available,
        option,
        spec
    } = req.body;

    // try {
    //     await transaction(Cars.knex(), async (trx) => {
    //         await Cars.query(trx).findById(id).update({
    //             plate,
    //             manufacture,
    //             model,
    //             image,
    //             capacity,
    //             description,
    //             transmission,
    //             type,
    //             year
    //         });

    //         await Rents.query(trx).where('car_id', id).update({
    //             rent_price,
    //             rent_start,
    //             rent_end,
    //             available
    //         }).onConflict('id').ignore();;

    //         await Options.query(trx).where('car_id', id).delete();
    //         if (Array.isArray(option)) {
    //             await Promise.all(option.map((opt: string) => 
    //                 Options.query(trx).insert({ option: opt })
    //             ));
    //         } else {
    //             await Options.query(trx).insert({ option });
    //         }

    //         await Specs.query(trx).where('car_id', id).delete();
    //         if (Array.isArray(spec)) {
    //             await Promise.all(spec.map((sp: string) => 
    //                 Specs.query(trx).insert({ spec: sp })
    //             ));
    //         } else {
    //             await Specs.query(trx).insert({ spec });
    //         }
    //     })

    //     res.status(201).json({ message: 'Car updated successfully' });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Failed to update car' });
    // }
}

const deleteCar = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const rowsDeleted = await transaction(Cars.knex(), async (trx) => {
            await Rents.query(trx).delete().where('car_id', id);
            await Options.query(trx).delete().where('car_id', id);
            await Specs.query(trx).delete().where('car_id', id);
            return await Cars.query(trx).deleteById(id);
        });

        if (rowsDeleted === 0) {
            res.status(404).json({ message: 'Car not found' });
        }
  
        res.status(201).json({ message: 'Car deleted successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete car' });
    }
}

export { getCar, getCarById, createCar, updateCar, deleteCar }