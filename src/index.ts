import express, { Request, Response, NextFunction } from 'express';
import mount from './handlers/myusers';
import cors from 'cors';
import bodyParser from 'body-parser';
import myorder from './handlers/myorders';
import myproduct from './handlers/myproducts';
const app: express.Application = express();
const adress: string = '0.0.0.0:5000';
const cor = {
  origin:
    'https://stackoverflow.com/questions/62870228/typeerror-the-first-argument-must-be-one-of-type-string-buffer-arraybuffer-a',
  optionsSuccessStatus: 200,
};
app.use(cors(cor));
app.use(bodyParser.json());
app.get('/', function (req: Request, res: Response) {
  res.send('helloworld');
});
mount(app);
myorder(app);
myproduct(app);
app.listen(5000, function () {
  console.log(`statring on port ${adress}`);
});
