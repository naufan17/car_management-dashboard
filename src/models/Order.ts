import { Model } from 'objection';

class Order extends Model {

    static get tableName() {
        return 'orders';
    }
}

export default Order;