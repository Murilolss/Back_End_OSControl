import { Router } from "express"; 
import {ShopController} from '../controllers/shop.js'

const route  = new Router();

route.post('/', ShopController.store);
route.get('/', ShopController.index);


export default route;