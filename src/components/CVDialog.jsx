"use client";
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

import { FileText } from 'lucide-react';
const mockCvs = {
    "1": {
        nombres: 'Juan',
        apellidos: 'Pérez',
        nDoc: 12345678,
        instituciones: ['Universidad A', 'Empresa B'],
        fechaIniAct: new Date('2020-01-01'),
        fechaFinAct: new Date('2023-01-01'),
        descActividad: 'Desarrollador de software',
        funcionActividad: 'Desarrollo y mantenimiento de aplicaciones',
    },
    "2": {
        nombres: 'María',
        apellidos: 'García',
        nDoc: 87654321,
        instituciones: ['Universidad X', 'Empresa Y'],
        fechaIniAct: new Date('2018-01-01'),
        fechaFinAct: new Date('2021-01-01'),
        descActividad: 'Analista de sistemas',
        funcionActividad: 'Análisis y diseño de sistemas informáticos',
    },
    "3": {
        nombres: 'Pedro',
        apellidos: 'Gómez',
        nDoc: 11223344,
        instituciones: ['Universidad C', 'Empresa Z'],
        fechaIniAct: new Date('2019-01-01'),
        fechaFinAct: new Date('2022-01-01'),
        descActividad: 'Ingeniero de software',
        funcionActividad: 'Desarrollo de software y gestión de proyectos',
    },
};


const CVDialog = ({ id }) => {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Simulando una llamada a la API
            setLoading(true);
            setError(null);
            try {
                // Aquí deberías hacer un fetch a tu API
                const data = mockCvs[id];
                if (data) {
                    setCvData(data);
                } else {
                    setError('No se encontró el CV para el ID proporcionado.');
                }
            } catch (error) {
                setError('Error al cargar los datos del CV.');
            } finally {
                setLoading(false);
            }
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
                            <p><strong>Nombres:</strong> {cvData.nombres}</p>
                            <p><strong>Apellidos:</strong> {cvData.apellidos}</p>
                            <p><strong>Número de Documento:</strong> {cvData.nDoc}</p>
                            <p><strong>Instituciones:</strong> {cvData.instituciones.join(', ')}</p>
                            <p><strong>Fecha Inicio Actividad:</strong> {new Date(cvData.fechaIniAct).toLocaleDateString()}</p>
                            <p><strong>Fecha Fin Actividad:</strong> {new Date(cvData.fechaFinAct).toLocaleDateString()}</p>
                            <p><strong>Descripción Actividad:</strong> {cvData.descActividad}</p>
                            <p><strong>Función Actividad:</strong> {cvData.funcionActividad}</p>
                        </div>
                    )}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default CVDialog;
