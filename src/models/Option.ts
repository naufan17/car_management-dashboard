import { Model } from 'objection';

class Option extends Model {
    static get tableName() {
        return 'options';
    }
}

export default Option;