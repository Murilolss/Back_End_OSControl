import { Router } from "express"; 
import { SignatureController } from "../controllers/signature.js";

const route  = new Router();

route.post('/', SignatureController.store);
route.get('/', SignatureController.index);

export default route;