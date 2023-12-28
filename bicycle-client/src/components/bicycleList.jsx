import { useEffect, useState } from "react";
import Create from "./create";
import Navbar from "./navbar";
import Footer from "./footer";
import Statistics from "./statistics";
import ListElement from "./listElement";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import deleteBicycleById from "../api/deleteById";
import getAllBicycles from "../api/getBicycles";

export default function BicycleList() {
  const [bicycles, setBicycles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // LOADING
  useEffect(() => {
    isLoading === true ? Loading.hourglass("Loading...") : Loading.remove();
  }, [isLoading]);

  // FETCH LIST
 async function getBicycles() {
    setIsLoading(true);

   getAllBicycles().then((res) => setBicycles(res))
    setIsLoading(false);
  };

  useEffect(() => {
    getBicycles();
  }, []);

  // DELETE ITEM
  async function deleteBicycle(id) {
    setIsLoading(true);
    deleteBicycleById(id)
    
    const newRecords = bicycles.filter((el) => el._id !== id);
    setBicycles(newRecords);
    setIsLoading(false);
    Notify.success("Deleted!")
  }


  return (
    <div className="layout">
      <Navbar />
      <div className="home-layout">
        <div className="home-list">
          {bicycles.map((bicycle, index) => (
        <ListElement
              bicycle={bicycle}
              bicycles={bicycles}
          deleteBicycle={() => deleteBicycle(bicycle._id)}
          key={index}
          getBicycles={()=>getBicycles()}
        />
      )
    )}
          
        </div>
        <div className="vertical-divider"></div>
        <div className="home-form">
          <Create getBicycles={getBicycles} />
          <div className="horizontal-divider"></div>
          <Statistics bicycles={bicycles} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

