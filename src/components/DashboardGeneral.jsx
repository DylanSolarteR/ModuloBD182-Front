"use client";
import ListaProcesos from '@/components/ListaProcesos';
import { useState, useEffect } from 'react';
import { fetchAllProcesosReq } from '@/actions/procesoRequerimiento';
import { useGlobalContext } from "@/context";

const DashboardGeneral = () => {
    const [procesosReq, setProcesosReq] = useState([]);
    const { axiosInstance, user } = useGlobalContext();

    /*{
      CONSECREQUE: 5,
      IDFASE: '0002',
      IDPERFIL: '0001',
      CONSPROCESO: 5,
      CODEMPLEADO: '00001',
      FECHAINICIO: '2022-03-25T05:00:00.000Z',
      FECHAFIN: '2022-09-30T05:00:00.000Z',
      CONVOCATORIA: null,
      INVITACION: null
    }*/

    useEffect(() => {
        fetchAllProcesosReq(axiosInstance, user.CODEMPLEADO).then((data) => {
            setProcesosReq(data);
        });
    }, [])


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-primaryText mb-4">Procesos De Requerimientos</h1>
            <ListaProcesos data={procesosReq} />
        </div>
    );
};

export default DashboardGeneral;