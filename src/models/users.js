const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    access_token: String,
    login: String,
    id: String,
    avatar_url: String,
    html_url: String,
    repos_url: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
