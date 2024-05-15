import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Car from './Car';

// class Option extends Model {
//   public id!: number;
//   public car_id!: string;
//   public manufacture!: string;
// }

interface OptionAttributes {
    id: number;
    car_id: string;
    option: string;
}
    
interface OptionCreationAttributes extends Optional<OptionAttributes, 'id'> {}

class Option extends Model<OptionAttributes, OptionCreationAttributes> implements OptionAttributes {
    public id!: number;
    public car_id!: string;
    public option!: string;
}

Option.init({
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
    option: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Option',
    tableName: 'Options',
    timestamps: true
});

Option.belongsTo(Car, { foreignKey: 'car_id' });

export default Option;