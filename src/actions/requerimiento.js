import Swal from "sweetalert2";

export async function fetchAllReqs(axiosInstance, codEmp) {
  try {
    const response = await axiosInstance.get(`/requerimientos/${codEmp}`);
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

export async function CrearReq(
  axiosInstance,
  codEmp,
  emp_codEmpleado,
  salarioMax,
  salarioMin,
  desFuncion,
  descCarreras,
  nVacantes
) {
  try {
    const response = await axiosInstance.post(`/requerimiento/`, {
      codEmpleado: codEmp,
      emp_codEmpleado: emp_codEmpleado,
      salarioMax: salarioMax,
      salarioMin: salarioMin,
      desFuncion: desFuncion,
      desCarreras: descCarreras,
      nVacantes: nVacantes,
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

export async function fetchReq(axiosInstance, consecReque) {
  try {
    const response = await axiosInstance.get(`/requerimiento/${consecReque}`);
    console.log(response.data);
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
