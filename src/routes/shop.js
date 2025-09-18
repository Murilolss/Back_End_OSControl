import { Router } from "express"; 
import {ShopController} from '../controllers/shop.js'

const route  = new Router();

route.post('/', ShopController.store);
route.get('/', ShopController.index);
route.get('/:id', ShopController.show);
route.delete('/:id', ShopController.del);


export default route;