"use client";
import { Suspense, useEffect, useState } from 'react';
import ListaRequerimientos from '@/components/ListaRequerimientos';
import Loading from '@/components/Loading';
import CrearRequerimiento from '@/components/CrearRequerimiento';

const DashboardCliente = () => {
    const mockData = [
        { consecReque: 1, codEmpleado: 123, salarioMax: 4000, salarioMin: 0, desFuncion: "", desCarreras: "", nVvacantes: 5, codAnalistaGen: 234 },
        { consecReque: 2, codEmpleado: 123, salarioMax: 4000, salarioMin: 0, desFuncion: "", desCarreras: "", nVvacantes: 5, codAnalistaGen: 235 },
        { consecReque: 3, codEmpleado: 123, salarioMax: 4000, salarioMin: 0, desFuncion: "", desCarreras: "", nVvacantes: 5, codAnalistaGen: 236 },
    ];

    const mockAnalistasGenerales = [{ id: 234, nombre: "Juan" }, { id: 235, nombre: "Pedro" }, { id: 236, nombre: "Maria" }];

    const [requerimientos, setRequerimientos] = useState([]);
    const [analistasGenerales, setAnalistasGenerales] = useState([]);
    const [nextConsec, setNextConsec] = useState(0);

    useEffect(() => {
        //fetch get requerimientos
        setRequerimientos(mockData);
        //fetch get analistas Generales {id y nombre}
        setAnalistasGenerales(mockAnalistasGenerales);
        //calcular el ultimo consecutivo y sumarle 1
        setNextConsec(mockData.map((req) => req.consecReque).reduce((a, b) => Math.max(a, b), 0) + 1);
    }, []);

    const handleSave = (updatedReq) => {
        setRequerimientos([...requerimientos, updatedReq]);
        setNextConsec(nextConsec + 1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold ">Procesos De Requerimientos</h1>
            <CrearRequerimiento handleSave={handleSave}
                codUsuario={123}
                nextConsec={nextConsec}
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
