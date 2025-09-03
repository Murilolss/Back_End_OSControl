import { Router } from "express";
import { ProductController } from '../controllers/product'

const route = Router();

route.post('/', ProductController.store);