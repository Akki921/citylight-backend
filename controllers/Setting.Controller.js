const Setting = require("../models/Setting");

module.exports = {
  //register new user
  createSetting: async (SettingData) => {
    return new Promise(async (resolve) => {
      try {
        Setting.findOneAndUpdate({
          
            key: SettingData.key,
          },{"Value":SettingData.value,"isDeleted":SettingData.isDeleted}
          ,
          { new: true, upsert: true })
          .exec((err, data) => {
            if (err)
              return resolve({
                status: false,
                message: "Please try after some time",
              });
            if (data)
              return resolve({
                status: false,
                message: "SettingData Name is updated",
                data:data,
              });
            var newSetting= new Setting({
                key: SettingData.key,
                Value:SettingData.value,
              CreatedDate: new Date(),
              CreatedBy: 0,
            });
            newSetting.save(async (error, setting) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              return resolve({
                status: true,
                data: setting,
                message: "Setting has been created",
              });
            });
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

  getAllSetting: async () => {
    return new Promise(async (resolve) => {
      try {
        Setting.find({}, async (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time",
            });
          if (data)
            return resolve({
              status: true,
              data: data,
              message: "Setting retrieved successfully",
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
