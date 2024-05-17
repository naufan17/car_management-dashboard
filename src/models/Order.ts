import { Model } from 'objection';
import Car from './Car';

class Order extends Model {
    id!: number;
    car_id!: string;
    duration!: number;
    rent_start!: Date;
    rent_end!: Date;
    total_price!: number;
    status!: string;

    static get tableName() {
        return 'orders';
    }
}

export default Order;