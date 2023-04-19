import express = require('express');
import 'express-async-errors';
import bookRouter from './routes/books.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.status(200).send('Express + TypeScript'));
  }

  private routes(): void {
    this.app.use('/books', bookRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };