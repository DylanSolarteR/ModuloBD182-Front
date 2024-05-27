import Swal from "sweetalert2";

export async function CrearProcReq(
  axiosInstance,
  consecReque,
  idFase,
  idPerfil,
  codEmpleado
) {
  try {
    const response = await axiosInstance.post(`/procesoRequerimiento/`, {
      consecReque: consecReque,
      idFase: idFase,
      idPerfil: idPerfil,
      codEmpleado: codEmpleado,
    });
    // console.log(response.data);
    return response.data[0];
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error: " + error.response.data.message,
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(error);
    return false;
  }
}

export async function fetchAllProcesosReq(axiosInstance, codEmp) {
  try {
    const response = await axiosInstance.get(
      `/procesosRequerimientos/${codEmp}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error: " + error.response.data.message,
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(error);
    return false;
  }
}
