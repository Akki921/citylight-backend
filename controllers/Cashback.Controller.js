const Cashback = require("../models/Cashback");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

module.exports = {
  //register new Wallet
  createCashbackWallet: async (CashbackData) => {
      console.log(CashbackData)
    return new Promise(async (resolve) => {
      try {
        Cashback.findOne(
          {
            userId: CashbackData.userId,
          },
          async (err, data) => {
            if (err)
              return resolve({
                status: false,
                message: "Please try after some time"+err,
              });
            if (data)
              return resolve({
                status: false,
                message: "Wallet is already created",
              });
            var newCashback = new Cashback({
              userId: CashbackData.userId,
              CreatedDate: new Date(),
              CreatedBy: 0,
            });

            newCashback.save(async (error, cashback) => {
              if (error)
                return resolve({
                  status: false,
                  message: "Please try after some time",
                });
              if (cashback) {
                var newTrasaction = new Transaction({
                    CashbackWalletId: cashback._id,
                });
                newTrasaction.save(async (error, transaction) => {
                  if (error)
                    return resolve({
                      status: false,
                      message: "Please try after some time",
                    });
                  return resolve({
                    status: true,
                    data: { cashback, transaction },
                    message: "cashback has been created",
                  });
                });
              }
              return resolve({
                status: true,
                data: cashback,
                message: "cashback has been created",
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

  getAllCashbackWallet: async () => {
    return new Promise(async (resolve) => {
      try {
        Cashback.find({})
          .populate("userId", "username")
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
                message: "Data retrieved successfully",
              });
          });
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time"+error,
        });
      }
    });
  },

  getAllCashbackWalletDataById: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Cashback.find({ _id: id }, async (err, data) => {
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

  makeTransaction: async (WalletData) => {
    //   console.log(WalletData);
    const { cashbackBalance, debit, credit,    } = WalletData;
    const cashbackBalances = parseInt(cashbackBalance);
    const credits = parseInt(credit);
    const debits = parseInt(debit);
    console.log(credits, debits, cashbackBalances);
    return new Promise(async (resolve) => {
      try {
        if (cashbackBalances >= 0) {
          if (debits > 0) {
            var newTrasaction = new Transaction({
              walletId: WalletData.id,
              debit: debits,
              cashbackBalance: cashbackBalances - debits,
            });
            newTrasaction.save((error, data) => {
              if (error) {
                return resolve({
                  status: true,
                  message: "something went wrong",
                });
              }
              if (data) {
                Cashback.findOneAndUpdate(
                  { _id: data.walletId },
                  { cashbackBalance: data.cashbackBalance },
                  (err, data) => {
                    if (err) {
                      return resolve({
                        status: true,
                        message: "there is a problem",
                      });
                    }
                    if (data) {
                      return resolve({
                        status: true,
                        data1: data,
                        message: "Wallet Recharged successfully",
                      });
                    }
                  }
                );
              }
            });
          } else if (credits > 0) {
            console.log("enter into credits", WalletData.id);
            var newTrasaction = new Transaction({
              walletId: WalletData.id,
              credit: credits,
              availableBalance: availableBalances + credits,
            });
            newTrasaction.save((error, data) => {
              console.log(data);
              if (error) {
                return resolve({
                  status: true,
                  message: "something went wrong",
                });
              }
              if (data) {
                Wallet.findOneAndUpdate(
                  { _id: data.walletId },
                  { availableBalance: data.availableBalance },
                  (err, data) => {
                    if (err) {
                      return resolve({
                        status: true,
                        message: "there is a problem",
                      });
                    }
                    if (data) {
                      console.log("succesfull", data);
                      return resolve({
                        status: true,
                        data2: data,
                        message: "Wallet Recharged successfully",
                      });
                    }
                  }
                );
              }
            });
          }
        } else {
          return resolve({
            status: true,
            message: "You Do not Enough Balance",
          });
        }
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time",
        });
      }
    });
  },

  getAllTransactionbyid: async (id) => {
    return new Promise(async (resolve) => {
      try {
        Transaction.find(
          { walletId: { $in: mongoose.Types.ObjectId(id) } },
          async (err, data) => {
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
          }
        );
      } catch (error) {
        return resolve({
          status: false,
          message: "Please try after some time2" + error,
        });
      }
    });
  },

 
 
};
