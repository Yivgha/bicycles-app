const { Bicycle } = require("../../models/bicycles");
const { RequestError } = require("../../helpers");

const updateStatusBicycle = async (req, res) => {
  const { id } = req.params;
  const result = await Bicycle.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Missing field status");
  }
  res.status(200).json(result);
};

module.exports = updateStatusBicycle;
