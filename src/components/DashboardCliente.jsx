"use client";
import { Suspense, useEffect, useState } from 'react';
import ListaRequerimientos from '@/components/ListaRequerimientos';
import Loading from '@/components/Loading';
import CrearRequerimiento from '@/components/CrearRequerimiento';
import { fetchAllReqs } from '@/actions/requerimiento';
import { useGlobalContext } from "@/context";
import { fetchAllAnalistasGenerales } from '@/actions/cargo';

const DashboardCliente = () => {
    const { user, axiosInstance } = useGlobalContext();

    const [requerimientos, setRequerimientos] = useState([]);
    const [analistasGenerales, setAnalistasGenerales] = useState([]);


    useEffect(() => {
        //fetch get requerimientos
        fetchAllReqs(axiosInstance, user.CODEMPLEADO).then((response) => {
            setRequerimientos(response);
        }
        );
        fetchAllAnalistasGenerales(axiosInstance).then((response) => {
            // setAnalistasGenerales(response);
            const arrayAnalistasG = response.map((analista) => {
                return { id: analista.CODEMPLEADO, nombre: analista.NOMEMPLEADO + " " + analista.APELLEMPLEADO }
            });
            setAnalistasGenerales(arrayAnalistasG);
        }
        );

    }, []);

    const handleSave = (updatedReq) => {
        setRequerimientos([...requerimientos, updatedReq]);
    };

    return (requerimientos.length === 0 ? <Loading /> :
        <div className="p-4">
            <h1 className="text-2xl font-bold ">Procesos De Requerimientos</h1>
            <CrearRequerimiento handleSave={handleSave}
                listaAnalistasGen={analistasGenerales}
            />
            <Suspense fallback={(<Loading />)}>
                <ListaRequerimientos
                    handleSave={handleSave}
                    requerimientos={requerimientos}
                    listaAnalistasGen={analistasGenerales}
                />
            </Suspense>
        </div>
    );
};

export default DashboardCliente;
