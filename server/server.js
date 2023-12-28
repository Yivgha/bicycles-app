const app = require("./app");
const mongoose = require("mongoose");

const { ATLAS_URI, PORT } = process.env;

mongoose
  .connect(ATLAS_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
