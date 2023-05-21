import * as services from "../services/voucher";

export const getVouchersAll = async (req, res) => {
  // const { id } = req.user;
  try {
    const response = await services.getVouchersAllService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Vouchers controller: " + error,
    });
  }
};
export const insertVouchers = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.insertVouchersService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Vouchers controller: " + error,
    });
  }
};
export const updateVouchers = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.updateVouchersService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Vouchers controller: " + error,
    });
  }
};
export const deleteVouchers = async (req, res) => {
  try {
    const response = await services.deleteVouchersServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
