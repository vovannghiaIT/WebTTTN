const ImagesModel = require("../models/images");

//GET ALL
export const getImagesAllService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await ImagesModel.find({}).sort({
        create_at: "desc",
        updated_at: "desc",
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get images.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
//Inset
export const insertImagesService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(body);
      const newCreate = new ImagesModel({
        code: body.code,
        picture: body.picture,
        displayorder: body.displayorder,
        alt: body.alt,
        title: body.title,
        status: body.status,
        create_by: body.create_by,
        update_by: body.update_by,
      });
      const response = await newCreate.save();
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get images.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

//update
export const updateImagesService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await ImagesModel.findByIdAndUpdate(
        { _id: body._id },
        {
          $set: {
            code: body.code,
            picture: body.picture,
            displayorder: body.displayorder,
            alt: body.alt,
            title: body.title,
            status: body.status,
            create_by: body.create_by,
            update_by: body.update_by,
          },
        },
        { new: true, useFindAndModify: false }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to update images.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteImagesServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await ImagesModel.findByIdAndRemove({
        _id: body._id,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to delete images.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
