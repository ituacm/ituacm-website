import axios from "axios";

export const getCourses = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/courses");
    console.log("Courses: " + response.data[0]._id);
    return response.data;
  } catch (error) {
    console.log("Error getting courses: " + error.response.data.message);
    return [];
  }
};
