import express from 'express';
import image from './api/image';
const routes = express.Router() as express.Router;
routes.get(
  '/',
  (req: express.Request, res: express.Response): undefined | string => {
    return res.send('you  can palce your image file here') as unknown as string;
  }
);
routes.use('/image', image);
export default routes;
