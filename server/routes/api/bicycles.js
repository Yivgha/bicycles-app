const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/bicycles");

const { ctlrWrapper } = require("../../helpers");
const validateBody = require("../../middlewares");

const { schemas } = require("../../models/bicycles");

router.get("/", ctlrWrapper(ctrl.getListBicycles));

router.get("/:id", ctlrWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctlrWrapper(ctrl.addBicycle));

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  ctlrWrapper(ctrl.updateBicycle)
);

router.patch(
  "/:id/status",
  validateBody(schemas.updateStatusSchema),
  ctlrWrapper(ctrl.updateStatusBicycle)
);

router.delete("/:id", ctlrWrapper(ctrl.removeBicycle));

module.exports = router;
