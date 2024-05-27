"use client";
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getHv } from '@/actions/hv';
import { FileText } from 'lucide-react';
import { useGlobalContext } from '@/context';
// const mockCvs = {
//     "1": {
//         nombres: 'Juan',
//         apellidos: 'Pérez',
//         nDoc: 12345678,
//         instituciones: ['Universidad A', 'Empresa B'],
//         fechaIniAct: new Date('2020-01-01'),
//         fechaFinAct: new Date('2023-01-01'),
//         descActividad: 'Desarrollador de software',
//         funcionActividad: 'Desarrollo y mantenimiento de aplicaciones',
//     },
//     "2": {
//         nombres: 'María',
//         apellidos: 'García',
//         nDoc: 87654321,
//         instituciones: ['Universidad X', 'Empresa Y'],
//         fechaIniAct: new Date('2018-01-01'),
//         fechaFinAct: new Date('2021-01-01'),
//         descActividad: 'Analista de sistemas',
//         funcionActividad: 'Análisis y diseño de sistemas informáticos',
//     },
//     "3": {
//         nombres: 'Pedro',
//         apellidos: 'Gómez',
//         nDoc: 11223344,
//         instituciones: ['Universidad C', 'Empresa Z'],
//         fechaIniAct: new Date('2019-01-01'),
//         fechaFinAct: new Date('2022-01-01'),
//         descActividad: 'Ingeniero de software',
//         funcionActividad: 'Desarrollo de software y gestión de proyectos',
//     },
// };


const CVDialog = ({ id }) => {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { axiosInstance } = useGlobalContext();

    useEffect(() => {
        const fetchData = async () => {
            // Simulando una llamada a la API
            setLoading(true);
            setError(null);
            getHv(axiosInstance, id).then((data) => {
                setCvData(data);
            }).catch((error) => {
                setError('Error al cargar los datos del CV.');
            }
            ).finally(() => {
                setLoading(false);
            });

        };

        fetchData();
    }, [id]);

    return (
        <Dialog >
            <DialogTrigger className="py-2 px-4 rounded-lg cursor-pointer">
                <FileText className="w-6 h-6 text-primaryText" />
            </DialogTrigger>
            <DialogContent className="bg-primaryBg text-primaryText ">
                <DialogHeader className={"text-primaryText"}>
                    <DialogTitle>Curriculum Vitae</DialogTitle>
                </DialogHeader>
                <DialogDescription className={"text-secondaryText"}>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="space-y-4">

                            <p><strong>NOMBRE: </strong> {cvData.NOMBRE}</p>
                            <p><strong>APELLIDO: </strong> {cvData.APELLIDO}</p>
                            <p><strong>FECHA NACIMIENTO: </strong> {cvData.FECHANAC}</p>
                            <p><strong>CORREO: </strong> {cvData.USUARIO + "@gmail.com"}</p>
                            <p><strong>NOMBRE INSTITUCION: </strong> {cvData.NOMINSTITUCION}</p>
                            <p><strong>FECHA INI. ACT.: </strong> {cvData.FECHAINIACT}</p>
                            {/* <p><strong>FECHAFINACT: </strong> {cvData.FECHAFINACT}</p> */}
                            <p><strong>DESCRIPCION ACTIVIDAD: </strong> {cvData.DESCACTIVIDAD}</p>
                            <p><strong>FUNCION ACTIVIDAD: </strong> {cvData.FUNCIONACTIVIDAD}</p>
                            <p><strong>TIPO DOC: </strong> {cvData.IDTIPODOC}</p>
                            <p><strong>NUM. DOC: </strong> {cvData.NDOC}</p>

                        </div>
                    )}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default CVDialog;
