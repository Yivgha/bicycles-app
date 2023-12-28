import * as Yup from "yup";
// ERROR VALIDATION IN CLIENT
// let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Name must be minimum 5 chars")
    .max(15, "Name must not be more than 15 chars")
    .required("Name is required"),
  type: Yup.string()
    .min(5, "Type must be minimum 5 chars")
    .max(15, "Type must not be more than 15 chars")
    .required("Type is required"),
  color: Yup.string()
    .min(5, "Color must be minimum 5 chars")
    .max(10, "Color must not be more than 10 chars")
    .required("Color is required"),
  wheel_size: Yup.number("Must be a number")
    .min(12, "Min value is 12")
    .max(36, "Max value is 36")
    .required("Wheel size is required"),
  price: Yup.number()
    .positive()
    .min(100, "Min is 100, decimal")
    .max(3000, "Max is 3000, decimal")
    .test(
      "is-decimal",
      "Should be a decimal with two digits after dot",
      (val) => (val + "").match(/^[0-9]*(\.[0-9]{0,2})?$/)
    )
    .required("Price is required, decimal with two digits after dot"),
  description: Yup.string()
    .min(5, "This field can't be empty, min 5 chars")
    .max(150, "Max amount is 150 chars")
    .required("Description is required"),
});

export default validationSchema;
