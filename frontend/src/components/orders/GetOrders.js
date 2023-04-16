import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

import OrdersList from './OrdersList';

function GetOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const [res, setRes] = useState("");
  const api = useAxios();  
     
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/orders/");
        console.log('response!!!', response.data);
        setRes(response.data.response);
        setOrders(response.data);
        
      } catch {
        console.log('Aaalarmee!!!')
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
      <>
      {res?
       <p>{res}</p>
      :
        <OrdersList orders={orders} title=""/>
      }
      </>
  );
}

export default GetOrders