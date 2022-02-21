
const Banner = require("../models/Banner");

module.exports = {

  createBanner: async (BannerData) => {
    return new Promise(async (resolve) => {
      console.log(BannerData);
      try {
            Banner.findOne({"url": BannerData.url }
         )
          .exec((err, data) => {         
           
            if (data)
            {
                let rests = Banner.findOneAndUpdate(
                    { _id: data._id },
                    {
                        banner: BannerData.banner,
                        url: BannerData.url,
                        status: BannerData.status,
                        createdDate: data.createdDate, 
                    },
                    { new: true, upsert: true }
                  ).exec((err, data) => { 
                    if (data) {
                        return resolve({
                          status: true,
                          message: "Bannet  is updated !",
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
            }else{
            var newBanner = new Banner({
              banner: BannerData.banner,
              url: BannerData.url,
              status: BannerData.status,
              createdDate: new Date(), 
            });
            newBanner.save(async (error, Banner) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(Banner){
              return resolve({
                status: true,
                data: Banner,
                message: "Banner has been created",
              });
            }
            });
            }
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time"+error,
        });
      }
    });
  },

  getAllBanner: async () => {
    return new Promise(async (resolve) => {
      try {
        Banner.find({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Banner retrieved successfully",
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

};