import { Router } from 'express';
import { UserController } from '../controllers/user.js'

const route = new Router();

route.post('/', UserController.store);
route.get('/', UserController.index);
route.get('/:id', UserController.show);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.del);


export default route;