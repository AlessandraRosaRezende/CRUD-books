import SequelizeBook from '../database/models/Book';
import { NewEntity } from '../types';
import { IBook } from '../types/IBook';
import { IModel } from '../types/IModel';

export class BookModel implements IModel<IBook> {

  async find(id: number): Promise<IBook | null> {
    const dbData = await SequelizeBook.findByPk(id);
    if (dbData == null) {
      return null;
    }
    const theBook: IBook = {
      id: dbData.id,
      title: dbData.title,
      price: dbData.price,
      author: dbData.author,
      isbn: dbData.isbn
    }
    return theBook;
  }

  async findAll(): Promise<IBook[]> {
    const dbData = await SequelizeBook.findAll();
    return dbData.map(theBook => {
      const b: IBook = {
        id: theBook.id,
        title: theBook.title,
        price: theBook.price,
        author: theBook.author,
        isbn: theBook.isbn
      }
      return b;
    })
  } 

  async create(data: NewEntity<IBook>): Promise<IBook> {
      const dbData =  await SequelizeBook.create(data);

      const theBook: IBook = {
        id: dbData.id,
        title: dbData.title,
        price: dbData.price,
        author: dbData.author,
        isbn: dbData.isbn
      }
      return theBook;
  }

  async update(id: number, data: Partial<IBook>): Promise<IBook | null>{
    const [affectedRows] = await SequelizeBook.update(data, { where: { id } });
    if (affectedRows == 0) {
      return null;
    }
    return this.find(id);
  }

  async delete(id: number): Promise<number> {
    const destroyedRows = await SequelizeBook.destroy({ where: { id } });
    return destroyedRows;
  }
}
