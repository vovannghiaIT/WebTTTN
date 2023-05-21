const OrdersModal = require("../models/orders");

//GET ALL
export const getdashBroashMonthService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(body.month);

      const responseOrder = await OrdersModal.find({});
      // console.log("responseOrder", responseOrder);

      let result = [];
      let response = {};
      for (let i = 0; i < responseOrder.length; i++) {
        result = responseOrder[i]?.created_at;
        // console.log(body.month);
        if (result.toLocaleString().slice(3, 5) === body.month) {
          // console.log("responseOrder", responseOrder[i]);
          response = Object.assign(response, responseOrder[i]);
          console.log("response", response);
        }
      }

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get dash.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
