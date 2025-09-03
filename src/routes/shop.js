import { Router } from "express"; 
import {ShopController} from '../controllers/shop'

const route  = Router();

route.post('/', ShopController.store)