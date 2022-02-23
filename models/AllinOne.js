var mongoose = require('mongoose');
    var userCollection = require('./CustomerProfile');//import user model file
    var resources = {
    username: "$username",
    phone: "$phone",
    city: "$city",
    locality: "$locality",
};

    userCollection.aggregate([{
            $group: resources
        }, {
            $lookup: {
                from: "Subscription", // collection to join
                localField: "_id",//field from the input documents
                foreignField: "customer",//field from the documents of the "from" collection
                as: "subdata"// output array field
            }
        }],function (error, data) {
         return res.json(data);
     //handle error case also
});
