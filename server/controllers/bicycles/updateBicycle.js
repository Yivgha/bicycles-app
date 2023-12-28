const { Bicycle } = require("../../models/bicycles");
const { RequestError } = require("../../helpers");

const updateBicycle = async (req, res) => {
  const { id } = req.params;
  const result = await Bicycle.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateBicycle;
