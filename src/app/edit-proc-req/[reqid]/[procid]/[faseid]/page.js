"use client";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Fase1,
  Fase2,
  Fase3,
  Fase4,
  Fase5,
  Fase6,
  Fase7,
} from "@/components/Fases";
import Swal from "sweetalert2";

function page({ params }) {
  const [fase, setFase] = useState(undefined);
  const [readOnly, setReadOnly] = useState(false);
  const [faseNoDispBool, setFaseNoDispBool] = useState(false);
  let FaseComponent = null;
  const router = useRouter();

  useEffect(() => {
    let currentFaseId = parseInt(params.faseid);
    //fetch de la ultima fase del proceso
    // fetch(`/api/procesos/${params.procid}/${params.reqid}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data < 1 || data > 8) return;
    //     setFase(data);
    //     if (data != params.faseid) setReadOnly(true);
    //   });
    if (currentFaseId < 1 || currentFaseId > 7 || isNaN(currentFaseId)) {
      Swal.fire({
        title: "Error",
        text: "El id de la fase no es valido.",
        icon: "error",
      }).then(() => router.push("/dashboard"));
      router.push("/dashboard");
    } else {
      setFase(currentFaseId);
      // setFaseNoDispBool(currentFaseId > 2 && currentFaseId < 8);
    }
  }, []);

  const faseNoDisp = (
    <div className=" w-full h-full flex justify-center items-center text-primaryText">
      <h1 className="text-primaryText text-2xl w-96 text-wrap text-center">
        La fase seleccionada no esta disponible aun. Por favor regrese a la
        lista de procesos de requerimientos y diligencie la fase correspondiente
        primero.
      </h1>
    </div>
  );

  if (!fase) {
    FaseComponent = (
      <div className="flex items-center justify-center h-full w-full">
        <Loading />
      </div>
    );
  }

  if (fase === 1) {
    FaseComponent = (
      <Fase1
        readOnly={true}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }
  if (fase === 2) {
    FaseComponent = (
      <Fase2
        readOnly={readOnly}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }
  if (fase === 3) {
    FaseComponent = faseNoDispBool ? (
      faseNoDisp
    ) : (
      <Fase3
        readOnly={readOnly}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }
  if (fase === 4) {
    FaseComponent = faseNoDispBool ? (
      faseNoDisp
    ) : (
      <Fase4
        readOnly={readOnly}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }
  if (fase === 5) {
    FaseComponent = (
      <Fase5
        readOnly={readOnly}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }
  if (fase === 6) {
    FaseComponent = faseNoDispBool ? (
      faseNoDisp
    ) : (
      <Fase6
        readOnly={readOnly}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }
  if (fase === 7) {
    FaseComponent = faseNoDispBool ? (
      faseNoDisp
    ) : (
      <Fase7
        readOnly={readOnly}
        ReqId={parseInt(params.reqid)}
        procesoReqId={params.procid}
      />
    );
  }

  return (
    <div className="p-4 h-full">
      <h1 className="text-2xl font-bold text-primaryText mb-4">
        Fase {fase} - Proceso {params.procid} - Requerimiento {params.reqid}
      </h1>
      {FaseComponent}
    </div>
  );
}

export default page;
