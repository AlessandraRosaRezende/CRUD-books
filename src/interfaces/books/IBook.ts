export interface IBook {
  id: number,
  title: string,
  price: number,
  author: string,
  isbn: string,
}

export type INewBook = Omit<IBook, 'id'>;