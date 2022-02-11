const { ObjectId } = require("mongodb");
const Subscription = require("../models/Subscription");
module.exports = {
  // createSubscription: async (SubscriptionData) => {

  //   return new Promise(async (resolve) => {
  //     try {
  // console.log('SubscriptionData',SubscriptionData);
  //      Subscription.findOne({ subNo: SubscriptionData.no }).exec(
  //         (err, data) => {
  //           if (data) {
  //             console.log("update");
  //             return resolve({
  //               status: true,
  //               message: "subscription is already insert !",
  //               data: data,
  //             });
  //           } else {
  //             console.log("create");
  //             var newSubscription = new Subscription({
  //               subNo:SubscriptionData.subNo,
  //               subDate:SubscriptionData.subDate,
  //               startFrom:SubscriptionData.startFrom,
  //               order:SubscriptionData.orderNo,
  //               QtyperDay:SubscriptionData.QtyperDay,
  //               frequency:SubscriptionData.frequency,
  //               endDate:SubscriptionData.endDate,
  //               iscancle:SubscriptionData.iscancle,
  //               // nosubscriptionFrom:SubscriptionData.nosubscriptionFrom,
  //               // nosubscriptionTo:SubscriptionData.nosubscriptionTo
  //             });
  //             newSubscription.save(async (error, Subscription) => {
  //               console.log("Subscription,",Subscription);

  //               if (error)
  //                 return resolve({
  //                   status: false,
  //                   message: "Please try after some time",
  //                 });
  //               if (Subscription) {
  //                 return resolve({
  //                   status: true,
  //                   data: Subscription,
  //                   message: "Subscription has been created",
  //                 });
  //               }
  //             });
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       return resolve({
  //         status: false,
  //         message: "Please try after some time" + error,
  //       });
  //     }
  //   });
  // },

  createSubscription: async (SubscriptionData) => {
    console.log("SubscriptionData", SubscriptionData);
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);
      try {
        Subscription.findOne({ subNo: SubscriptionData.subNo }).exec(
          (err, data) => {
            if (data) {

              if (SubscriptionData.customDates[0] !== undefined || SubscriptionData.QtyperDay === 0 ) {
                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                  subNo: SubscriptionData.subNo,
                 // subDate: SubscriptionData.subDate,
                  // startFrom: SubscriptionData.startFrom,
                  order: SubscriptionData.order,
                  customer: SubscriptionData.customer,
                  product: SubscriptionData.product,
                  customDates: SubscriptionData.customDates,
                  iscancle:true,
                  // QtyperDay: SubscriptionData.QtyperDay,
                  // frequency: SubscriptionData.frequency
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return  resolve({
                      status: true,
                      message: "subscription details  is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return  resolve({
                      status: false,
                      message: "subscription details is updating failed !",
                      data: data,
                    });
                  }
                })
              }
              else
              {
                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                  subNo: SubscriptionData.subNo,
                  //subDate: SubscriptionData.subDate,
                  // startFrom: SubscriptionData.startFrom,
                  order: SubscriptionData.order,
                  customer: SubscriptionData.customer,
                  product: SubscriptionData.product,
                  // QtyperDay: SubscriptionData.QtyperDay,
                  // frequency: SubscriptionData.frequency
                  },
                  { new: true, upsert: true }
                ).exec((err, data) => {
                  if (data) {
                    return  resolve({
                      status: true,
                      message: "subscription details  is updated !",
                      data: data,
                    });
                  } else if (err) {
                    return  resolve({
                      status: false,
                      message: "subscription details is updating failed !",
                      data: data,
                    });
                  }
                })
              }
            } else {
              if (SubscriptionData.customDates[0] !== undefined) {
                var newSubscription = new Subscription({
                  subNo: SubscriptionData.subNo,
                //  subDate: SubscriptionData.subDate,
               //   startFrom: SubscriptionData.startFrom,
                  order: SubscriptionData.order,
                  customer: SubscriptionData.customer,
                  product: SubscriptionData.product,
                  customDates: SubscriptionData.customDates,
                  // QtyperDay: SubscriptionData.QtyperDay,
                  // frequency: SubscriptionData.frequency,
                });
                newSubscription.save(async (error, Subscription) => {
                  console.log(Subscription);
                  if (error)
                    return resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  if (Subscription) {
                    return resolve({
                      status: true,
                      data: Subscription,
                      message: "Subscription has been created",
                    });
                  }
                });
              } else {
                var newSubscription = new Subscription({
                  subNo: SubscriptionData.subNo,
                  subDate: SubscriptionData.subDate,
               //   startFrom: SubscriptionData.startFrom,
                  order: SubscriptionData.order,
                  customer: SubscriptionData.customer,
                  product: SubscriptionData.product,
                  // QtyperDay: SubscriptionData.QtyperDay,
                  // frequency: SubscriptionData.frequency,
                });
                newSubscription.save(async (error, Subscription) => {
                  console.log(Subscription);
                  if (error)
                    return resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  if (Subscription) {
                    return resolve({
                      status: true,
                      data: Subscription,
                      message: "Subscription has been created",
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
          message: "Please try after some time" + error,
        });
      }
    });
  },

  updateiscancle: async (datas) => {
    return new Promise(async (resolve) => {
      try {
        Subscription.findOneAndUpdate(
          { _id: datas._id },
          { iscancle: datas.iscancle },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time" + err,
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Data retrieved successfully",
            });
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

  updateisSelcted: async (datas) => {
    return new Promise(async (resolve) => {
      console.log(datas);
      try {
        Subscription.findOne({ _id:new ObjectId(`${datas.subid}`) }).exec((err, data) => {
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
                  return  resolve({
                    status: true,
                    message: "subscription details  is updated !",
                    data: data,
                  });
                } else if (err) {
                  return  resolve({
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
                    return  resolve({
                      status: false,
                      message: "subscription   details is updating failed !",
                      data: data,
                    });
                  }
                })
            }
          }
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

  getAllSubscription: async () => {
    return new Promise(async (resolve) => {
      try {
        Subscription.find({})
          .populate(
            "order",
            " orderNo orderDate orderValue coupan orderStatus qtyperday startDate product slottime productvalue"
          )
          .populate("customer", "username login")
          .populate("product", "productName thumbnail")
          .exec((error, data) => {
            if (error)
              return resolve({
                status: true,
                data: data,
                message: "Subscription do no retrive successfully",
              });
            if (data) {
              return resolve({
                status: true,
                data: data,
                message: "Subscription retrieved successfully",
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

  updateAllSelcted: async (datas) => {
    return new Promise(async (resolve) => {
      console.log(datas);
   
  console.log(datas);
      try {
      
            if (datas.isSelected === false) {
              Subscription.updateMany(
               {isSelected: true},
                {
                  $set: {  isSelected:false }
                },
                { new: true, upsert: true }
              ).exec((err, data) => {
                if (data) {
                  return  resolve({
                    status: true,
                    message: "subscription details  is updated !",
                    data: data,
                  });
                } else if (err) {
                  return  resolve({
                    status: false,
                    message: "subscription details is updating failed !",
                    data: data,
                  });
                }
              });
            } else {
              console.log("inside else");
         
                Subscription.updateMany(
                  {isSelected: false},
                  {
                    $set: {  isSelected:true }
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
                    return  resolve({
                      status: false,
                      message: "subscription   details is updating failed !",
                      data: data,
                    });
                  }
                })
            }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },




  getSubscriptionbyloginid: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Subscription.find({'customer': { "_id":id }})
          .populate(
            "order",
            " orderNo orderDate orderValue coupan orderStatus qtyperday startDate product slottime productvalue"
          )
          .populate("customer", "username login")
          .populate("product", "productName thumbnail sellingprice offerprice")
          .exec((error, data) => {
            if (error)
            return resolve({
                status: true,
                data: data,
                message: "Subscription retrieved successfully",
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
