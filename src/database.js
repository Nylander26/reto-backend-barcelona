const mongoose = require("mongoose");
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sdlkg2q.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected..."))
  .catch((err) => console.log(err));
