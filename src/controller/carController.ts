import fs from 'fs';
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import Cars from '../models/Car';
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
    // fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    //   if (err) {
    //       console.log(err);
    //       res.status(500).json({ error: 'Error reading data' })
    //       return;
    //   }

    //   const cars: Car[] = JSON.parse(data);
      
    //   if (!cars) {
    //       res.status(404).json({ error: 'Car not found' });
    //       return;
    //   }

    //   res.status(200).json(cars)
    // })

    try {
        const cars = await Cars.query().withGraphFetched('[rents, options, specs]');
        res.status(200).json(cars)
      
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: 'Car not found' });
    }
}

const getCarById = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    // fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).json({ error: 'Error reading data' })
    //     return;
    //   }

    //   const cars: Car[] = JSON.parse(data).find((car: any) => car.id === id);

    //   if (!cars) {
    //     res.status(404).json({ error: 'Car not found' });
    //     return;
    //   }

    //   res.status(200).json(cars)
    // })    
    
    try {
        const cars = await Cars.query().findById(id).withGraphFetched('[rents, options, specs]');
        res.status(200).json(cars)
      
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: 'Car not found' });
    }
}

const createCar = (req: Request, res: Response) => {
    const { id, plate, manufacture, model, image, capacity, description, transmission, type, year }: Car = req.body;

    fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading data' })
            return;
        }

        const cars: Car[] = JSON.parse(data)
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

        cars.push(payload);
        fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');
        res.status(200).json({ message: 'Data success to create' })
    })
}

const uploadImageCar = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, { 
            folder: 'car', 
            maxFileSize: 2097152 
        });

        res.status(200).json({ message: 'Image successfully uploaded', url: result.secure_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error uploading image' })
    }
}

const updateCar = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { plate, manufacture, model, image, capacity, description, transmission, type, year }: Car = req.body;

    fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading data' })
            return;
        }

      const cars: Car [] = JSON.parse(data)
      const index = cars.findIndex((car: any) => car.id === id)

      if (index === -1) {
          res.status(404).json({ error: 'Car not found' });
          return;
      }

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

      cars[index] = { ...cars[index], ...payload };
      fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');
      res.status(200).json({ message: 'Data success to update' })
    })
}

const deleteCar = (req: Request, res: Response) => {
    const id: string = req.params.id;

    fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error reading data' })
            return;
        }

      const cars: Car[] = JSON.parse(data);
      const index = cars.findIndex((car: any) => car.id === id);

      if (index === -1) {
          res.status(404).json({ error: 'Car not found!' });
          return;
      }

      cars.splice(index, 1);
      fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');
      res.status(200).json({ message: 'Data success to delete' })
    })
}

export { getCar, getCarById, createCar, uploadImageCar, updateCar, deleteCar }