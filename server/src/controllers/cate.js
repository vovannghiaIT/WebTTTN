import * as services from "../services/cate";

export const getCateAll = async (req, res) => {
  // const { id } = req.user;
  try {
    const response = await services.getCateAllService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at cate controller: " + error,
    });
  }
};
export const insertCate = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.insertCateService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at cate controller: " + error,
    });
  }
};
export const updateCate = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.updateCateService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at cate controller: " + error,
    });
  }
};
export const deleteCate = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.deleteCateServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at cate controller: " + error,
    });
  }
};
