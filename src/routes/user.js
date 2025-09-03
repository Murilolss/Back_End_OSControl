import { Router } from 'express';
import {store, UserController} from '../controllers/user'

const route = Router();

route.post('/', UserController.store);