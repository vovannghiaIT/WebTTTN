const VouchersModal = require("../models/vouchers");

//GET ALL
export const getVouchersAllService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await VouchersModal.find({}).sort({
        create_at: "desc",
        updated_at: "desc",
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get Vouchers.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
//Insert
export const insertVouchersService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const newCreate = new VouchersModal({
        code: body.code,
        date_start: body.date_start,
        date_end: body.date_end,
        price: body.price,
        create_by: body.create_by,
        update_by: body.update_by,
      });
      const response = await newCreate.save();
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get Vouchers.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

//update
export const updateVouchersService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await VouchersModal.findByIdAndUpdate(
        { _id: body._id },
        {
          $set: {
            code: body.code,
            date_start: body.date_start,
            date_end: body.date_end,
            price: body.price,
            create_by: body.create_by,
            update_by: body.update_by,
          },
        },
        { new: true, useFindAndModify: false }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to update Vouchers.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

//GET ALL
export const deleteVouchersServices = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await VouchersModal.findByIdAndRemove({
        _id: body._id,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to delete Vouchers.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
