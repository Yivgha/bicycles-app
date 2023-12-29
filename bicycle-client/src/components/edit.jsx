import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useFormik } from "formik";
import validationSchema from "../validation/formValidation";
import deleteBicycleById from "../api/deleteById";
import handleStatusById from "../api/handleStatusById";
import fetchEditById from "../api/fetchEdit";

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  const { _id, name, type, color, price, wheel_size, description, status } =
    state;

  const baseValues = {
    name: name,
    type: type,
    color: color,
    wheel_size: wheel_size,
    price: price,
    description: description,
    status: status,
  };

  const [values, setValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // LOADING
  useEffect(() => {
    isLoading === true ? Loading.hourglass("Loading...") : Loading.remove();
  }, [isLoading]);

  //GET BASIC STATUS INFO
  useEffect(() => {
    setIsLoading(true);
    const data = [status, "available", "unavailable", "busy"];
    const trimValues = data.splice(1);
    setValues(trimValues);
    setSelectedValues(data[0]);
    setIsLoading(false);
  }, [status]);

  // CHANGE OPTIONS
  const onOptionChange = async (options) => {
    setSelectedValues(options);
    formik.values.status = options;
  };

  // CHANGE STATUS ON BACK
  useEffect(() => {
    const handleStatus = async () => {
      setIsLoading(true);
      try {
        const id = params.id.toString();
        handleStatusById(id, selectedValues);
      } catch (error) {
        console.log(error);
        Notify.failure("An error occured with status");
      }
      setIsLoading(false);
    };
    handleStatus();
  }, [selectedValues, status, params.id]);

  // SUBMIT FORM
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      fetchEditById(_id, values);
      Notify.success("Edited!");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Notify.failure("Something went wrong");
      setIsLoading(false);
    }
  };

  // RESET FORM
  const handleReset = () => {
    formik.initialValues = baseValues;
  };

  //  FORMIK OPTIONS
  const formik = useFormik({
    initialValues: baseValues,
    validationSchema,
    onSubmit: handleSubmit,
    onReset: handleReset,
  });

  return (
    <div className="edit-wrapper">
      <div className="set-btn">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="edit-back-btn"
        >
          Go back
        </button>
      </div>
      <div className="edit-info">
        <div className="edit-top">
          <p className="top-name">
            {baseValues.name.toUpperCase()}{" "}
            <span className="top-subtitle">
              - {baseValues.type.toUpperCase()} (
              {baseValues.color.toUpperCase()})
            </span>
          </p>
          <p className="element-price">{baseValues.price} UAH/hr</p>
        </div>
        <div className="edit-bottom">
          <div className="edit-status-box">
            <p className="element-status">STATUS:</p>
            {/* STATUS CHANGE */}
            <select
              className="element-status-select edit-status-select"
              name="select-status"
              value={selectedValues}
              onChange={(e) => onOptionChange(e.target.value)}
            >
              {values.map((el, index) => {
                if (el === !selectedValues) {
                  return el;
                }
                return (
                  <option key={index} value={el} className="element-option">
                    {el.charAt(0).toUpperCase() + el.slice(1)}
                  </option>
                );
              })}
            </select>
            <div className="set-btn">
              <button
                type="button"
                className="edit-back-btn edit-delete-btn"
                onClick={() => {
                  deleteBicycleById(_id);
                  navigate("/");
                  Notify.success("Deleted!");
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="top-id">ID: {state._id}</p>
        </div>
      </div>
      {/* FORM */}
      <form
        id="edit-form"
        className="edit-form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <div className="create-form__row">
          <div className="create-input-box">
            <input
              type="text"
              className="create-form__input"
              placeholder="Name"
              autoComplete="false"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="error formik-error">{formik.errors.name}</p>
            )}
          </div>
          <div className="create-input-box">
            <input
              type="text"
              autoComplete="false"
              name="type"
              className="create-form__input"
              placeholder="Type"
              value={formik.values.type}
              onChange={formik.handleChange}
            />
            {formik.touched.type && formik.errors.type && (
              <div className="error formik-error">{formik.errors.type}</div>
            )}
          </div>
        </div>
        <div className="create-form__row">
          <div className="create-input-box">
            <input
              type="text"
              autoComplete="false"
              name="color"
              className="create-form__input"
              placeholder="Color"
              value={formik.values.color}
              onChange={formik.handleChange}
            />
            {formik.touched.color && formik.errors.color && (
              <div className="error formik-error">{formik.errors.color}</div>
            )}
          </div>
          <div className="create-input-box">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="false"
              name="wheel_size"
              className="create-form__input"
              value={formik.values.wheel_size}
              placeholder="Wheel size (12 - 36)"
              pattern="[0-9]{2}"
              onChange={formik.handleChange}
            />
            {formik.touched.wheel_size && formik.errors.wheel_size && (
              <div className="error formik-error">
                {formik.errors.wheel_size}
              </div>
            )}
          </div>
        </div>
        <div className="create-form__row">
          <div className="create-input-box">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="false"
              name="price"
              className="create-form__input"
              placeholder="Price 000.00"
              value={formik.values.price}
              pattern="[0-9]{3,5}.[0-9]{2}"
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="error formik-error">{formik.errors.price}</div>
            )}
          </div>
          <div className="create-input-box">
            <input
              type="text"
              name="id"
              autoComplete="false"
              disabled
              className="create-form__input"
              value={`ID (set auto): ${state._id}`}
              placeholder="ID (slug) will be auto set"
            />
          </div>
        </div>
        <div className="create-input-box">
          <textarea
            type="text"
            autoComplete="false"
            name="description"
            value={formik.values.description}
            placeholder="Description"
            className="create-form__description"
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error formik-error">
              {formik.errors.description}
            </div>
          )}
        </div>

        <div className="create-form__btns">
          <button type="submit" className="create-form__btn">
            Save
          </button>
          <button type="reset" className="create-form__btn">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
