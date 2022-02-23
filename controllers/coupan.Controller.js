const Coupan = require("../models/Coupancode");

// post coupan api ....
exports.newCoupancode = async (req, res) => {
  const {
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
    description,
  } = req.body;
  if (discount && endDate) {
    try {
      Coupan.findOne({ coupanCode: coupanCode  }).exec(
        (err, data) => {
          if (data) {
            console.log("update");
            return resolve({
              status: true,
              message: "Category is already insert !",
              data: data,
            });
          } else {
            console.log("create");
            const couponCodeDiscount = new Coupan({
              coupanCode: coupanCode,
              discount : discount,
              applyProduct : applyProduct,
              productCollection :  productCollection,
              applyCustomer :  applyCustomer,
              customerCollections :   customerCollection,
              startDate :  startDate,
              endDate : endDate,
              description : description,
            });
            couponCodeDiscount.save(async (error, coupan) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              if (coupan) {
                return resolve({
                  status: true,
                  data: coupan,
                  message: "coupan has been created",
                });
              }
            });
          }
        }
      );
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
};

// here is the get api for coupanCode.....
exports.getCoupan = async (req, res) => {
  Coupan.find({}).exec((error, coupanCode) => {
    if (error) {
      return res.status(400).send("the error is.... ", error);
    } else if (coupanCode) {
      return res.status(201).send(coupanCode);
    }
  });
};
