"use client";
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils'
import { Button } from './ui/button';

const ReqCardDialog = ({ requerimiento, onSave, onlyRead, listaAnalistasGen }) => {
    const [open, setOpen] = useState(false);
    const [codResponsable, setCodResponsable] = useState(requerimiento.codEmpleado);
    const [salarioMax, setSalarioMax] = useState(requerimiento.salarioMax);
    const [salarioMin, setSalarioMin] = useState(requerimiento.salarioMin);
    const [descFuncion, setDescFuncion] = useState(requerimiento.desFuncion);
    const [descCarreras, setDescCarreras] = useState(requerimiento.desCarreras);
    const [nVacantes, setNVacantes] = useState(requerimiento.nVvacantes);
    const [codAnalistaGen, setCodAnalistaGen] = useState(requerimiento.codAnalistaGen);
    const [nombreAnalistaGen, setNombreAnalistaGen] = useState("");
    const [error, setError] = useState(false);

    function validation() {
        if (salarioMax > 0 && salarioMin >= 0 && descFuncion !== "" && descCarreras !== "" && nVacantes > 0 && codAnalistaGen !== 0) {
            setError(false);
            return true;
        }
        setError(true);
        return false;
    }

    const handleSubmit = () => {

        if (validation()) {
            onSave({
                ...requerimiento,
                codEmpleado: codResponsable,
                salarioMax: salarioMax,
                salarioMin: salarioMin,
                desFuncion: descFuncion,
                desCarreras: descCarreras,
                nVvacantes: nVacantes,
                codAnalistaGen: codAnalistaGen
            });
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {onlyRead ? (<button className="text-primaryText w-6 h-6">
                    <Eye className="cursor-pointer" />
                </button>) :
                    <Button
                        className="text-primaryText w-full 
                        bg-primaryButton hover:bg-secondaryButton
                        my-4 rounded-lg"
                    >Crear nuevo Requerimiento
                    </Button>}

            </DialogTrigger>
            <DialogContent className="bg-primaryBg text-primaryText p-6 rounded-lg overflow-auto max-h-screen overflow-y-auto
                border border-borderColor shadow-lg">
                <DialogHeader>
                    <DialogTitle
                        className="text-lg font-semibold text-primaryText"
                    >{onlyRead ? "Información Requerimiento" : "Generar Proceso Requerimiento"
                        }</DialogTitle>
                    <DialogDescription
                        className="text-sm text-secondaryText mt-1"
                    >
                        {onlyRead ? "Estos son los datos del requerimiento" : "Modifica los detalles del requerimiento y genera un nuevo proceso del requerimiento."}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Id Responsable</label>
                        <input
                            type="text"
                            value={codResponsable}
                            disabled
                            className="w-full mt-1 p-2 bg-secondaryBg text-primaryText/40 border border-borderColor rounded cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Salario Maximo</label>
                        <input
                            type="number"
                            value={salarioMax}
                            onChange={(e) => setSalarioMax(e.target.value)}
                            disabled={onlyRead}
                            className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded", onlyRead && "cursor-not-allowed")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Salario Minimo</label>
                        <input
                            type="number"
                            value={salarioMin}
                            onChange={(e) => setSalarioMin(e.target.value)}
                            disabled={onlyRead}
                            className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded", onlyRead && "cursor-not-allowed")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Descripción Funcion</label>
                        <textarea
                            value={descFuncion}
                            onChange={(e) => setDescFuncion(e.target.value)}
                            disabled={onlyRead}
                            maxLength={50}
                            className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none", onlyRead && "cursor-not-allowed")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Descripción Carreras</label>
                        <textarea
                            value={descCarreras}
                            onChange={(e) => setDescCarreras(e.target.value)}
                            disabled={onlyRead}
                            maxLength={50}
                            className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none", onlyRead && "cursor-not-allowed")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Numero Vacantes</label>
                        <input
                            type="number"
                            value={nVacantes}
                            onChange={(e) => setNVacantes(e.target.value)}
                            disabled={onlyRead}
                            className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded", onlyRead && "cursor-not-allowed")}
                        />
                    </div>

                    {onlyRead && (
                        <>
                            <div>
                                <label className="block text-sm font-medium">ID Analista General</label>
                                <input
                                    type="text"
                                    value={requerimiento.codAnalistaGen}
                                    disabled
                                    className="w-full mt-1 p-2 bg-secondaryBg text-primaryText/40 border border-borderColor rounded cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Analista General</label>
                                <input
                                    type="text"
                                    value={listaAnalistasGen.find((analista) => analista.id === requerimiento.codAnalistaGen)?.nombre}
                                    disabled
                                    className="w-full mt-1 p-2 bg-secondaryBg text-primaryText/40 border border-borderColor rounded cursor-not-allowed"
                                />
                            </div>
                        </>
                    )}
                    {!onlyRead && (
                        <div>
                            <label className="block text-sm font-medium">Analista General</label>
                            <select
                                value={nombreAnalistaGen}
                                onChange={(e) => {
                                    setNombreAnalistaGen(e.target.value);
                                    // console.log(e.target.value);
                                    if (e.target.value != 0) {
                                        setCodAnalistaGen(listaAnalistasGen.find((analista) => analista.nombre === e.target.value)?.id);
                                        // console.log(listaAnalistasGen.find((analista) => analista.nombre === e.target.value).id);
                                    }

                                }}
                                className="w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded"
                            >
                                <option value={0}>Selecciona un analista general</option>
                                {listaAnalistasGen.map((analista) => (
                                    <option
                                        key={analista.id}
                                        value={analista.nombre}
                                    >
                                        {analista.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {error && (
                        <p className="text-secondaryButton text-sm mt-2">Por favor, llena todos los campos.</p>
                    )}
                    <button
                        onClick={handleSubmit}
                        className={cn("mt-4  bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 px-4 rounded", onlyRead && "hidden")}
                    >
                        Guardar
                    </button>

                </div>
            </DialogContent>
        </Dialog >
    );
};

export default ReqCardDialog;
