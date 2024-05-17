import { Request, Response } from 'express';
import Order from '../models/Order';

const getOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.query().withGraphFetched('cars');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const formattedCar = orders.map((order: any) => ({
            id: order.id,
            manufacture: order.cars.manufacture,
            model: order.cars.model,
            type: order.cars.type,
            duration: order.duration,
            rent_start: order.rent_start,
            rent_end: order.rent_end,
            total_price: order.total_price,
            status: order.status,
            created_at: order.created_at,
            updated_at: order.updated_at,
        }));

        res.status(200).json({ orders: formattedCar })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

const getOrderById = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const order = await Order.query().findById(id).withGraphFetched('cars');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const formattedCar = {
            id: order.id,
            // manufacture: order.cars.manufacture,
            // model: order.cars.model,
            // type: order.cars.type,
            duration: order.duration,
            rent_start: order.rent_start,
            rent_end: order.rent_end,
            total_price: order.total_price,
            status: order.status,
            created_at: order.created_at,
            updated_at: order.updated_at,
        };


        res.status(200).json(order)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

const createOrder = async (req: Request, res: Response): Promise<void> => {
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
}

const deleteOrder = async (req: Request, res: Response) => {
}

export { getOrder, getOrderById, createOrder, updateOrder, deleteOrder }