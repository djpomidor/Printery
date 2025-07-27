import useAxios from "../../utils/useAxios";
const API_URL = process.env.REACT_APP_API_URL;

const UpdateCtpInfo = async (api, values) => {
  const { plates, plates_bad, plates_done_date, notes, status } = values.ctp;

  try {
    const response = await api.put(`${API_URL}/api/ctp/${values.ctp_id}/update_ctp_info/`, {
      plates,
      plates_bad,
      plates_done_date,
      notes,
      status,
    });

    if (response.status === 200) {
      alert("Удачно обновлено! status: 200");
      console.log("___--", response.data);
    } else {
      alert("Something went wrong!");
      console.log("Error!:", response.data);
    }
  } catch (error) {
    console.error("errors!", error);
  }
};

export default UpdateCtpInfo;
