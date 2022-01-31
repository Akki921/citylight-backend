const Product = require("../models/Product");
const { populate } = require("../models/Wallet");
const  ObjectID = require('mongodb').ObjectId;
let product;
exports.createProduct = (req, res) => {
  const {
    productName,
    description,
    category,
    collectio,
    availableFor,
    sku,
    tags,
    productImage,
    thumbnail,
    stock,
    brand,
    quantity,
    deliveryToday,
    deliveryTomorrow,
    price,
    sellingprice,
    offerprice,
    offerfornewcustomer,
  } = req.body;
  console.log(
    " req.body,",
    productName,
    description,
    category,
    collectio,
    availableFor,
    sku,
    tags,
    productImage,
    thumbnail,
    stock,
    brand,
    quantity,
    deliveryToday,
    deliveryTomorrow,
    price,
    sellingprice,
    offerprice,
    offerfornewcustomer
  );
  if (productImage.length > 0 && thumbnail.length == 0) {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      thumbnail,
      tags,
      sku,
      stock,
      brand,
      quantity,
      deliveryToday,
      deliveryTomorrow,
      price,
      sellingprice,
      offerprice,
      offerfornewcustomer,
    });
  } else if (productImage.length == 0 && thumbnail.length > 0) {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      productImage,
      tags,
      sku,
      brand,
      quantity,
      deliveryToday,
      deliveryTomorrow,
      price,
      sellingprice,
      offerprice,
      offerfornewcustomer,
    });
  } else if (productImage.length > 0 && thumbnail.length > 0) {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      thumbnail,
      productImage,
      tags,
      sku,
      brand,
      quantity,
      deliveryToday,
      deliveryTomorrow,
      price,
      sellingprice,
      offerprice,
      offerfornewcustomer,
    });
  } else {
    product = new Product({
      productName,
      description,
      category,
      availableFor,
      collectio,
      tags,
      sku,
      brand,
      quantity,
      deliveryToday,
      deliveryTomorrow,
      price,
      sellingprice,
      offerprice,
      offerfornewcustomer,
    });
  }

  product.save((err, data) => {
    if (err) return res.status(400).json({ err });
    if (data) {
      return res.status(200).json({ data });
    }
  });
};

exports.getproduct = async (req, res) => {
  Product.find({})
    .populate("category", "CategoryName Description")
    .populate("brand", " BrandName")
    .exec((error, Product1) => {
      if (error)
        return res.status(400).json({
          status: false,
          message: "Please try after some time" + error,
        });
      if (Product1) {
        return res.status(200).json({
          status: true,
          data: Product1,
          message: "Product get successfully.",
        });
      }
    });
};

exports.updateproduct = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const {
        id,
        productName,
        description,
        category,
        collectio,
        availableFor,
        sku,
        tags,
        productImage,
        thumbnail,
        stock,
        brand,
        quantity,
        deliveryToday,
        deliveryTomorrow,
        price,
        sellingprice,
        offerprice,
        offerfornewcustomer,
      } = req.body;

      console.log(
        "near try" + id,
        productName,
        description,
        category,
        collectio,
        availableFor,
        sku,
        tags,
        productImage,
        thumbnail,
        stock,
        brand,
        quantity,
        deliveryToday,
        deliveryTomorrow,
        price,
        sellingprice,
        offerprice,
        offerfornewcustomer
      );
      if (thumbnail !== undefined && productImage === undefined) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName: productName,
            description: description,
            category: category,
            availableFor: availableFor,
            collectio: collectio,
            thumbnail: thumbnail,
            tags: tags,
            sku: sku,
            stock: stock,
            brand: brand,
            quantity: quantity,
            deliveryToday: deliveryToday,
            deliveryTomorrow: deliveryTomorrow,
            price: price,
            sellingprice: sellingprice,
            offerprice: offerprice,
            offerfornewcustomer: offerfornewcustomer,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            console.log(data);
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product update successfully.",
            });
          } else if (err) {
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product not update successfully.",
            });
          }
        });
      } else if (thumbnail == undefined && productImage !== undefined) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName: productName,
            description: description,
            category: category,
            availableFor: availableFor,
            collectio: collectio,
            productImage: productImage,
            tags: tags,
            sku: sku,
            stock: stock,
            brand: brand,
            quantity: quantity,
            deliveryToday: deliveryToday,
            deliveryTomorrow: deliveryTomorrow,
            price: price,
            sellingprice: sellingprice,
            offerprice: offerprice,
            offerfornewcustomer: offerfornewcustomer,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            console.log(data);
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product update successfully.",
            });
          } else if (err) {
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product not update successfully.",
            });
          }
        });
      } else if (thumbnail !== undefined && productImage !== undefined) {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName: productName,
            description: description,
            category: category,
            availableFor: availableFor,
            collectio: collectio,
            thumbnail: thumbnail,
            productImage: productImage,
            tags: tags,
            sku: sku,
            stock: stock,
            brand: brand,
            quantity: quantity,
            deliveryToday: deliveryToday,
            deliveryTomorrow: deliveryTomorrow,
            price: price,
            sellingprice: sellingprice,
            offerprice: offerprice,
            offerfornewcustomer: offerfornewcustomer,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            console.log(data);
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product get successfully.",
            });
          } else if (err) {
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product not get successfully.",
            });
          }
        });
      } else {
        Product.findOneAndUpdate(
          { _id: id },
          {
            productName: productName,
            description: description,
            category: category,
            availableFor: availableFor,
            collectio: collectio,
            tags: tags,
            sku: sku,
            stock: stock,
            brand: brand,
            quantity: quantity,
            deliveryToday: deliveryToday,
            deliveryTomorrow: deliveryTomorrow,
            price: price,
            sellingprice: sellingprice,
            offerprice: offerprice,
            offerfornewcustomer: offerfornewcustomer,
          },
          { new: true, upsert: true }
        ).exec((err, data) => {
          if (data) {
            console.log(data);
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product get successfully.",
            });
          } else if (err) {
            return res.status(200).json({
              status: true,
              data: data,
              message: "Product not get successfully.",
            });
          }
        });
      }
    } catch (err) {
      return res.status(200).json({
        status: false,
        message: "Please try after some time" + err,
      });
    }
  });
};

