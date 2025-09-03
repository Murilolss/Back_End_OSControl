import { Router } from "express";
import { ClientController } from '../controllers/client'

const route = Router();

route.post('/', ClientController.store);