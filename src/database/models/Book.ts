import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from '.';

export type BookCreationAttributes = Optional<Book, 'id'>;

export type BookModelType = Model<Book, BookCreationAttributes>;

class Book extends Model {
  declare id: number;
  declare title: string;
  declare price: number;
  declare author: string;
  declare isbn: string;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING(100),
  },
}, {
  sequelize: db,
  modelName: 'books',
  timestamps: false,
});

export default Book;
