import { Router } from 'express';
import {store, UserController} from '../controllers/user.js'

const route = new Router();

route.post('/', UserController.store);

export default route;