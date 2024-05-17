import { Model } from 'objection';
import Car from './Car';

class Order extends Model {
    id!: number;
    car_id!: string;
    cars!: Car[];
    duration!: number;
    rent_start!: Date;
    rent_end!: Date;
    total_price!: number;
    status!: string;
    created_at!: Date;
    updated_at!: Date

    static get tableName() {
        return 'orders';
    }

    static get relationMappings() {
        return {
            cars: {
                relation: Model.BelongsToOneRelation,
                modelClass: Car,
                join: {
                    from: 'orders.car_id',
                    to: 'cars.id'
                }
            }
        };
    }
}

export default Order;