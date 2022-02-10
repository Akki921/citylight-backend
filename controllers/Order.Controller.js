const Order = require("../models/Order");
module.exports = {
  createOrder: async (OrderData) => {

    return new Promise(async (resolve) => {
      try {
       // console.log('CategoryData',CategoryData);
       Order.findOne({ orderNo: OrderData.orderNo }).exec(
          (err, data) => {
            if (data) {
              console.log('inside first id,',OrderData)
              Order.findOneAndUpdate(
                { _id: data._id },
                {
                  orderNo:OrderData.orderNo,
                  orderDate:OrderData.orderDate,
                  customer:OrderData.customer,
                  startDate:OrderData.startDate,
                  orderValue:OrderData.orderValue,
                  productValue:OrderData.productValue,
                  coupan:OrderData.coupan,
                  product:OrderData.product,
                  qtyperday:OrderData.qtyperday,
                  frequency:OrderData.frequency,
                  address:OrderData.address,
                  locality:OrderData.locality,
                },
                { new: true, upsert: true }
              ).exec((err, data) => {
                if (data) {
                  return  resolve({
                    status: true,
                    message: "order details  is updated !",
                    data: data,
                  });
                } else if (err) {
                  return  resolve({
                    status: false,
                    message: "order details is updating failed !",
                    data: data,
                  });
                }
              })
            } else {
              console.log("create");
              var newOrder= new Order({
                orderNo: OrderData.orderNo,
                orderDate: OrderData.orderDate,
                customer: OrderData.customer,
                startDate: OrderData.startDate,
                orderValue:OrderData.orderValue,
                productValue:OrderData.productValue,
                coupan:OrderData.coupan,
                product:OrderData.product,
                qtyperday:OrderData.qtyperday,
                frequency:OrderData.frequency,
                address:OrderData.address,
                locality:OrderData.locality,
              });
              newOrder.save(async (error, Order) => {
                if (error)
                  return resolve({
                    status: false,
                    message: "Please try after some time",
                  });
                if (Order) {
                  return resolve({
                    status: true,
                    data: Order,
                    message: "order has been created",
                  });
                }
              });
            }
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + error,
        });
      }
    });
  },

  // updateStatus: async (datas) => {
  //   return new Promise(async (resolve) => {
  //       console.log(datas)
  //     try {
  //       Order.findOneAndUpdate(
  //         { _id: datas.id },
  //         { orderStatus:datas.status },
  //         { new: true, upsert: true }
  //       ).exec((err, data) => {
  //         if (err)
  //           return resolve({
  //             status: false,
  //             message: "Please try after some time" + err,
  //           });
  //         if (data)
  //           return resolve({
  //             status: true,
  //             data: data,
  //             message: "ordar status retrieved successfully",
  //           });
  //       });
  //     } catch (error) {
  //       return resolve({
  //         status: false,
  //         data: data,
  //         message: "Please try after some time2" + error,
  //       });
  //     }
  //   });
  // },

  getAllOrder: async () => {
    return new Promise(async (resolve) => {
      try {
        Order.find({})
          .populate("customer","username login")
          .populate("product","productName ")
          .exec((error, data) => {
            if (error)
            return resolve({
                status: true,
                data: data,
                message: "Order retrieved successfully",
              });
            if (data) {
              return resolve({
                status: true,
                data: data,
                message: "Order retrieved successfully",
              });
            }
          });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  getOrderbyloginid: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Order.find({'customer': { "_id":id }})
          .populate("customer","username")
          .populate("product","productName ")
          .exec((error, data) => {
            if (error)
            return resolve({
                status: true,
                data: data,
                message: "Order retrieved successfully",
              });
            if (data) {
              return resolve({
                status: true,
                data: data,
                message: "Order retrieved successfully",
              });
            }
          });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

};
