import express from "express";

import * as orderController from "../controllers/dashbroash";

const router = express.Router();

router.get("/all", orderController.getDashAll);

export default router;
