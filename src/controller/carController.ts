import fs from 'fs';
import { Request, Response } from 'express';
import Cars from '../models/Car';
import Rents from '../models/Rent';
import Specs from '../models/Spec';
import Options from '../models/Option';

interface Car {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    capacity: number;
    description: string;
    transmission: string;
    type: string;
    year: number;
}

const getCar = async (req: Request, res: Response) => {
    try {
        const cars = await Cars.query().withGraphFetched('[rents, options, specs]');

        // cars.map(car => ({
        //     id: car.id,
        //     plate: car.plate,
        //     manufacture: car.manufacture,
        //     model: car.model,
        //     image: car.image,
        //     rentPerDay: car.rentPerDay,
        //     capacity: car.capacity,
        //     description: car.description,
        //     availableAt: car.availableAt,
        //     transmission: car.transmission,
        //     available: car.available,
        //     type: car.type,
        //     year: car.year,
        //     rents: car.rents.map(rent => ({
        //         rentId: rent.id,
        //         rentPerDay: rent.rentPerDay,
        //         availableAt: rent.availableAt,
        //         rented: rent.rented
        //     })),
        //     options: car.options.map(option => option.option),
        //     specs: car.specs.map(spec => spec.spec)
        // }));

        if (!cars) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(cars)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const getCarById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    try {
        const cars = await Cars.query().findById(id).withGraphFetched('[rents, options, specs]');

        if (!cars) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(cars)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const createCar = async (req: Request, res: Response) => {
    // const { id, plate, manufacture, model, image, capacity, description, transmission, type, year }: Car = req.body;
    const { car, rent, spec, option } = req.body;
    console.log(car)

    try {
            // await Cars.query().insert(car);
            // await Rents.query().insert({ ...rent, car_id: car.id });
            // await Promise.all(spec.map((spec: any) => Specs.query().insert({ ...spec, car_id: car.id })));
            // await Promise.all(option.map((option: any) => Options.query().insert({ ...option, car_id: car.id })));

            res.status(200).json({ message: 'Car created successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create car' });
    }

    // try {
    //     await Cars.query().insert(payload);
    //     res.status(200).json({ message: 'Car created successfully' })
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ error: 'Failed to create car' });
    // }
}

const updateCar = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { plate, manufacture, model, image, capacity, description, transmission, type, year }: Car = req.body;

      const payload: Car = { 
          id, 
          plate, 
          manufacture, 
          model, 
          image, 
          capacity, 
          description, 
          transmission, 
          type, 
          year 
      }

    try {
        const updatedCar = await Cars.query().patchAndFetchById(id, payload);

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json({ message: 'Car updated successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch car' });
    }
}

const deleteCar = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const deletedCar = await Cars.query().deleteById(id);

        if (deletedCar === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json({ message: 'Car deleted successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete car' });
    }
}

export { getCar, getCarById, createCar, updateCar, deleteCar }