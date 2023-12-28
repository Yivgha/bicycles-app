const { Bicycle } = require("../../models/bicycles");

const getListBicycles = async (req, res) => {
  const result = await Bicycle.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

module.exports = getListBicycles;
