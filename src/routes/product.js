import { Router } from "express";
import { ProductController } from '../controllers/product.js'

const route = new Router();

route.post('/', ProductController.store);

export default route;