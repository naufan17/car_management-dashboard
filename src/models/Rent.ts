import { Model } from 'objection';

class Rent extends Model {
    static get tableName() {
        return 'rents';
    }
}

export default Rent;