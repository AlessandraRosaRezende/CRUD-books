import { Op } from 'sequelize';
import SequelizeBook from '../database/models/Book';
import { IBook, INewBook } from '../interfaces/books/IBook';
import { IBookModel } from '../interfaces/books/IBookModel';

export default class BookModel implements IBookModel {
  find = async (id: number): Promise<IBook | null> => {
    const dbData = await SequelizeBook.findByPk(id);
    if (dbData == null) return null;

    const { title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn };
  };

  findAll = async (): Promise<IBook[]> => {
    const dbData = await SequelizeBook.findAll();
    return dbData.map(({ id, title, price, author, isbn }) => (
      { id, title, price, author, isbn }
    ));
  };

  create = async (data: INewBook): Promise<IBook> => {
    const dbData = await SequelizeBook.create(data);

    const { id, title, price, author, isbn }: IBook = dbData;
    return { id, title, price, author, isbn };
  };

  update = async (id: number, data: Partial<INewBook>): Promise<void> => {
    await SequelizeBook.update(data, { where: { id } });
  };

  delete = async (id: number): Promise<void> => {
    await SequelizeBook.destroy({ where: { id } });
  };

  findByQuery = async (q: string): Promise<IBook[]> => SequelizeBook.findAll({ where: {
    author: {
      [Op.like]: `%${q}%`,
    },
  } });
}
