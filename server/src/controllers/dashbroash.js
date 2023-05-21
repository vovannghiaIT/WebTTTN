import * as services from "../services/dashbroash";

export const getDashAll = async (req, res) => {
  // const { id } = req.user;
  try {
    const response = await services.getdashBroashMonthService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at order controller: " + error,
    });
  }
};
