import { Request, Response } from 'express';
import { transaction } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import Cars from '../models/Car';
import Orders from '../models/Order';

const getOrder = async (req: Request, res: Response) => {
}

const getOrderById = async (req: Request, res: Response) => {
}

const createOrder = async (req: Request, res: Response): Promise<void> => {
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
}

const deleteOrder = async (req: Request, res: Response) => {
}

export { getOrder, getOrderById, createOrder, updateOrder, deleteOrder }