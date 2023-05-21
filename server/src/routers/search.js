import express from "express";
import * as searchController from "../controllers/search";

const router = express.Router();

router.get("/search", searchController.getSearchProduct);
router.get("/admin/product", searchController.getSearchProductAdmin);
export default router;
