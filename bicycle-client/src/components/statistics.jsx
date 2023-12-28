const Statistics = ({ bicycles }) => {

  const getAverage = () => {
 let sum = 0;
  bicycles.forEach(function(obj) { sum += obj.price });
    const average = sum / bicycles.length;
    return average.toFixed(2);
  }
  
  return (
    <div className="stat-wrapper">
      <h2 className="stat-title">STATISTICS</h2>
      <p className="stat-name">
        Total Bikes: <span className="stat-description">{bicycles.length}</span>
      </p>
      <p className="stat-name">
        Available Bikes: <span className="stat-description">{bicycles.filter((ava) => ava.status === "available").length}</span>
      </p>
      <p className="stat-name">
        Booked Bikes: <span className="stat-description">{bicycles.filter((b) => b.status === "busy").length}</span>
      </p>
      <p className="stat-name">
        Average bike cost:{" "}
        <span className="stat-description">{getAverage()} UAH/hr. </span>
      </p>
    </div>
  );
};

export default Statistics;
