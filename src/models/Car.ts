import { Model } from 'objection';
import Rent from './Rent';
import Option from './Option';
import Spec from './Spec';

class Car extends Model {
    static get tableName() {
        return 'cars';
    }

    static get relationMappings() {
        return {
            rents: {
                relation: Model.HasManyRelation,
                modelClass: Rent,
                join: {
                    from: 'cars.id',
                    to: 'rents.car_id'
                }
            },    
            options: {
                relation: Model.HasManyRelation,
                modelClass: Option,
                join: {
                    from: 'cars.id',
                    to: 'options.car_id'
                }
            },
            specs: {
                relation: Model.HasManyRelation,
                modelClass: Spec,
                join: {
                    from: 'cars.id',
                    to: 'specs.car_id'
                }
            }
        };
    }
}

export default Car;