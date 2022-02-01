const Product = require("../models/Product");
const { populate } = require("../models/Wallet");
const ObjectID = require("mongodb").ObjectId;
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
  const { product, qty } = req.body;
  console.log(product,qty);
  if (product !== undefined) {
    Product.findOneAndUpdate({ _id: product }).exec((err, data) => {
      if (data) {
        if (qty === undefined) {
          CustomerLogin.findOneAndUpdate(
            { _id: data._id },
            {
              productName: data.productName,
              brand: data.brand,
              category: data.category,
              description: data.description,
              collectio: data.collectio,
              availableFor: data.availableFor,
              sku: data.sku,
              tags: data.tags,
              quantity: data.quantity,
              stock: data.stock,
              price: data.price,
              sellingprice: data.sellingprice,
              offerprice: data.offerprice,
              offerfornewcustomer: data.offerfornewcustomer,
              thumbnail: data.thumbnail,
              productImage: data.productImage ,
            },
            { new: true, upsert: true }
          ).exec((err, data) => {
            if (data) {
              return res.status(200).json({
                status: true,
                message: "quantity details  is updated !",
                data: data,
              });
            } else if (err) {
              return res.status(200).json({
                status: false,
                message: "quantity details is updating failed !",
                data: data,
              });
            }
          });
        } else {
          console.log("inside else",);
          Product.findOneAndUpdate(
            { _id: data._id },
            {
              productName: data.productName,
              brand: data.brand,
              category: data.category,
              description: data.description,
              collectio: data.collectio,
              availableFor: data.availableFor,
              sku: data.sku,
              tags: data.tags,
              quantity: data.quantity-qty,
              stock: data.stock,
              price: data.price,
              sellingprice: data.sellingprice,
              offerprice: data.offerprice,
              offerfornewcustomer: data.offerfornewcustomer,
              thumbnail: data.thumbnail,
              productImage: data.productImage ,
            },
            { new: true, upsert: true }
          ).exec((err, data) => {
            if (data) {
              return res.status(200).json({
                status: true,
                message: "quantiy details  is updated !",
                data: data,
              });
            } else if (err) {
              return res.status(200).json({
                status: false,
                message: "quantiy details is updating failed !",
                data: data,
              });
            }
          });
        }
      }
    });
  } else {
    return res.status(200).json({
      status: false,
      message: "no product id isFound !",
      data: data,
    });
  }
  
};
