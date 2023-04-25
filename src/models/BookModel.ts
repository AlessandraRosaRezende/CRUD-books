import { Op } from 'sequelize';
import SequelizeBook from '../database/models/Book';
import { NewEntity } from '../types';
import { IBook } from '../types/books/IBook';
import { IBookModel } from '../types/books/IBookModel';

export class BookModel implements IBookModel {

  async find(id: number): Promise<IBook | null> {
    const dbData = await SequelizeBook.findByPk(id);
    if (dbData == null) return null;

    const { title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn }
  }

  async findAll(): Promise<IBook[]> {
    const dbData = await SequelizeBook.findAll();
    return dbData.map(({ id, title, price, author, isbn }) => (
      { id, title, price, author, isbn }
    ));
  } 

  async create(data: NewEntity<IBook>): Promise<IBook> {
    const dbData =  await SequelizeBook.create(data);

    const { id, title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn }
  }

  async update(id: number, data: Partial<IBook>): Promise<IBook | null>{
    const [affectedRows] = await SequelizeBook.update(data, { where: { id } });
    if (affectedRows == 0) return null;

    return this.find(id);
  }

  async delete(id: number): Promise<void> {
    await SequelizeBook.destroy({ where: { id } });
  }

  async findByQuery(q: string): Promise<IBook[]> {
    return SequelizeBook.findAll({ where: { 
      'author': {
        [Op.like]: `%${q}%`
      }
     }})
  }
}
