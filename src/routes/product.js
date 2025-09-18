import { Router } from "express";
import { ProductController } from '../controllers/product.js'

const route = new Router();

route.post('/', ProductController.store);
route.get('/:id', ProductController.show);
route.get('/', ProductController.index);
route.delete('/:id', ProductController.del);
route.put('/:id', ProductController.update);


export default route;