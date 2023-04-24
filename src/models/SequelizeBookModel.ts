import { Op } from 'sequelize';
import Book from '../database/models/Book';
import { NewEntity } from '../types';
import { IBook } from '../types/IBook';
import { IModel } from '../types/IModel';

export class SequelizeBookModel implements IModel<IBook> {
  find = (id: number): Promise<IBook | null> => Book.findByPk(id)

  findAll = (): Promise<IBook[]> => Book.findAll()

  create = (data: NewEntity<IBook>): Promise<IBook> => Book.create(data)

  update = async (id: number, data: Partial<IBook>): Promise<IBook | null> => {
    await Book.update(data, { where: { id } });
    return Book.findByPk(id);
  }

  delete = async (id: number): Promise<void> => {
    await Book.destroy({ where: { id } });
  }

  findByQuery = (q: string): Promise<IBook[]> => {
    return Book.findAll({ where: { 
      'author': {
        [Op.like]: `%${q}%`
      }
     }})
  }
}
