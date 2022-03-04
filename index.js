const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
const app = express();
const addressRoute = require("./routes/addressslip.route");
const roleRoute = require("./routes/role.router");
const userRoute = require("./routes/User.route");
const cLoginRoute = require("./routes/coustomerlogin.route");
const userRoleRoute = require("./routes/userRole.route");
const settingRoute = require("./routes/setting.route");
const mongoose = require("mongoose");
const permissionRoute = require("./routes/permission.route");
const moduleRoute = require("./routes/module.route");
const categoryRoute = require("./routes/category.route");
const coupanCode = require("./routes/coupanCoderoute");
const productRoute = require("./routes/product.route");
const BrandRoute = require("./routes/brand.route");
const WalletRoute = require("./routes/Wallet.route");
const RefferalRoute = require("./routes/refferal.route");
const CityRoute = require("./routes/city.route");
const CityAvaibilityRoute = require("./routes/cityAvailability.route");
const StockRoute = require("./routes/stock.route");
const OrderRoute = require("./routes/order.route");
const SupportRoute = require("./routes/support.route");
const CustomerProfile = require("./routes/CustomerProfile.route");
const CustomerCollection = require("./routes/customercollection.route");
const SubscriptionRoute = require("./routes/subscription.route");
const VoccationRoute = require("./routes/Voccation.route");
const DelivaryRoute = require("./routes/delivary.route");
const CashbackRoute = require("./routes/cashback.route");
const Banner = require("./routes/banner.route");
const TransactionRoute = require("./routes/transaction.route");
const cors = require("cors");
const multer = require("multer");
//const path = require("path/posix");
const fs = require("file-system");
const Os = require("os");

// const ParentCategoryRoute=require("./routes/ParentCategory.route");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 9000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.bznq9.mongodb.net/${process.env.DB_database}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,

    }
  )
  .then(() => {
    console.log("connected with mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Route middleware

app.use("/api/address", addressRoute);
app.use("/api/userrole", userRoleRoute);
app.use("/api/role", roleRoute);
app.use("/api/user", userRoute);
app.use("/api/login", cLoginRoute);
app.use("/api/profile", CustomerProfile);
app.use("/api/setting", settingRoute);
app.use("/api/module", moduleRoute);
app.use("/api/brand", BrandRoute);
app.use("/api/wallet", WalletRoute);
app.use("/api/cashback", CashbackRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/coupanCode", coupanCode);
app.use("/api/refferal", RefferalRoute);
app.use("/api/city", CityRoute);
app.use("/api/cityavaibility", CityAvaibilityRoute);
app.use("/api/customercollection", CustomerCollection);
app.use("/api/stock", StockRoute);
app.use("/api/order", OrderRoute);
app.use("/api/subscription", SubscriptionRoute);
app.use("/api/voccation", VoccationRoute);
app.use("/api/delivary", DelivaryRoute);
app.use("/api/support", SupportRoute);
app.use("/api/transaction", TransactionRoute);
app.use("/api/banner", Banner);
//app.use('/uploads', express.static(path.join(__dirname, '/uploads/product')));
app.use("/uploads", express.static("uploads"));
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    let pathimage = path.join(
      // "D:/Adee infotech/AKSHAY/developerzonehere-countrydelight-dfe810547ff2/src/",
      // "uploads"
      "./uploads",
      "product"
    );
    if (!fs.existsSync(pathimage)) {
      fs.mkdirSync(pathimage, { recursive: true });
    }
    cb(null, pathimage);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
var multiple = upload.fields([{ name: "productimage" }, { name: "thumbnail" }]);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/single", multiple, (req, res) => {
  console.log(req.file);
  res.send("single file upload succecsfuly");
});

var single = upload.fields([{ name: "catimg" }]);
app.post("/catimg", single, (req, res) => {
  console.log(req.file);
  res.send("single file upload succecsfuly");
});

var banner = upload.fields([{ name: "bannerImg" }]);
app.post("/banner", banner, (req, res) => {
  console.log(req.file);
  res.send("bannerImg file upload succecsfuly"+req.file);
});

var profileimg = upload.fields([{ name: "profileImg" }]);
app.post("/profileimg", profileimg, (req, res) => {
  console.log(req.file);
  res.send("profileimg file upload succecsfuly"+req.file);
});
app.listen(PORT, () => {
  console.log(`server running at port:${PORT}`);
});
