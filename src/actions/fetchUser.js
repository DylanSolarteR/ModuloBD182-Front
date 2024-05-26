import Swal from "sweetalert2";

export async function fetchUser(axiosInstance, correo) {
  try {
    const response = await axiosInstance.get(`/empleado/${correo}`);
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error de autenticacion",
      text: "Error: " + error,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
