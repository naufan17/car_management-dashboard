import fs from 'fs';
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

const getCar = async (req: Request, res: Response) => {
  fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, cars: string) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading data!' })
      return;
    }

    res.status(200).json(JSON.parse(cars))
  })
}

const getCarById = async (req: Request, res: Response) => {
  const id = req.params.id;

  fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, cars: string) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading data!' })
      return;
    }

    const car = JSON.parse(cars).find((car: any) => car.id === id);
    res.status(200).json(car)
  })    
}

const createCar = async (req: Request, res: Response) => {
  const { id, plate, manufacture, model, image, capacity, description, transmission, type, year } = req.body;

  fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, cars: string) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading data!' })
      return;
    }

    const car = JSON.parse(cars)
    const payload = { 
      id: id, 
      plate: plate, 
      manufacture: manufacture, 
      model: model, 
      image: image, 
      capacity: capacity, 
      description: description,
      transmission: transmission, 
      type: type, 
      year: year
    }

    car.push(payload);
    fs.writeFileSync('cars.json', JSON.stringify(car), 'utf8');
    res.status(200).json({ message: 'Data success to create' })
  })
}

const uploadImageCar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { 
      folder: 'car', 
      maxFileSize: 2097152 
    });

    res.json({ message: 'Image successfully uploaded', url: result.secure_url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error uploading image!' })
  }
}

const updateCar = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { plate, manufacture, model, image, capacity, description, transmission, type, year } = req.body;

  fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, cars: string) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading data!' })
      return;
    }

    const car = JSON.parse(cars)
    const index = car.findIndex((car: any) => car.id === id)
    const payload = { 
      id: id, 
      plate: plate, 
      manufacture: manufacture, 
      model: model, 
      image: image, 
      capacity: capacity, 
      description: description,
      transmission: transmission, 
      type: type, 
      year: year
    }

    car[index] = { ...car[index], ...payload };
    fs.writeFileSync('cars.json', JSON.stringify(car), 'utf8');
    res.status(200).json({ message: 'Data success to update' })
  })
}

const deleteCar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  fs.readFile('cars.json', 'utf8', (err: NodeJS.ErrnoException | null, cars: string) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading data!' })
      return;
    }

    const car = JSON.parse(cars);
    const index = car.findIndex((car: any) => car.id === id);
    car.splice(index, 1);

    fs.writeFileSync('cars.json', JSON.stringify(car), 'utf8');
    res.status(200).json({ message: 'Data success to delete' })
  })
}

export { getCar, getCarById, createCar, uploadImageCar, updateCar, deleteCar }