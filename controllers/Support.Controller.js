const Support = require("../models/Support");
//const CityAvailability = require("../models/CityAvailability");
module.exports = {
  createSupport: async (supportData) => {
    return new Promise(async (resolve) => {
      console.log(supportData);
      try {
        Support.findOne({ complain: supportData.complain }).exec(
          (err, data) => {
            if (data) {
              return resolve({
                status: true,
                message: "complaint  is already insert !",
                data: data,
              });
            } else {
              var newSupport = new Support({
                complainNo: supportData.complainNo,
                customerId: supportData.customerId,
                complain: supportData.complain,
                note: supportData.note,
                status: supportData.status,
                complainCategory: supportData.complainCategory,
                Resolution: supportData.Resolution,
                complainDate: new Date(),
              });
              newSupport.save(async (error, data) => {
                if (error)
                  return resolve({
                    status: false,
                    message: "Please try after some time",
                  });
                if (data) {
                  return resolve({
                    status: true,
                    data: data,
                    message: "Support has been created",
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

  getAllSupport: async () => {
    return new Promise(async (resolve) => {
      try {
        Support.find({})
          .populate("customerId", "username")
          .exec((error, data) => {
            if (error)
              return resolve({
                status: true,
                data: data,
                message: "Support not retrieved successfully",
              });
            if (data) {
              return resolve({
                status: true,
                data: data,
                message: "Support retrieved successfully",
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

  updateStock: async (stockData) => {
    return new Promise(async (resolve) => {
      console.log("stockData,", stockData);
      try {
        let rests = Stock.findOneAndUpdate(
          { _id: stockData.id },
          {
            stockName: stockData.stockNamec,
            category: stockData.category,
            sku: stockData.sku,
            quantity: stockData.quantity,
            deliveryToday: stockData.deliveryToday,
            deliveryTomorrow: stockData.deliveryTomorrow,
            city: stockData.city,
            productType: stockData.productType,
            tags: stockData.tags,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "stock is updated !",
              data: data,
            });
          } else if (err) {
            return resolve({
              status: false,
              message: "stock updating failed !",
              data: data,
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
