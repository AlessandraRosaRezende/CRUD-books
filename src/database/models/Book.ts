import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from '.';
import { Book } from '../../types/Book';

export type BookCreationAttributes = Optional<Book, 'id'>;

type BookModelDefinedType = ModelDefined<Book, BookCreationAttributes>;

export type BookModelType = Model<Book, BookCreationAttributes>;

const BookModel: BookModelDefinedType = db.define('Book', {
  title: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2),
  author: DataTypes.STRING,
  isbn: DataTypes.STRING,
}, {
  tableName: 'books',
  timestamps: false,
  underscored: true,
});

export default BookModel;