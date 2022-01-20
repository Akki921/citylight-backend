const Category = require("../models/Category");
module.exports = {
    createSubCategory: async (subCategoryData) => {
    return new Promise(async (resolve) => {
      try {
            Category.findOne({SubCategoryName: subCategoryData.SubCategoryName }
         )
          .exec((err, data) => {         
           
            if (data)
            {
                console.log("update")
              return resolve({
                status: true,
                message: "Category is already insert !",
                data:data,
              });
            }else{
                console.log("create")
            var newCategory = new Category({
              SubCategoryName: subCategoryData.SubCategoryName,
              Description: subCategoryData.Description,
              Status:subCategoryData.Status,
              createdDate: new Date(),
               createdBy: subCategoryData.userId,
            });
            newCategory.save(async (error, Category) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
                if(Category){
              return resolve({
                status: true,
                data: Category,
                message: "Category has been created",
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

  updateStatus: async (datas) => {
    return new Promise(async (resolve) => {
      try {
        Category.findOneAndUpdate({_id:datas._id},{Status:datas.Status}, {new:true,upsert:true}).exec( (err, data) => {
          if (err)
            return resolve({
              status: false,
              message: "Please try after some time"+err,
              
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
          message: "Please try after some time2"+error,
        });
      }
    });
  },

  getAllCategory: async () => {
    return new Promise(async (resolve) => {
      try {
        Category.find({}, async (err, data) => {
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



  editupdatecategory: async (subCategoryData)=>{
    return new Promise(async (resolve) => {
        try {
          let rests=  Category.findOneAndUpdate({_id:subCategoryData._id},{ SubCategoryName: subCategoryData.SubCategoryName,
                SubCategoryName: subCategoryData.SubCategoryName,
                Description:subCategoryData.Description,
                Status:subCategoryData.Status,

            },{new:true,upsert:true}).exec((err, data) => { 
                if( data){
                    return resolve({
                        status: true,
                        message: "Category is updated !",
                        data:data,
                      });
                   }else if(err){
                    return resolve({
                        status: false,
                        message: "Category updating failed !",
                        data:data,
                      });
                   }
            });
           
        } catch (error) {
            return resolve({
              status: false,
              message: "Please try after some time"+e,
            });
          }
        });
  },

};
