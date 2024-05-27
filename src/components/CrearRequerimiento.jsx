"use client";
import ReqCardDialog from '@/components/ReqCardDialog'

function CrearRequerimiento({ handleSave, codUsuario, listaAnalistasGen }) {

    return (
        <div>
            <ReqCardDialog
                requerimiento={{
                    fechaReque: new Date().toLocaleDateString(),
                    SALARIOMAX: 0,
                    SALARIOMIN: 0,
                    DESFUNCION: "",
                    DESCARRERAS: "",
                    NVVACANTES: 0,
                    CODEMPLEADO: 0
                }}
                onSave={handleSave}
                onlyRead={false}
                listaAnalistasGen={listaAnalistasGen}
            />

        </div>
    )
}

export default CrearRequerimiento