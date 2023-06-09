import * as services from "../services/product";

export const getProductAll = async (req, res) => {
  // const { id } = req.user;
  try {
    const response = await services.getProductAllService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
export const insertProduct = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.insertProductService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.updateProductService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const response = await services.deleteProductServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at product controller: " + error,
    });
  }
};

export const getDetailProduct = async (req, res) => {
  try {
    const response = await services.getProductDetailSlugService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at productDetail controller: " + error,
    });
  }
};
