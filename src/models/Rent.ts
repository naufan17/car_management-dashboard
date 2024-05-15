import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Car from './Car';

// class Rent extends Model {
//   public id!: number;
//   public car_id!: string;
//   public rent_price!: number;
//   public available_at!: Date;
//   public available!: boolean;
// }

interface RentAttributes {
    id: number;
    car_id: string;
    rent_price: number;
    available_at?: Date | null;
    available: boolean;
}
    
interface RentCreationAttributes extends Optional<RentAttributes, 'id'> {}

class Rent extends Model<RentAttributes, RentCreationAttributes> implements RentAttributes {
    public id!: number;
    public car_id!: string;
    public rent_price!: number;
    public available_at?: Date | null;
    public available!: boolean;
}

Rent.init({
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
    rent_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available_at: {
        type: DataTypes.DATE
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Rent',
    tableName: 'Rents',
    timestamps: true
});

Rent.belongsTo(Car, { foreignKey: 'car_id' });

export default Rent;