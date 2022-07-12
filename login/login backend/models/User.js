const mongoose = require("mongoose");
//create index on username
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
  {
    pre: {
      save: function (next) {
        if (this.isModified("password")) {
          this.password = bcrypt.hashSync(this.password, 8);
        }
        next();
      },
    },
  }
);
module.exports = mongoose.model("User", userSchema);
