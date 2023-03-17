import * as services from "../services/images";

export const getImagesAll = async (req, res) => {
  // const { id } = req.user;
  try {
    const response = await services.getImagesAllService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at images controller: " + error,
    });
  }
};
export const insertImages = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.insertImagesService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at images controller: " + error,
    });
  }
};
export const updateImages = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.updateImagesService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at images controller: " + error,
    });
  }
};
export const deleteImages = async (req, res) => {
  try {
    // const user = req.body;
    // console.log(req.body);
    const response = await services.deleteImagesServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at images controller: " + error,
    });
  }
};
