const { Bicycle } = require("../../models/bicycles");

const addBicycle = async (req, res) => {
  const result = await Bicycle.create(req.body);
  res.status(201).json(result);
};

module.exports = addBicycle;
