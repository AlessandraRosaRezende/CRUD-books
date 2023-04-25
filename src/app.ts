import express = require('express');
import 'express-async-errors';
import router from './routes';
import errorMiddleware from './middlewares/httpErrorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.routes();

    this.app.use(errorMiddleware);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.status(200).send('Express + TypeScript'));
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
