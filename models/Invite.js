const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
    senderid: {
        type: '',
      },
  

  createdBy: {
    type: String,
    default:"Admin"
  },
 
});

module.exports = new mongoose.model("Invite", inviteSchema);
