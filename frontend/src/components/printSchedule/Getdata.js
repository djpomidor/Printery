import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";

const Getdata = () => {
    console.log('Aaalarmee!!!!!!!!!!')
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const [res, setRes] = useState("");
  const api = useAxios();  
     
  useEffect(() => {
    const fetchData = async () => {
      const currentDate = "2023-07-27 15:33:28.146113";
      try {
        const response = await api.get("/orders/last-month/" + currentDate);
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
 
  return orders;
};

export default Getdata