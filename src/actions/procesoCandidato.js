import Swal from "sweetalert2";

export async function fetchAllProcesosCandidatos(
  axiosInstance,
  consecReque,
  idFase
) {
  try {
    const response = await axiosInstance.get(
      `/procCandidatos/${consecReque}/${idFase}`
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
export async function crearProcesosCandidatos(
  axiosInstance,
  usuario,
  consecReque,
  idFase,
  idPerfil,
  ConsProceso
) {
  try {
    const response = await axiosInstance.post(`/procCandidato/`, {
      usuario: usuario,
      consecReque: consecReque,
      idFase: idFase,
      idPerfil: idPerfil,
      ConsProceso: ConsProceso,
    });
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
