"use client";
import ReqCardDialog from './ReqCardDialog';

const ListaRequerimientos = ({ handleSave, requerimientos, listaAnalistasGen }) => {

    return (
        <div className="space-y-4">
            {requerimientos.map((req) => (
                <div key={req.CONSECREQUE} className="bg-secondaryAccent/60 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Requerimiento {req.CONSECREQUE}</h2>
                    </div>
                    <ReqCardDialog requerimiento={req} onSave={handleSave} onlyRead={true} listaAnalistasGen={listaAnalistasGen} />
                </div>
            ))}
        </div>
    );
};

export default ListaRequerimientos;
