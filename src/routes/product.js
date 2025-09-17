import { Router } from "express";
import { ProductController } from '../controllers/product.js'

const route = new Router();

route.post('/', ProductController.store);
route.get('/:id', ProductController.show);
route.delete('/:id', ProductController.del);
route.get('/', ProductController.index);


export default route;