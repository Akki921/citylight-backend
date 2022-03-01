
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
                        description:BannerData.description,
                        createdDate: data.createdDate, 
                        screenName:BannerData.screenName,
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
                          message: "Bannee updating failed !"+err,
                          data: data,
                        });
                      }
                    });
            }else{
            var newBanner = new Banner({
              banner: BannerData.banner,
              url: BannerData.url,
              status: BannerData.status,
              description:BannerData.description,
              createdDate: new Date(), 
              screenName:BannerData.screenName,
            });
            newBanner.save(async (error, Banner) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time"+error,
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
////////////delete banner
deletebannerbyId: async (id) => {
    console.log(id);
    return new Promise(async (resolve) => {
      try {
        Banner.deleteOne({ _id: id})
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
                message: "Banner deleted successfully successfully",
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

  //////////////////get by id
  getbannerbyId: async (id) => {
    console.log(id);
    return new Promise(async (resolve) => {
      try {
        Banner.findOne({ _id: id})
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
                message: "Banner get successfully successfully",
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