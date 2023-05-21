import express from "express";

import * as vouchersController from "../controllers/voucher";

const router = express.Router();

router.get("/all", vouchersController.getVouchersAll);
router.post("/insert", vouchersController.insertVouchers);
router.put("/update", vouchersController.updateVouchers);
router.delete("/delete", vouchersController.deleteVouchers);

export default router;
