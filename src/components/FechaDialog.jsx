"use client";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

const FechaDialog = ({ onSelectFecha, selectedPrueba, selectedConvocadoId, currentFecha }) => {
    const [open, setOpen] = useState(false);
    const [fecha, setFecha] = useState(currentFecha || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentFecha) {
            setFecha(currentFecha);
        }
    }, [currentFecha]);

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleConfirm = () => {
        const selectedDate = new Date(fecha);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            setError('La fecha no puede ser menor a la fecha actual.');
            return;
        }

        setError('');
        onSelectFecha(selectedConvocadoId, selectedPrueba, fecha);
        setOpen(false);
    };

    return (
        <>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button
                        className="bg-secondaryButton text-primaryText  px-2 rounded-lg"
                        onClick={() => setOpen(true)}
                    >
                        Elegir Fecha
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-primaryBg text-primaryText p-6 rounded-lg overflow-auto max-h-screen overflow-y-auto
                border border-borderColor shadow-lg">
                    <DialogHeader className="text-lg font-semibold text-primaryText">
                        <DialogTitle>Elegir Fecha</DialogTitle>
                    </DialogHeader>
                    <input type="datetime-local"
                        value={fecha}
                        onChange={handleFechaChange}
                        className="text-[#333] rounded" />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        className="bg-primaryButton text-primaryText py-2 px-4 rounded-lg mt-4"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FechaDialog;