import { Router } from 'express';
import CreateUser from './modules/User/Create';

const routes = Router();

routes.post('/create', (req, res) => CreateUser().handle(req, res));

export default routes;