const { ObjectId } = require("mongodb");
const Delivary = require("../models/Delivary");
let datetime = new Date();

module.exports = {
  createDelivary: async (DelivaryData) => {
    console.log(DelivaryData);

    return new Promise(async (resolve) => {
      try {
        let test = [];
        let od = [];
        let fd = [];

        for (let i = 0; i < DelivaryData.DelivaryData.length; i++) {
          //  console. log( Data.slipdata[i]);
          test.push(DelivaryData.DelivaryData[i].subNo);
          // if (
          //   DelivaryData.DelivaryData[i].todayDate.split("T")[0].split("-").join("-") ===
          //   datetime.toISOString().slice(0, 10)
          // ) {
          //   console.log("if running");
          //   od.push(DelivaryData.DelivaryData[i]);
          // }
          // else{
          //    fd.push(DelivaryData.DelivaryData[i])
          // }
        }
        console.log(test, "od", od, "fd", fd);
        Delivary.find({ subNo: { $in: test }, isDelivared: true }).exec(
          async (err, data) => {
            console.log("allreasy data", data);
            if (data[0] === undefined) {
              let dd = await Delivary.insertMany(DelivaryData.DelivaryData);
              // console.log('dd0',dd);
              if (dd) {
                return resolve({
                  status: true,
                  data: dd,
                  message: "Delivary Slip has been created",
                });
              } else {
                return resolve({
                  status: true,
                  message: "Delivary Slip has not created",
                });
              }
            } else {
              let dd = await Delivary.updateMany(DelivaryData.DelivaryData);
              console.log("update", dd);
              if (dd) {
                return resolve({
                  status: true,
                  data: dd,
                  message: "Delivary Slip has been updated",
                });
              } else {
                return resolve({
                  status: true,
                  message: "Delivary Slip has not been updated",
                });
              }
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

  updateisSelcted: async (datas) => {
    return new Promise(async (resolve) => {
      console.log(datas);
      try {
        Subscription.findOne({ _id: new ObjectId(`${datas.subid}`) }).exec(
          (err, data) => {
            console.log(data);
            if (data) {
              if (datas.isSelected === undefined) {
                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                    subNo: data.subNo,
                    subDate: data.subDate,
                    // startFrom: data.startFrom,
                    order: data.order,
                    customer: data.customer,
                    product: data.product,
                    // QtyperDay: data.QtyperDay,
                    // frequency: data.frequency,
                    endDate: data.endDate,
                    iscancle: data.iscancle,
                    isSelected: data.isSelected,
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return resolve({
                      status: true,
                      message: "subscription details  is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return resolve({
                      status: false,
                      message: "subscription details is updating failed !",
                      data: data,
                    });
                  }
                });
              } else {
                console.log("inside else");

                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                    subNo: data.subNo,
                    subDate: data.subDate,
                    // startFrom: data.startFrom,
                    order: data.order,
                    customer: data.customer,
                    product: data.product,
                    // QtyperDay: data.QtyperDay,
                    // frequency: data.frequency,
                    // endDate: data.endDate,
                    iscancle: data.iscancle,
                    isSelected: datas.isSelected,
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return resolve({
                      status: true,
                      message: "subscription   is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return resolve({
                      status: false,
                      message: "subscription   details is updating failed !",
                      data: data,
                    });
                  }
                });
              }
            }
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

  getAlldelivary: async () => {
    return new Promise(async (resolve) => {
      try {
        Delivary.find({})
          // .populate(
          //   "order",
          //   "orderNo qtyperday startDate product frequency productValue  address locality"
          // )
          // .populate("customer", "username login")
          // .populate("product", "productName thumbnail")
          .exec((error, data) => {
            if (error)
              return resolve({
                status: true,
                data: data,
                message: "delivery do no retrive successfully",
              });
            if (data) {
              return resolve({
                status: true,
                data: data,
                message: "delivery retrieved successfully",
              });
            }
          });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + error,
        });
      }
    });
  },
};
