import Swal from "sweetalert2";

export async function getHv(axiosInstance, usuario) {
  try {
    const response = await axiosInstance.get(`/hojaVida/${usuario}`);
    // console.log(response.data);
    return response.data[0];
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
