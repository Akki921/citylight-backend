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

  getSupportProfileid: async (id) => {
    console.log(id);
    return new Promise(async (resolve) => {
      try {
        Support.find({ customerId: { _id: id } }).exec((error, data) => {
          if (error)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Support retrieved successfully",
            });
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  updateSupport: async (SupportData) => {
    return new Promise(async (resolve) => {
      console.log("SupportData,", SupportData);
      try {
        if (SupportData) {
          SupportData.map((data) => {
            Support.updateMany(
              { _id: data._id },
              {
                complainNo: data.complainNo,
                customerId: data.customerId,
                complain: data.complain,
                note: data.note,
                status: data.status,
                complainCategory: data.complainCategory,
                Resolution: data.Resolution,
                complainDate: new Date(),
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
                    message: "Support Update SUccessfully successfully",
                  });
                }
              }
            );
          });
        } else {
          return resolve({
            status: true,
            message: "not any data to update",
          });
        }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + error,
        });
      }
    });
  },
};
