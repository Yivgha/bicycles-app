const { Bicycle } = require("../../models/bicycles");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Bicycle.findById(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;
