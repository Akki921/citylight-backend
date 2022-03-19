const { ObjectId } = require("mongodb");
const Subscription = require("../models/Subscription");
let prevdata = [];

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
              console.log(
                "SubscriptionData.customDates",
                SubscriptionData.customDates
              );
              if (
                SubscriptionData.customDates !== undefined ||
                SubscriptionData.QtyperDay === 0
              ) {
                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                    subNo: SubscriptionData.subNo,
                    customer: SubscriptionData.customer,
                    product: SubscriptionData.product,
                    customDates: SubscriptionData.customDates,
                    iscancle: true,
                    QtyperDay: SubscriptionData.QtyperDay,
                    frequency: SubscriptionData.frequency,
                    address: SubscriptionData.address,
                    locality: SubscriptionData.locality,
                    city: SubscriptionData.city,
                    startDate: SubscriptionData.startDate,
                    OnceUpdate: SubscriptionData.OnceUpdate,
                    productValue: SubscriptionData.productValue,
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
                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                    subNo: SubscriptionData.subNo,
                    customer: SubscriptionData.customer,
                    product: SubscriptionData.product,
                    customDates: SubscriptionData.customDates,
                    QtyperDay: SubscriptionData.QtyperDay,
                    frequency: SubscriptionData.frequency,
                    address: SubscriptionData.address,
                    locality: SubscriptionData.locality,
                    city: SubscriptionData.city,
                    OnceUpdate: SubscriptionData.OnceUpdate,
                    startDate: SubscriptionData.startDate,
                    productValue: SubscriptionData.productValue,
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
              }
            } else {
              console.log(
                "SubscriptionData.customDates",
                SubscriptionData.customDates
              );
              if (SubscriptionData.customDates !== undefined) {
                var newSubscription = new Subscription({
                  subNo: SubscriptionData.subNo,
                  customer: SubscriptionData.customer,
                  product: SubscriptionData.product,
                  customDates: SubscriptionData.customDates,
                  QtyperDay: SubscriptionData.QtyperDay,
                  frequency: SubscriptionData.frequency,
                  address: SubscriptionData.address,
                  locality: SubscriptionData.locality,
                  city: SubscriptionData.city,
                  startDate: SubscriptionData.startDate,
                  OnceUpdate: SubscriptionData.OnceUpdate,
                  productValue: SubscriptionData.productValue,
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
                console.log("inside else");
                var newSubscription = new Subscription({
                  subNo: SubscriptionData.subNo,
                  customer: SubscriptionData.customer,
                  product: SubscriptionData.product,
                  customDates: SubscriptionData.customDates,
                  QtyperDay: SubscriptionData.QtyperDay,
                  frequency: SubscriptionData.frequency,
                  address: SubscriptionData.address,
                  locality: SubscriptionData.locality,
                  city: SubscriptionData.city,
                  startDate: SubscriptionData.startDate,
                  OnceUpdate: SubscriptionData.OnceUpdate,
                  productValue: SubscriptionData.productValue,
                });
                newSubscription.save(async (error, Subscription) => {
                  console.log(Subscription);
                  if (error)
                    return resolve({
                      status: false,
                      message: "Please try after some time" + error,
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
        Subscription.findOne({ _id: new ObjectId(`${datas.subid}`) }).exec(
          (err, data) => {
            console.log(data);
            if (data) {
              if (datas.isSelected === undefined) {
                Subscription.findOneAndUpdate(
                  { _id: data._id },
                  {
                    // subNo: data.subNo,
                    // customer: data.customer,
                    // product: data.product,
                    // customDates: data.customDates,
                    // QtyperDay: data.QtyperDay,
                    // frequency: data.frequency,
                    // address: data.address,
                    // locality: data.locality,
                    // city: data.city,
                    // startDate: data.startDate,
                    // productValue: data.productValue,
                    // OnceUpdate: data.OnceUpdate,
                    // iscancle: data.iscancle,
                    // isSelected: data.isSelected,
                    $set: {isSelected:SubscriptionData.isSelected}
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
                    // subNo: data.subNo,
                    // customer: data.customer,
                    // product: data.product,
                    // customDates: data.customDates,
                    // QtyperDay: data.QtyperDay,
                    // frequency: data.frequency,
                    // address: data.address,
                    // locality: data.locality,
                    // city: data.city,
                    // startDate: data.startDate,
                    // productValue: data.productValue,
                    // OnceUpdate: data.OnceUpdate,
                    // iscancle: data.iscancle,
                    // isSelected: datas.isSelected,
                    $set: {isSelected:SubscriptionData.isSelected}
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

  getAllSubscription: async () => {
    return new Promise(async (resolve) => {
      try {
        console.log("prevdata", prevdata);
        Subscription.find({})
          .populate("customer", "username login")
          .populate("product", "productName thumbnail")
          .populate("city", "cityName")
          .populate("locality", "locality")
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

  updateAllSelcted: async (SubscriptionData) => {
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);

      try {
        if (SubscriptionData.isSelected === false) {
          SubscriptionData.alldata.map((data) => {
            Subscription.updateMany(
              { _id: data._id },
              {
                // subNo: data.subNo,
                // customer: data.customer,
                // product: data.product,
                // customDates: data.customDates,
                // QtyperDay: data.QtyperDay,
                // frequency: data.frequency,
                // address: data.address,
                // locality: data.locality,
                // city: data.city,
                // startDate: data.startDate,
                // productValue: data.productValue,
                // OnceUpdate: data.OnceUpdate,

                // isSelected: SubscriptionData.isSelected,
                $set: {isSelected:SubscriptionData.isSelected}
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
            Subscription.updateMany(
              { _id: data._id },
              {
                // subNo: data.subNo,
                // customer: data.customer,
                // product: data.product,
                // customDates: data.customDates,
                // QtyperDay: data.QtyperDay,
                // frequency: data.frequency,
                // address: data.address,
                // locality: data.locality,
                // city: data.city,
                // startDate: data.startDate,
                // productValue: data.productValue,
                // OnceUpdate: data.OnceUpdate,
                // isSelected: SubscriptionData.isSelected,
                $set: {isSelected:SubscriptionData.isSelected}
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

  getSubscriptionbyloginid: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Subscription.find({ customer: { _id: id } })
          .sort({ product: -1 })
          .populate("customer", "username login")
          .populate(
            "product",
            "productName thumbnail sellingprice offerprice description vendor stock"
          )
          .populate("city", "cityName")
          .populate("locality", "locality")
          .exec((error, data) => {
            if (error)
              return resolve({
                status: false,
                data: data,
                message: "Subscription not retrieved successfully" + error,
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

  createupdateSubscriptiononce: async (SubscriptionData) => {
    console.log("SubscriptionData", SubscriptionData);
    return new Promise(async (resolve) => {
      console.log(SubscriptionData[0].OnceUpdate);
      try {
        let test = [];

        for (let i = 0; i < SubscriptionData.length; i++) {
          console.log(SubscriptionData[i]);
          test.push(SubscriptionData[i]._id);
        }
        Subscription.find({ _id: { $in: test } }).exec((err, data) => {
          console.log(data);
          if (data) {
            SubscriptionData.map((data) => {
              Subscription.updateMany(
                { _id: data._id },
                {
                  subNo: data.subNo,
                  customer: data.customer,
                  product: data.product,
                  customDates: data.customDates,
                  QtyperDay: data.QtyperDay,
                  frequency: data.frequency,
                  address: data.address,
                  locality: data.locality,
                  city: data.city,
                  startDate: data.startDate,
                  productValue: data.productValue,
                  OnceUpdate: data.OnceUpdate,
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
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

  updatesubscriptiononword: async (datas) => {
    return new Promise(async (resolve) => {
      console.log(datas);
      try {
        let test = [];

        for (let i = 0; i < datas.length; i++) {
          //  console. log( Data.slipdata[i]);
          test.push(datas[i]._id);
        }
        Subscription.find({ _id: { $in: test } }).exec((err, data) => {
          console.log(data);
          if (data) {
            DelivaryData.map((data) => {
              Delivary.updateMany(
                { _id: data._id },
                {
                  subNo: data.subNo,
                  // subDate: data.subDate,
                  // startFrom: data.startFrom,
                  order: data.order,
                  customer: data.customer,
                  product: data.product,
                  customDates: data.customDates,
                  // iscancle:true,
                  QtyperDay: data.QtyperDay,
                  // frequency: SubscriptionData.frequency
                },
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
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

  updateAllFullfilled: async (SubscriptionData) => {
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);

      try {
        SubscriptionData.PassFullfilledData.map((data) => {
          Subscription.updateMany(
            { _id: data._id },
            {
              subNo: data.subNo,
              customer: data.customer._id,
              product: data.product._id,
              customDates: data.customDates,
              QtyperDay: data.QtyperDay,
              frequency: data.frequency,
              address: data.address,
              locality: data.locality._id,
              city: data.city._id,
              startDate: data.startDate,
              productValue: data.productValue,
              OnceUpdate: data.OnceUpdate,
              isSelected: data.isSelected,
              QtytobeDelivered: data.QtytobeDelivered,
              QtyDelivered: data.QtyDelivered,
              Qtyfullfilled: data.Qtyfullfilled,
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

  updateAllAssignOrder: async (SubscriptionData) => {
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);

      try {
        SubscriptionData.PassFullfilledData.map((data) => {
          Subscription.updateMany(
            { _id: data._id },
            {
              // subNo: data.subNo,
              // customer: data.customer,
              // product: data.product,
              // customDates: data.customDates,
              // QtyperDay: data.QtyperDay,
              // frequency: data.frequency,
              // address: data.address,
              // locality: data.locality,
              // city: data.city,
              // startDate: data.startDate,
              // productValue: data.productValue,
              // OnceUpdate: data.OnceUpdate,
              // isSelected: data.isSelected,
              // QtytobeDelivered: data.QtytobeDelivered,
              // QtyDelivered: data.QtyDelivered,
              // Qtyfullfilled: data.Qtyfullfilled,
              // delivaryBoy:data.delivaryBoy,
              // isAssign:data.isAssign
              
                $set: {isAssign:data.isAssign,isSelected:data.isSelected}
              
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

  updateAfterDelivary: async (SubscriptionData) => {
    return new Promise(async (resolve) => {
      console.log(SubscriptionData);

      try {
        // SubscriptionData.PassFullfilledData.map((data) => {
        //   Subscription.updateMany(
        //     { _id: data._id },
        //     {
        //       $set: {isAssign:true}
        //     },
        //     { new: true, upsert: true },
        //     (err, data) => {
        //       if (err) {
        //         return resolve({
        //           status: false,
        //           message: "there is a problem" + err,
        //         });
        //       }
        //       if (data) {
        //         console.log("succesfull", data);
        //         return resolve({
        //           status: true,
        //           data: data,
        //           message: "subscription  update successfully",
        //         });
        //       }
        //     }
        //   );
        // });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },
};
