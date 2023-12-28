import { useState, useEffect} from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useFormik } from 'formik';
import validationSchema from "../validation/formValidation";
import initialFormValues from "../data/initialFormValues";
import addPost from "../api/addPost";

export default function Create({getBicycles}) {
  const [isLoading, setIsLoading] = useState(false);
  
  // SUBMIT FORM
  const handleSubmit = (values) => {
    try {
      setIsLoading(true);

      addPost(values).then((res) => {
        if (!res.ok) {
          Notify.failure("Something went wrong");
          
        } else {
          Notify.success('Successfully created!');
          getBicycles();
          formik.handleReset()
        }
      });
     
      setIsLoading(false);
      
    } catch (error) {
      console.error(error);
      Notify.failure("Something went wrong")
      setIsLoading(false);
    }
  };

  // RESET FORM
  const handleReset = () => {
    formik.initialValues = initialFormValues;
  }

//  FORMIK OPTIONS
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: handleSubmit,
    onReset: handleReset,
  });

  // LOADING
  useEffect(() => {
    isLoading === true ? Loading.hourglass("Loading...") : Loading.remove();
  }, [isLoading]);
 
  return (
    <form id="create-form" className="create-form" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className="create-form__row">
        <div className="create-input-box">
        <input
          type="text"
          className="create-form__input"
            placeholder="Name"
            id="name"
            name="name"
            autoComplete="false"
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
            name="type"
          className="create-form__input"
            placeholder="Type"
            autoComplete="false"
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
            name="color"
            autoComplete="false"
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
          type="text" inputMode="numeric"
            name="wheel_size"
            className="create-form__input"
            autoComplete="false"
           value={formik.values.wheel_size}
          placeholder="Wheel size (12 - 36)"
            // pattern="[0-9]{2}"
            onChange={formik.handleChange}
          />
          {formik.touched.wheel_size && formik.errors.wheel_size && (
            <div className="error formik-error">{formik.errors.wheel_size}</div>
          )}
        </div>
      </div>
      <div className="create-form__row">
        <div className="create-input-box">
          <input
          type="text" inputMode="numeric"
          name="price"
          className="create-form__input"
            placeholder="Price 000.00"
            autoComplete="false"
           value={formik.values.price}
          // pattern="[0-9]{3,5}.[0-9]{2}"
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
            <div className="error formik-error">{formik.errors.description}</div>
          )}
      </div>
       
      <div className="create-form__btns">
        <button type="submit" className="create-form__btn" >
          Save
        </button>
        <button
          type="reset"
          className="create-form__btn"
        >
          Clear
        </button>
      </div>

    </form>
  );
}
