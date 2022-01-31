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
        Subscription.findOne({ subNo: SubscriptionData.no }).exec(
          (err, data) => {
            if (data) {
              return resolve({
                status: true,
                message: "Subscription is already insert !",
                data: data,
              });
            } else {
              var newSubscription = new Subscription({
                subNo: SubscriptionData.subNo,
                subDate: SubscriptionData.subDate,
                startFrom: SubscriptionData.startFrom,
                order: SubscriptionData.id,
                customer: SubscriptionData.customer,
                product: SubscriptionData.product,
                QtyperDay: SubscriptionData.QtyperDay,
                frequency: SubscriptionData.frequency,
                endDate: SubscriptionData.enddate,
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

  getAllSubscription: async () => {
    return new Promise(async (resolve) => {
        try {
            Subscription.find({})
              .populate("order", " orderNo orderDate orderValue coupan orderStatus qtyperday startDate product slottime productvalue")
              .populate("customer","username email")
              .populate("product","productName")
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

  // editupdatecategory: async (CategoryData) => {
  //   return new Promise(async (resolve) => {
  //    // console.log('CategoryData',CategoryData)
  //     try {
  //       let rests = Category.findOneAndUpdate(
  //         { _id: CategoryData.id },
  //         {
  //           CategoryName: CategoryData.categoryname,
  //           Description: CategoryData.discription,
  //           Status: CategoryData.status,
  //         },
  //         { new: true, upsert: true }
  //       ).exec((err, data) => {
  //         if (data) {
  //           return resolve({
  //             status: true,
  //             message: "Category is updated !",
  //             data: data,
  //           });
  //         } else if (err) {
  //           return resolve({
  //             status: false,
  //             message: "Category updating failed !",
  //             data: data,
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       return resolve({
  //         status: false,
  //         message: "Please try after some time" + e,
  //       });
  //     }
  //   });
  // },
};
