import Swal from "sweetalert2";

export async function getPerfilByDisciplinaId(axiosInstance, DisciplinaId) {
  try {
    const response = await axiosInstance.get(`/perfiles/${DisciplinaId}`);
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

export async function getPerfilAndDisciplina(
  axiosInstance,
  consecReque,
  idPerfil,
  idFase
) {
  try {
    const response = await axiosInstance.get(
      `/descPerfilDisciplina/${consecReque}/${idPerfil}/${idFase}`
    );
    console.log(response.data);
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
