"use client";
import ReqCardDialog from '@/components/ReqCardDialog'

function CrearRequerimiento({ handleSave, codUsuario, nextConsec, listaAnalistasGen }) {

    return (
        <div>
            <ReqCardDialog
                requerimiento={{
                    consecReque: nextConsec,
                    codEmpleado: codUsuario,
                    fechaReque: new Date().toLocaleDateString(),
                    salarioMax: 0,
                    salarioMin: 0,
                    desFuncion: "",
                    desCarreras: "",
                    nVvacantes: 0,
                    codAnalistaGen: 0
                }}
                onSave={handleSave}
                onlyRead={false}
                listaAnalistasGen={listaAnalistasGen}
            />

        </div>
    )
}

export default CrearRequerimiento