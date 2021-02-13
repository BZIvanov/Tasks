const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));
};
