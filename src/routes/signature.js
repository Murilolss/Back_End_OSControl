import { Router } from "express"; 
import { SignatureController } from "../controllers/signature.js";

const route  = new Router();

route.post('/', SignatureController.store)

export default route;