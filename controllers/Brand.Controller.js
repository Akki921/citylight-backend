const Brand = require("../models/Brand");
module.exports = {
  createBrand: async (BrandData) => {
    console.log(BrandData);
    return new Promise(async (resolve) => {
      try {
        Brand.findOne({ BrandName: BrandData.BrandName }).exec((err, data) => {
          if (data) {
            console.log("update");
            return resolve({
              status: true,
              message: "Brand is already insert !",
              data: data,
            });
          } else {
            console.log("create");
            var newBrand = new Brand({
              BrandName: BrandData.BrandName,
              Manufacture: BrandData.Manufacture,
              isActive: BrandData.isActive,
              comment: BrandData.comment,
              CreatedDate: new Date(),
              CreatedBy: 0,
            });
            newBrand.save(async (error, brand) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              if (brand) {
                return resolve({
                  status: true,
                  data: brand,
                  message: "Brand has been created",
                });
              }
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
  getBrandByID: async (data) => {
    return new Promise(async (resolve) => {
      try {
        Brand.findById({ _id: data }, async (err, data) => {
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

  getAllBand: async () => {
    return new Promise(async (resolve) => {
      try {
        Brand.find({})
        .sort({ username: -1 }).collation({ locale: "en", caseLevel: true })
        .exec(async(err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
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
          message: "Please try after some time",
        });
      }
    });
  },

  editupdateBrand: async (BrandData) => {
    console.log(BrandData)
    return new Promise(async (resolve) => {
      try {
        let rests = Brand.findOneAndUpdate(
          { _id: BrandData._id },
          {
            BrandName: BrandData.BrandName,
            Manufacture: BrandData.Manufacture,
            isActive: BrandData.isActive,
            comment: BrandData.comment,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            return resolve({
              status: true,
              message: "Brand is updated !",
              data: data,
            });
          } else if (err) {
            return resolve({
              status: false,
              message: "Brand updating failed !",
              data: data,
            });
          }
        });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time" + e,
        });
      }
    });
  },
};
