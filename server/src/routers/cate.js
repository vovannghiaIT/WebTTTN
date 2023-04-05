import express from "express";

import * as cateController from "../controllers/cate";

const router = express.Router();

router.get("/all", cateController.getCateAll);
router.post("/insert", cateController.insertCate);
router.put("/update", cateController.updateCate);
router.delete("/delete", cateController.deleteCate);

export default router;
