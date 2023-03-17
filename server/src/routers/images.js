import express from "express";

import * as imagesController from "../controllers/images";

const router = express.Router();

router.get("/all", imagesController.getImagesAll);
router.post("/insert", imagesController.insertImages);
router.put("/update", imagesController.updateImages);
router.delete("/delete", imagesController.deleteImages);

export default router;
