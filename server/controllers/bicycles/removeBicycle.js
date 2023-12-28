const { Bicycle } = require("../../models/bicycles");
const { RequestError } = require("../../helpers");

const removeBicycle = async (req, res) => {
  const { id } = req.params;
  const result = await Bicycle.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.send(result);
  res.status(200).json({ message: "Bicycle deleted" });
};

module.exports = removeBicycle;
