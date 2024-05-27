import Swal from "sweetalert2";

export async function getPruebas(axiosInstance, idDisciplina) {
  try {
    const response = await axiosInstance.get(`/pruebas/${idDisciplina}`);
    console.log(response.data);
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
