import Swal from "sweetalert2";

export async function getAllDisciplinas(axiosInstance) {
  try {
    const response = await axiosInstance.get(`/disciplinas`);
    // console.log(response);
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error: " + error.response.data.message,
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  }
}
