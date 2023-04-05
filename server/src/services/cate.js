const CateModal = require("../models/cate");

//GET ALL
export const getCateAllService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await CateModal.find({}).sort({
        create_at: "desc",
        updated_at: "desc",
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get cate.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
//Insert
export const insertCateService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(body);
      const newUser = new CateModal({
        name: body.name,
        product_id: body.product_id,
        slug: body.slug,
        imagesId: body.imagesId,
        parent_id: body.parent_id,
        value: body.value,
        displayorder: body.displayorder,
        status: body.status,
        create_by: body.create_by,
        update_by: body.update_by,
      });
      const response = await newUser.save();
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get Cate.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

//update
export const updateCateService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await CateModal.findByIdAndUpdate(
        { _id: body._id },
        {
          $set: {
            name: body.name,
            product_id: body.product_id,
            slug: body.slug,
            imagesId: body.imagesId,
            parent_id: body.parent_id,
            displayorder: body.displayorder,
            value: body.value,
            status: body.status,
            create_by: body.create_by,
            update_by: body.update_by,
          },
        },
        { new: true, useFindAndModify: false }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to update cate.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteCateServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await CateModal.findByIdAndRemove({
        _id: body._id,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to delete cate.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
