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
        const response = await api.get("/orders/all");
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

  // useEffect(()=>{
  //       fetch('http://localhost:8000/api/orders/')
  //       .then(response => {
  //           if (response.ok) {
  //             return response.json()
  //           } else {
  //             throw Error(`Something went wrong: code ${response.status}`)
  //           }
  //         })
  //       .then(setOrders)
  //       .catch(error => {
  //           console.log('Aaalarmee!!!',error)
  //           setError('Ошибка, подробности в консоли')
  //         })
  //     }, []);
  
  return (
      <div>
      {res?
       <p>{res}</p>
      :
        <OrdersList orders={orders} title=""/>
      }
      </div>
  );
}

export default GetOrders