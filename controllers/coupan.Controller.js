const Coupan = require("../models/Coupancode");

// post coupan api ....
exports.newCoupancode = async (req,res) => {
  const {coupanCode,id,individual_names,discount,applyProduct, productCollection,applyCustomer,customerCollection,startDate,endDate,description} =req.body;
  if (discount && endDate){
    try {
      Coupan.findOne({ applyProduct:applyProduct }).exec((applyProduct) => {
        if (coupanCode.length >=5 && coupanCode.length <=15 ){
          const couponCodeDiscount = new Coupan({
              coupanCode,
              id,
              individual_names,
              discount,
              applyProduct,
              productCollection,
              applyCustomer,
              customerCollection,
              startDate,
              endDate,
              description
          });


          couponCodeDiscount 
            .save()
            .then((coupanCodeProduct) => {
              console.log(coupanCodeProduct)
              return res.status(201).json({
                status: true,
                message: "successfully has been created....!",
                coupanCodeProduct,
              });
            })
          .catch((error) => {
              console.log(error);
              return res.status(400).json({
                  status: false,
                  message: "Something went wrong.You might have missed some field",
                  error,
              })
          })
        } else {
          return res.status(403).json({
              status: false,
              message: "Unmatched Coupon Code. Discount Denied !!",
          });
        }
      })
    //     db.Coupancode.findOne({applyproduct});
    //     db.Coupancode.findOne({applyCustomer});
    //       if (applyProduct  === "milk"){
    //         if (applyCustomer === "individual"){
    //           db.range.aggregate({
    //             $selected_users : {
    //               id:0,
    //               individual_names: 5,
    //               result: {
    //                 $range: [$id,$individual_names]
    //               }
    //             }
    //           }
    //           )
    //         }
    //         //   if (applyCustomer === "Group"){
                
    //         //   
    //       } else {
    //         if (applyProduct === "grociries"){
    //           return res.status(403).json({
    //             status: false,
    //             message: "oop... sorry this coupan code only applicable for milk producsts..... !",
    //           });
    //         }
    //       }
    } catch (error) {
      return res.status(400).json({
          status: false,
          message: "Invalid Product id or Coupon Code...",
      });
    }
  } else {
    return res.status(400).json({
        status: false,
        message: "Something went Wrong, Discount or expiration time is invalid ",
    });
  }
}




// here is the get api for coupanCode..... 
exports.getCoupan = async ( req,res ) => {
  Coupan.find({}).exec((error ,coupanCode) => {
    if (error){
      return res.status(400).send("the error is.... ", error);
    }else if(coupanCode) {
      return res.status(201).send(coupanCode);
    }
  })
}