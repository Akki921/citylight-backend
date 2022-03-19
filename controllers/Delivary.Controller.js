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
          test.push(DelivaryData.DelivaryData[i].subNo);
        }
        console.log(test, "od", od, "fd", fd);
        Delivary.find({ subNo: { $in: test }, isDelivared: false }).exec(
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
              data.map((str) => {
                Delivary.updateMany(
                  { _id: str._id },
                  {
                    subNo: str.subNo,
                    customer: str.customer,
                    product: str.product,
                    isDelivared: str.isDelivared,
                    isSelcted: str.isSelcted,
                    todayDate: str.todayDate,
                    QtytobeDelivered: str.QtytobeDelivered,
                    Qtyfullfilled: str.Qtyfullfilled,
                    QtyDelivered: str.QtyDelivered,
                  },
                  { new: true, upsert: true },
                  (err, data) => {
                    if (err) {
                      return resolve({
                        status: false,
                        message: "there is a problem" + err,
                      });
                    }
                    if (data) {
                      console.log("succesfull", data);
                      return resolve({
                        status: true,
                        data: data,
                        message: "Delivary  update successfully",
                      });
                    }
                  }
                );
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

  updateisSelcted: async (datas) => {
    return new Promise(async (resolve) => {
      console.log(datas);
      try {
        Delivary.findOne({ _id: new ObjectId(`${datas.subid}`) }).exec(
          (err, data) => {
            console.log(data);
            if (data) {
              if (datas.isSelected === undefined) {
                Delivary.findOneAndUpdate(
                  { _id: data._id },
                  {
                    // DelivaryNo: data.DelivaryNo,
                    // subNo: data.subNo,
                    // customer: data.customer,
                    // product: data.product,
                    // isDelivared:false,
                    // isSelcted: data.isSelcted,
                    // todayDate: data.todayDate,
                    // QtytobeDelivered: data.QtytobeDelivered,
                    // Qtyfullfilled: data.Qtyfullfilled,
                    // QtyDelivered: data.QtyDelivered,
                    // todayDate: data.todayDate,
                    $set: {isSelected:data.isSelected, isDelivared: false}
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return resolve({
                      status: true,
                      message: "Delivary details  is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return resolve({
                      status: false,
                      message: "Delivary details is updating failed !",
                      data: data,
                    });
                  }
                });
              } else {
                console.log("inside else");

                Delivary.findOneAndUpdate(
                  { _id: data._id },
                  {
                    // DelivaryNo: data.DelivaryNo,
                    // subNo: data.subNo,
                    // customer: data.customer,
                    // product: data.product,
                    // isDelivared: false,
                    // isSelcted: datas.isSelected,
                    // todayDate: data.todayDate,
                    // QtytobeDelivered: data.QtytobeDelivered,
                    // Qtyfullfilled: data.Qtyfullfilled,
                    // QtyDelivered: data.QtyDelivered,
                    // todayDate: data.todayDate,
                    $set: {isSelected:data.isSelected, isDelivared: false}
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return resolve({
                      status: true,
                      message: "Delivary   is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return resolve({
                      status: false,
                      message: "Delivary   details is updating failed !",
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
          .populate(
            "subNo",
            "subNo address QtyDelivered Qtyfullfilled QtytobeDelivered isDelivered productValue delivaryBoy"
          )
          .populate("customer", "username")
          .populate("product", "productName")
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

  updateAllSelcted: async (SubscriptionData) => {
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);

      try {
        if (SubscriptionData.isSelected === false) {
          SubscriptionData.alldata.map((data) => {
            Delivary.updateMany(
              { _id: data._id },
              {
                $set: {isSelected:SubscriptionData.isSelected, isDelivared: false}
                // DelivaryNo: data.DelivaryNo,
                // subNo: data.subNo,
                // customer: data.customer,
                // product: data.product,
                // isDelivared: false,
                // isSelcted: SubscriptionData.isSelected,
                // todayDate: data.todayDate,
                // QtytobeDelivered: data.QtytobeDelivered,
                // Qtyfullfilled: data.Qtyfullfilled,
                // QtyDelivered: data.QtyDelivered,
                // todayDate: data.todayDate,

              },
              { new: true, upsert: true },
              (err, data) => {
                if (err) {
                  return resolve({
                    status: true,
                    message: "there is a problem",
                  });
                }
                if (data) {
                  console.log("succesfull", data);
                  return resolve({
                    status: true,
                    data: data,
                    message: "subscription  update successfully",
                  });
                }
              }
            );
          });
        } else {
          console.log("inside else");
          SubscriptionData.alldata.map((data) => {
            Delivary.updateMany(
              { _id: data._id },
              {
                $set: {isSelected:SubscriptionData.isSelected, isDelivared: false}
                // DelivaryNo: data.DelivaryNo,
                // subNo: data.subNo,
                // customer: data.customer,
                // product: data.product,
                // isDelivared: false,
                // isSelcted: SubscriptionData.isSelected,
                // todayDate: data.todayDate,
                // QtytobeDelivered: data.QtytobeDelivered,
                // Qtyfullfilled: data.Qtyfullfilled,
                // QtyDelivered: data.QtyDelivered,
                // todayDate: data.todayDate,
              },
              { new: true, upsert: true },
              (err, data) => {
                if (err) {
                  return resolve({
                    status: true,
                    message: "there is a problem",
                  });
                }
                if (data) {
                  console.log("succesfull", data);
                  return resolve({
                    status: true,
                    data2: data,
                    message: "subscription  update successfully",
                  });
                }
              }
            );
          });
        }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },
 
  updateAllDeliverd: async (SubscriptionData) => {
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);

      try {
          SubscriptionData.fullfilleddata.map((data) => {
            Delivary.updateMany(
              { _id: data._id },
              {
                // DelivaryNo: data.DelivaryNo,
                // subNo: data.subNo,
                // customer: data.customer,
                // product: data.product,
                // isDelivared: true,
                // isSelcted: SubscriptionData.isSelected,
                // todayDate: data.todayDate,
                // QtytobeDelivered: data.QtytobeDelivered,
                // Qtyfullfilled: data.Qtyfullfilled,
                // QtyDelivered: data.QtytobeDelivered,
                // todayDate:Date.now(),
                $set: {isDelivared:true, todayDate: Date.now()}
              },
              { new: true, upsert: true },
              (err, data) => {
                if (err) {
                  return resolve({
                    status: true,
                    message: "there is a problem",
                  });
                }
                if (data) {
                  console.log("succesfull", data);
                  return resolve({ 
                    status: true,
                    data: data,
                    message: "subscription  update successfully",
                  });
                }
              }
            );
          });
        
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },
 
};
