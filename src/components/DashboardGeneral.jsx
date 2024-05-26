"use client";
import ListaProcesos from '@/components/ListaProcesos';

const DashboardGeneral = () => {
    const mockData = [
        {
            consecReque: 1,
            idFase: 1,
            idPerfil: 1,
            ConsProceso: 1,
            codEmpleado: 12345,
            fechaInicio: new Date('2023-01-01'),
            fechaFin: new Date('2023-01-15'),
            Convocatoria: 'Convocatoria 1',
            Invitacion: 'Invitacion 1',
        },
        {
            consecReque: 1,
            idFase: 2,
            idPerfil: 2,
            ConsProceso: 1,
            codEmpleado: 67890,
            fechaInicio: new Date('2023-02-01'),
            fechaFin: new Date('2023-02-15'),
            Convocatoria: 'Convocatoria 2',
            Invitacion: 'Invitacion 2',
        },
        // Agrega más elementos según sea necesario
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-primaryText mb-4">Procesos De Requerimientos</h1>
            <ListaProcesos data={mockData} />
        </div>
    );
};

export default DashboardGeneral;