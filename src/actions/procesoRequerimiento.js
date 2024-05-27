import Swal from "sweetalert2";

export async function CrearProcReq(
  axiosInstance,
  consecReque,
  idFase,
  idPerfil,
  codEmpleado,
  convocatoria,
  invitacion
) {
  try {
    const response = await axiosInstance.post(`/procesoRequerimiento/`, {
      consecReque: consecReque,
      idFase: idFase,
      idPerfil: idPerfil,
      codEmpleado: codEmpleado,
      convocatoria: convocatoria,
      invitacion: invitacion,
    });
    // console.log(response.data);
    return response.data[0];
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error: " + error,
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
    // console.log(response.data);
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error: " + error,
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(error);
    return false;
  }
}

export async function fetchProcesoReqMaxId(axiosInstance, consecReque) {
  try {
    const response = await axiosInstance.get(
      `/procesoRequerimiento/${consecReque}`
    );
    // console.log(response.data);
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

///procesoRequerimiento/:consecReque/:idFase
export async function fetchProcesoReq(axiosInstance, consecReque, idFase) {
  try {
    const response = await axiosInstance.get(
      `/procesoRequerimiento/${consecReque}/${idFase}`
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
