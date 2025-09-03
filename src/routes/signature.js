import { Router } from "express"; 
import { SignatureController } from "../controllers/signature";

const route  = new Router();

route.post('/', SignatureController.store)

export default route;