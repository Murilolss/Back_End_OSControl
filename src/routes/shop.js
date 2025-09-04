import { Router } from "express"; 
import {ShopController} from '../controllers/shop.js'

const route  = new Router();

route.post('/', ShopController.store)

export default route;