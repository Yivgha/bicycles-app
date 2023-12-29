import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import handleStatusById from "../api/handleStatusById";

const ListElement = ({ bicycle, deleteBicycle, getBicycles, bicycles }) => {
  const { name, _id, type, color, price, status } = bicycle;

  const [values, setValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = [status, "available", "unavailable", "busy"];
    const trimValues = data.splice(1);

    setValues(trimValues);
    setSelectedValues(data[0]);
  }, [status]);

  // CHANGE OPTIONS
  const onOptionChange = async (options) => {
    setSelectedValues(options);
  };

  // STATUS CHANGE
  useEffect(() => {
    const handleStatus = () => {
      try {
        handleStatusById(_id, selectedValues).then((res) => {
          getBicycles();
        });
      } catch (error) {
        console.log(error);
        Notify.failure("Error with status");
      }
    };
    handleStatus();
    // eslint-disable-next-line
  }, [selectedValues, _id]);

  return (
    <div
      className={[
        "element-wrapper",
        bicycle.status === "available"
          ? "available-border"
          : bicycle.status === "busy"
          ? "busy-border"
          : "unavailable-border",
      ].join(" ")}
    >
      <div className="close-icon" onClick={() => deleteBicycle(_id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 10 10"
          fill="currentColor"
        >
          <path
            d="M9 9L1 1M9 1L1 9"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className="element-top "
        onClick={() => navigate(`/edit/${_id}`, { state: bicycle })}
      >
        <div className="top-info">
          <p className="top-name">
            {name.toUpperCase()}{" "}
            <span className="top-subtitle">
              - {type.toUpperCase()} ({color.toUpperCase()})
            </span>
          </p>
        </div>
        <div>
          <p className="top-id">ID: {_id}</p>
        </div>
      </div>
      <div className="element-bottom">
        <div className="element-status-box">
          <p className="element-status">STATUS:</p>
          <select
            className="element-status-select"
            name="status-select"
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
        </div>
        <div>
          <p className="element-price">{price.toFixed(2)} UAH/hr</p>
        </div>
      </div>
    </div>
  );
};

export default ListElement;
