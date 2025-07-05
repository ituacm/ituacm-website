import axios from "axios";

export const getEvents = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/events");
    console.log("Events: " + response.data[0]._id);
    return response.data;
  } catch (error) {
    console.log("Error getting events: " + error);
    return [];
  }
};
