const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");
const Joi = require("joi");

const bicycleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for bicycle"],
    },
    type: {
      type: String,
      required: [true, "Set type of bicycle"],
    },
    color: {
      type: String,
      required: [true, "Set color of bicycle"],
    },
    wheel_size: {
      type: Number,
      required: [true, "Set wheel size of bicycle"],
    },
    price: {
      type: Number,
      required: [true, "Set price for bicycle"],
    },
    description: {
      type: String,
      required: [true, "Set description for bicycle"],
    },
    status: {
      type: String,
      required: [true, "Set status of bicycle"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Bicycle = model("bicycle", bicycleSchema);

bicycleSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().min(5).max(30).required("From 5 to 30 chars are required"),
  type: Joi.string().min(5).max(30).required("From 5 to 30 chars are required"),
  color: Joi.string()
    .min(5)
    .max(30)
    .required("From 5 to 30 chars are required"),
  wheel_size: Joi.number()
    .positive()
    .min(12)
    .max(36)
    .required("Numbers from 12 to 36 are required"),
  price: Joi.number()
    .positive()
    .precision(2)
    .required("Numbers with format 000(0).00 are required"),
  description: Joi.string().min(5).max(150).required("This field is required"),
  status: Joi.string()
    .valid("available", "busy", "unavailable")
    .required("Status is required"),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid("available", "busy", "unavailable"),
});

const schemas = {
  addSchema,
  updateStatusSchema,
};

module.exports = {
  Bicycle,
  schemas,
};
