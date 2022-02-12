const Voccation = require("../models/Voccation");
module.exports = {
  createVoccation: async (VoccationData) => {
    console.log(VoccationData);
    return new Promise(async (resolve) => {
      try {
        Voccation.findOne({ ProfileId: VoccationData.ProfileId }).exec(
          (err, data) => {
            if (data) {
              Voccation.findOneAndUpdate(
                { _id: data._id },
                {
                  ProfileId: VoccationData.ProfileId,
                  StartDate: VoccationData.StartDate,
                  EndDate: VoccationData.EndDate,
                  city: VoccationData.city,
                  locality: VoccationData.locality,
                  cutOffTime: VoccationData.cutOffTime,
                },
                { new: true, upsert: true }
              ).exec((err, data) => {
                if (data) {
                  return resolve({
                    status: true,
                    message: "Voccation details  is updated !",
                    data: data,
                  });
                } else if (err) {
                  return resolve({
                    status: false,
                    message: "Voccation details is updating failed !",
                    data: data,
                  });
                }
              });
            } else {
              console.log("create");
              var newVoccation = new Voccation({
                ProfileId: VoccationData.ProfileId,
                StartDate: VoccationData.StartDate,
                EndDate: VoccationData.EndDate,
                city: VoccationData.city,
                locality: VoccationData.locality,
                cutOffTime: VoccationData.cutOffTime,
              });
              newVoccation.save(async (error, brand) => {
                if (error)
                  return resolve({
                    status: false,
                    message: "Please try after some time",
                  });
                if (brand) {
                  return resolve({
                    status: true,
                    data: brand,
                    message: "Voccation has been created",
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
  getVoccationProfileID: async (ProfileId) => {
    console.log("data", ProfileId);
    return new Promise(async (resolve) => {
      try { 
      Voccation.find({ ProfileId: { _id: ProfileId }})
      .populate("ProfileId", "slottime")
      .populate("locality", "locality availability morning evening morningtime eveningtime")
      .populate("city", "cityName")
      .exec((error, data) => {
      if (error)
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      if (data)
        return resolve({
          status: true,
          data: data,
          message: "customer profile retrieved successfully",
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

  getAllVoccation: async () => {
    return new Promise(async (resolve) => {
      try {
        Voccation.find({})
      .populate("ProfileId", "slottime")
      .populate("locality", "locality availability morning evening morningtime eveningtime")
      .populate("city", "cityName")
        .exec((error, data) => {
          if (error)
          return resolve({
            status: false,
            message: "Please try after some time "+error,
          });
        if (data)
          return resolve({
            status: true,
            data: data,
            message: "Voccation retrieved successfully",
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

  //   editupdateBrand: async (BrandData) => {
  //     console.log(BrandData)
  //     return new Promise(async (resolve) => {
  //       try {
  //         let rests = Brand.findOneAndUpdate(
  //           { _id: BrandData._id },
  //           {
  //             BrandName: BrandData.BrandName,
  //             Manufacture: BrandData.Manufacture,
  //             isActive: BrandData.isActive,
  //             comment: BrandData.comment,
  //           },
  //           { new: true, upsert: true }
  //         ).exec((err, data) => {
  //           if (data) {
  //             return resolve({
  //               status: true,
  //               message: "Brand is updated !",
  //               data: data,
  //             });
  //           } else if (err) {
  //             return resolve({
  //               status: false,
  //               message: "Brand updating failed !",
  //               data: data,
  //             });
  //           }
  //         });
  //       } catch (error) {
  //         return resolve({
  //           status: false,
  //           message: "Please try after some time" + e,
  //         });
  //       }
  //     });
  //   },
};