exports.updateproductqty = async (req, res) => {
  // Product.find({})
  //   .populate("category", "CategoryName Description")
  //   .populate("brand", " BrandName")
  //   .exec((error, Product1) => {
  //     if (error)
  //       return res.status(400).json({
  //         status: false,
  //         message: "Please try after some time" + error,
  //       });
  //     if (Product1) {
  //       return res.status(200).json({
  //         status: true,
  //         data: Product1,
  //         message: "Product get successfully.",
  //       });
  //     }
  //   });
  console.log(req.body);
let id=new ObjectID(req.body);
  Product.findOne({"_id":id }).exec((err, data) => {
    console.log(data);
    if (data) { 
      console.log(data);
    //  if (Data.city === undefined &&  Data.locality === undefined ) {
    //   CustomerLogin.findOneAndUpdate(
    //     { _id: data._id },
    //     {
    //       phone:data.phone,
    //       phoneotp:data.phoneotp,
    //       city:data.city,
    //       locality:data.locality,
    //     },
    //     { new: true, upsert: true }
    //   ).exec((err, data) => { 
    //     if (data) {
    //         return resolve({
    //           status: true,
    //           message: "login details  is updated !",
    //           data: data,
    //         });
    //       } else if (err) {
    //         return resolve({
    //           status: false,
    //           message: "login details is updating failed !",
    //           data: data,
    //         });
    //       }
    //     });
    //  } else {
    //    console.log('inside else',Data.city);
    //   CustomerLogin.findOneAndUpdate(
    //     { _id: data._id },
    //     {
    //       phone:data.phone,
    //       phoneotp:data.phoneotp,
    //       city:Data.city,
    //       locality:Data.locality,
    //     },
    //     { new: true, upsert: true }
    //   ).exec((err, data) => { 
    //     if (data) {
    //         return resolve({
    //           status: true,
    //           message: "login details  is updated !",
    //           data: data,
    //         });
    //       } else if (err) {
    //         return resolve({
    //           status: false,
    //           message: "login details is updating failed !",
    //           data: data,
    //         });
    //       }
    //     });
    //  }
    } 
    // else {
    //   const otp = generateOTP(4);
    //   console.log("otp", otp);
    //   var newLogin = new CustomerLogin({
    //     phone: Data.phone,
    //     phoneotp:otp,
    //   });
    //   newLogin.save(async (error, Login) => {
    //     if (error)
    //       return resolve({
    //         status: false,
    //         message: "Please try after some time",
    //       });
    //     if (Login) {
        
    //       return resolve({
    //         status: true,
    //         data: Login,
    //         message: "Login has been created",
    //       });
    //     }
    //   });
    // }
  });
};