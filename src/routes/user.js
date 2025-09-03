import { Router } from 'express';
import {store, UserController} from '../controllers/user'

const route = new Router();

route.post('/', UserController.store);

export default route;