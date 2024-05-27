import Swal from "sweetalert2";

export async function fetchAllAnalistasGenerales(axiosInstance) {
  try {
    const response = await axiosInstance.get(`/analistasGenerales`);
    // console.log(response.data);
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
export async function fetchUser(axiosInstance, correo) {
  try {
    const response = await axiosInstance.get(`/login/${correo}`);
    return response.data[0];
  } catch (error) {
    Swal.fire({
      title: "Error de autenticacion",
      text: "Error: " + error.response.data.message,
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  }
}
