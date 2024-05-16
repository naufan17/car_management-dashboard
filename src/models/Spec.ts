import { Model } from 'objection';

class Spec extends Model {
    static get tableName() {
        return 'specs';
    }
}

export default Spec;