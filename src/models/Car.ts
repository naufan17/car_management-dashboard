import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Rent from './Rent';
import Option from './Option';
import Spec from './Spec';

// class Car extends Model {
//     public id!: string;
//     public plate!: string;
//     public manufacture!: string;
//     public model!: string;
//     public image!: string | null;
//     public capacity!: number;
//     public description!: string | null;
//     public transmission!: string;
//     public type!: string;
//     public year!: number;
// }

interface CarAttributes {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image?: string | null;
    capacity: number;
    description?: string | null;
    transmission: string;
    type: string;
    year: number;
}
    
interface CarCreationAttributes extends Optional<CarAttributes, 'id'> {}

class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    public id!: string;
    public plate!: string;
    public manufacture!: string;
    public model!: string;
    public image?: string | null;
    public capacity!: number;
    public description?: string | null;
    public transmission!: string;
    public type!: string;
    public year!: number;
}

Car.init(
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    plate: {
        type: DataTypes.STRING,
        unique: true
    },
    manufacture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    transmission: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'Car',
        tableName: 'Cars',
        timestamps: true
    }
);
  
Car.hasMany(Rent, { foreignKey: 'car_id' });
Car.hasMany(Option, { foreignKey: 'car_id' });
Car.hasMany(Spec, { foreignKey: 'car_id' });


export default Car;