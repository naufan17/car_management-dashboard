import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Car from './Car';

// class Spec extends Model {
//   public id!: number;
//   public car_id!: string;
//   public spec!: string;
// }

interface SpecAttributes {
    id: number;
    car_id: string;
    spec: string;

}
    
interface SpecCreationAttributes extends Optional<SpecAttributes, 'id'> {}

class Spec extends Model<SpecAttributes, SpecCreationAttributes> implements SpecAttributes {
    public id!: number;
    public car_id!: string;
    public spec!: string;
}

Spec.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    car_id: {
        type: DataTypes.UUID,
        references: {
            model: 'Cars',
            key: 'id'
        }
    },
    spec: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Spec',
    tableName: 'Specs',
    timestamps: true
});

Spec.belongsTo(Car, { foreignKey: 'car_id' });

export default Spec;