import useAxios from "../../utils/useAxios";


const updatePositions = async (itemId, newPosition, newColumnId) => {
    const api = useAxios();
    try {
      const response = await api.put(`/api/items/${itemId}/update_position/`, {
        position: newPosition,
        column_id: newColumnId,
      });
  
      // Do anything with the updated item data if necessary
      console.log(response.data);
  
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  export default updatePositions