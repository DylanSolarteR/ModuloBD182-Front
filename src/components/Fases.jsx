"use client";
import { useState, useEffect, useRef } from "react"
import { cn } from '@/lib/utils'
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Select from 'react-select';
import CVDialog from "@/components/CVDialog";
import FechaDialog from "@/components/FechaDialog";
import Swal from "sweetalert2";
import { useGlobalContext } from "@/context";
import { getAllDisciplinas } from '@/actions/disciplina'
import { getPerfilByDisciplinaId, getPerfilAndDisciplina } from '@/actions/perfil'

import { fetchReq } from '@/actions/requerimiento'
import { CrearProcReq, fetchProcesoReqMaxId, fetchProcesoReq } from '@/actions/procesoRequerimiento'
import { fetchAllProcesosCandidatos, crearProcesosCandidatos } from '@/actions/procesoCandidato'
import { getPruebas } from "@/actions/prueba";

function Fase1({ readOnly, procesoReqId, ReqId }) {
    const [codResponsable, setCodResponsable] = useState(0);
    const [salarioMax, setSalarioMax] = useState(0);
    const [salarioMin, setSalarioMin] = useState(0);
    const [descFuncion, setDescFuncion] = useState('');
    const [descCarreras, setDescCarreras] = useState('');
    const [nVacantes, setNVacantes] = useState(0);
    const [codAnalistaGen, setCodAnalistaGen] = useState(0);
    const [nombreAnalistaGen, setNombreAnalistaGen] = useState('');

    const { axiosInstance } = useGlobalContext();

    const router = useRouter();

    useEffect(() => {
        //fetch de la primera fase del req
        //Como readOnly siempre es true en esta fase, se hace el fetch de los datos y se asignan a los estados
        fetchReq(axiosInstance, ReqId).then(data => {
            setCodResponsable(data.EMP_CODEMPLEADO)
            setSalarioMax(data.SALARIOMAX)
            setSalarioMin(data.SALARIOMIN)
            setDescFuncion(data.DESFUNCION)
            setDescCarreras(data.DESCARRERAS)
            setNVacantes(data.NVVACANTES)
            setCodAnalistaGen(data.CODEMPLEADO)
            setNombreAnalistaGen(data.NOMEMPLEADO + " " + data.APELLEMPLEADO)
        })
    }, [])



    return (
        <div>
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
                        disabled={readOnly}
                        className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded", readOnly && "cursor-not-allowed text-primaryText/40")}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Salario Minimo</label>
                    <input
                        type="number"
                        value={salarioMin}
                        disabled={readOnly}
                        className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded", readOnly && "cursor-not-allowed text-primaryText/40")}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descripción Funcion</label>
                    <textarea
                        value={descFuncion}
                        disabled={readOnly}
                        maxLength={50}
                        className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none", readOnly && "cursor-not-allowed text-primaryText/40")}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descripción Carreras</label>
                    <textarea
                        value={descCarreras}
                        disabled={readOnly}
                        maxLength={50}
                        className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none", readOnly && "cursor-not-allowed text-primaryText/40")}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Numero Vacantes</label>
                    <input
                        type="number"
                        value={nVacantes}
                        disabled={readOnly}
                        className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded", readOnly && "cursor-not-allowed text-primaryText/40")}
                    />
                </div>

                {readOnly && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">ID Analista General</label>
                            <input
                                type="text"
                                value={codAnalistaGen}
                                disabled
                                className="w-full mt-1 p-2 bg-secondaryBg text-primaryText/40 border border-borderColor rounded cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Analista General</label>
                            <input
                                type="text"
                                value={nombreAnalistaGen}
                                disabled
                                className="w-full mt-1 p-2 bg-secondaryBg text-primaryText/40 border border-borderColor rounded cursor-not-allowed"
                            />
                        </div>
                    </>
                )}

                <Button
                    onClick={() => router.push('/dashboard')}
                    className={cn("mt-4  bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 px-4 rounded")}
                >
                    Volver
                </Button>

            </div>
        </div >
    )
}

function Fase2({ readOnly, procesoReqId, ReqId }) {

    const selectPerfilesRef = useRef(null);
    const router = useRouter();
    const { axiosInstance, user } = useGlobalContext();

    const [descPerfil, setDescPerfil] = useState('')
    const [descCarreras, setDescCarreras] = useState('')
    const [arrayPerfiles, setArrayPerfiles] = useState([])
    const [perfilSelected, setPerfilSelected] = useState(undefined)
    const [arrayCarreras, setArrayCarreras] = useState([])
    const [carreraSelected, setCarreraSelected] = useState(undefined)

    useEffect(() => {

        fetchReq(axiosInstance, ReqId).then(data => {
            setDescPerfil(data.DESFUNCION)
            setDescCarreras(data.DESCARRERAS)
        })
        getAllDisciplinas(axiosInstance).then(data => {
            const arrayDisciplinas = data.map(disciplina => {
                return {
                    value: disciplina.IDDISCIPLINA,
                    label: disciplina.DESCDISCIPLINA,
                }
            })
            setArrayCarreras(arrayDisciplinas)
            // console.log(arrayDisciplinas)
        })

        setArrayPerfiles([])

        if (readOnly) {
            // console.log('Solo lectura')
            fetchProcesoReq(axiosInstance, ReqId, '0002').then(result => {
                getPerfilAndDisciplina(axiosInstance, ReqId, result.IDPERFIL, '0002').then(data => {
                    setPerfilSelected({
                        value: result.IDPERFIL,
                        label: data.DESPERFIL
                    })
                    setCarreraSelected({
                        value: data.IDDISCIPLINA,
                        label: data.DESCDISCIPLINA
                    })
                })
            })
        }
    }, [])

    function fetchPerfiles(DisciplinaId) {
        setArrayPerfiles([])
        getPerfilByDisciplinaId(axiosInstance, DisciplinaId).then(data => {

            if (data.message === 'La disciplina no tiene Perfiles') {
                setArrayPerfiles([])
                Swal.fire('La disciplina no tiene perfiles')
            } else {
                setArrayPerfiles(data.map(perfil => {
                    return {
                        value: perfil.IDPERFIL,
                        label: perfil.DESPERFIL,
                    }
                }))
            }
        })
    }

    function handleSubmit() {
        if (readOnly) { router.push('/dashboard'); return }
        if (carreraSelected === undefined || perfilSelected === undefined) {
            Swal.fire('Selecciona una disciplina y un perfil')
        } else {
            //fetch para enviar los datos
            CrearProcReq(axiosInstance, ReqId, '0002', perfilSelected.value, user.CODEMPLEADO, null, null).then(data => {
                Swal.fire('Proceso de requerimiento creado', '', 'success')
                router.push('/dashboard')
            })
        }
    }


    return (
        <div className="flex flex-row w-full justify-evenly gap-10">

            <div className="w-full flex flex-col gap-4">
                <label className="block text-sm font-medium">Descripción Carreras</label>
                <textarea
                    value={descCarreras}
                    disabled
                    className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none h-52 cursor-not-allowed text-primaryText/40")}
                />

                {readOnly ?
                    (
                        <h2>Seleccionada: {carreraSelected ? carreraSelected.label : "No se encontro la disciplina"}</h2>
                    )
                    : (<Select
                        options={arrayCarreras}
                        defaultOptions
                        onChange={(selected) => {
                            setCarreraSelected(selected);
                            fetchPerfiles(selected.value);
                            setPerfilSelected(undefined);
                            setArrayPerfiles([]);
                            selectPerfilesRef.current.setValue(undefined);
                        }}
                        isSearchable={false}
                        placeholder="Selecciona las carreras"
                        styles={{
                            container: (styles) => {
                                return {
                                    ...styles,
                                    width: '100%',
                                }
                            },

                            control: (styles) => {
                                return {
                                    ...styles,
                                    backgroundColor: '#1E1E1E',
                                    borderColor: '#292929',
                                    color: '#E0E0E0',
                                }
                            },
                            option: (styles, { isSelected }) => {
                                return {
                                    ...styles,
                                    backgroundColor: '#1E1E1E',
                                    color: '#E0E0E0',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#333333'
                                    },
                                    WebkitTapHighlightColor: '#1E1E1E',
                                }
                            },
                            singleValue: (styles) => {
                                return {
                                    ...styles,
                                    color: '#E0E0E0'
                                }
                            },
                            multiValue: (styles, { isSelected }) => ({
                                ...styles,
                                backgroundColor: '#333333',
                                color: '#E0E0E0'
                            }),
                            multiValueLabel: (styles) => ({
                                ...styles,
                                color: '#E0E0E0'
                            }),
                            multiValueRemove: (styles, { isSelected }) => ({
                                ...styles,
                                color: '#E0E0E0',
                                backgroundColor: '#333333',
                                cursor: 'pointer',
                                ':hover': {
                                    backgroundColor: '#1E1E1E',
                                    border: 'var(--borderColor)'
                                }
                            }),
                            noOptionsMessage: (styles) => ({
                                ...styles,
                                backgroundColor: '#1E1E1E',
                                color: '#E0E0E0'
                            }),
                            placeholder: (styles) => ({
                                ...styles,
                                color: '#E0E0E0'
                            }),

                        }}
                    />)}
                <Button
                    onClick={handleSubmit}
                    className={cn("mt-4  bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 px-4 rounded")}
                >
                    {readOnly ? "Salir" : "Guardar y Salir"}
                </Button>
            </div>
            <div className="w-full flex flex-col gap-4">
                <label className="block text-sm font-medium">Descripción Funcion</label>
                <textarea
                    value={descPerfil}
                    disabled
                    className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none h-52 cursor-not-allowed text-primaryText/40")}
                />

                {readOnly ?
                    (
                        <h2>Seleccionado: {perfilSelected ? perfilSelected.label : "No se encontro el perfil."}</h2>
                    )
                    : (<Select
                        options={arrayPerfiles}
                        onChange={(selected) => { setPerfilSelected(selected) }}
                        placeholder="Selecciona los perfiles"
                        disabled={readOnly}
                        isSearchable={false}
                        ref={selectPerfilesRef}
                        styles={{
                            control: (styles) => {
                                return {
                                    ...styles,
                                    backgroundColor: '#1E1E1E',
                                    borderColor: '#292929',
                                    color: '#E0E0E0',
                                }
                            },
                            option: (styles, { isSelected }) => {
                                return {
                                    ...styles,
                                    backgroundColor: '#1E1E1E',
                                    color: '#E0E0E0',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#333333'
                                    },
                                    WebkitTapHighlightColor: '#1E1E1E'
                                }
                            },
                            singleValue: (styles) => {
                                return {
                                    ...styles,
                                    color: '#E0E0E0'
                                }
                            },
                            multiValue: (styles, { isSelected }) => ({
                                ...styles,
                                backgroundColor: '#333333',
                                color: '#E0E0E0'
                            }),
                            multiValueLabel: (styles) => ({
                                ...styles,
                                color: '#E0E0E0'
                            }),
                            multiValueRemove: (styles, { isSelected }) => ({
                                ...styles,
                                color: '#E0E0E0',
                                backgroundColor: '#333333',
                                cursor: 'pointer',
                                ':hover': {
                                    backgroundColor: '#1E1E1E',
                                    border: 'var(--borderColor)'
                                }
                            }),
                            noOptionsMessage: (styles) => ({
                                ...styles,
                                backgroundColor: '#1E1E1E',
                                color: '#E0E0E0'
                            }),
                            placeholder: (styles) => ({
                                ...styles,
                                color: '#E0E0E0'
                            }),

                        }}
                    />)}

            </div>

        </div>
    )
}

function Fase3({ readOnly, procesoReqId, ReqId }) {
    const [convocatoria, setConvocatoria] = useState('')
    const router = useRouter();
    const { axiosInstance, user } = useGlobalContext();

    useEffect(() => {

        if (readOnly) {
            // console.log('Solo lectura')
            fetchProcesoReq(axiosInstance, ReqId, '0003').then(data => {
                setConvocatoria(data.CONVOCATORIA)
            })
        }
    }, [])

    function handleSubmit() {
        //fetch para enviar los datos
        if (!readOnly) {
            //fetch para enviar los datos
            fetchProcesoReq(axiosInstance, ReqId, '0002').then(data => {
                CrearProcReq(axiosInstance, ReqId, '0003', data.IDPERFIL, user.CODEMPLEADO, convocatoria, null).then(() => {
                    Swal.fire('Proceso de requerimiento creado', '', 'success')
                    router.push('/dashboard')
                })
            })
        }
        router.push('/dashboard')
    }
    return (
        <div className="flex flex-col w-full justify-center items-start gap-10">
            <div className="w-full flex flex-col gap-4 items-center">
                <label className="block text-lg font-medium">Convocatoria</label>
                <textarea
                    value={convocatoria}
                    disabled={readOnly}
                    maxLength={200}
                    onChange={(e) => setConvocatoria(e.target.value)}
                    className={cn("w-full mt-1 p-2 bg-secondaryBg text-primaryText border border-borderColor rounded resize-none h-96", readOnly && "cursor-not-allowed text-primaryText/40")}
                />

            </div>
            <Button
                onClick={handleSubmit}
                className={cn("mt-4  bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 px-4 rounded")}
            >
                {readOnly ? "Salir" : "Guardar y Salir"}
            </Button>
        </div>
    )

}
function Fase4({ readOnly, procesoReqId, ReqId }) {

    const router = useRouter();
    const { axiosInstance, user } = useGlobalContext();

    const [convocados, setConvocados] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [invitacion, setInvitacion] = useState('');

    useEffect(() => {
        // setConvocados(mockConvocados);
        if (readOnly) {
            // console.log('Solo lectura')
            fetchProcesoReq(axiosInstance, ReqId, '0004').then(data => {
                setInvitacion(data.INVITACION)
            })
            fetchAllProcesosCandidatos(axiosInstance, ReqId, '0004').then(data => {
                if ((data.message)) {
                    Swal.fire('Ningun candidato fue preseleccionado').then(() =>
                        router.push('/dashboard')
                    )
                } else {
                    setConvocados(data.map(convocado => {
                        return {
                            id: convocado.USUARIO,
                            nombre: convocado.NOMBRE + ' ' + convocado.APELLIDO
                        }
                    }))
                }
            })

            // Simulando la carga de datos de convocados

        } else {
            // Simulando la carga de datos de convocados
            fetchAllProcesosCandidatos(axiosInstance, ReqId, '0003').then(data => {
                setConvocados(data.map(convocado => {
                    return {
                        id: convocado.USUARIO,
                        nombre: convocado.NOMBRE + ' ' + convocado.APELLIDO
                    }
                }))
            })
        }
    }, []);

    const handleSeleccionar = (id) => {
        setSeleccionados((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        if (readOnly) {
            router.push('/dashboard');
            return
        }
        const datosAEnviar = {
            seleccionados,
            invitacion,
        };
        console.log('Datos enviados:', datosAEnviar);
        // Aquí enviarías los datos a tu backend
        fetchProcesoReq(axiosInstance, ReqId, '0003').then(data => {
            CrearProcReq(axiosInstance, ReqId, '0004', data.IDPERFIL, user.CODEMPLEADO, data.CONVOCATORIA, datosAEnviar.invitacion).then(data => {
                Swal.fire('Proceso de requerimiento creado', '', 'success').then(() => {
                    router.push('/dashboard')
                })
            })
        })



        // Limpiar la selección después de enviar
        setSeleccionados([]);
        setInvitacion('');
        router.push('/dashboard');
    };

    return (
        <div className="p-4">
            <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-primaryText">{readOnly ? "Convocados elegidos" : "Elija los convocados a elegir"}</h2>
                        <div className="max-h-[50vh] overflow-y-auto rounded ">

                            {convocados.map((convocado) => (
                                <div key={convocado.id} className="bg-secondaryAccent/50 text-primaryText p-4 rounded-lg flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                        {!readOnly && <input
                                            type="checkbox"
                                            checked={seleccionados.includes(convocado.id)}
                                            onChange={() => handleSeleccionar(convocado.id)}
                                            className="mr-2"
                                            disabled={readOnly}
                                        />}
                                        <p className="text-lg font-semibold">{convocado.nombre}</p>
                                    </div>
                                    {!readOnly && <CVDialog id={convocado.id} />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-primaryText">Redacte la invitación</h2>
                        <textarea
                            className="w-full h-[49.5vh] p-2 mt-2 bg-primaryBg text-secondaryText rounded-lg text-lg resize-none"
                            value={invitacion}
                            maxLength={200}
                            onChange={(e) => setInvitacion(e.target.value)}
                            disabled={readOnly}
                        />
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    className={cn("mt-4  bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 px-4 rounded")}
                >
                    {readOnly ? "Salir" : "Guardar y Salir"}
                </Button>
            </div>
        </div>
    );
}

function Fase5({ readOnly, procesoReqId, ReqId }) {
    const router = useRouter();
    const { axiosInstance, user } = useGlobalContext();

    const [invitados, setInvitados] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {
        // Simulando la carga de datos de convocados
        if (readOnly) {
            fetchAllProcesosCandidatos(axiosInstance, ReqId, '0005').then(data => {
                if ((data.message)) {
                    Swal.fire('Ningun candidato fue preseleccionado').then(() =>
                        router.push('/dashboard')
                    )
                } else {

                    setInvitados(data.map(convocado => {
                        return {
                            id: convocado.USUARIO,
                            nombre: convocado.NOMBRE + ' ' + convocado.APELLIDO
                        }
                    }))
                }
            })

        } else {
            fetchAllProcesosCandidatos(axiosInstance, ReqId, '0004').then(data => {
                if ((data.message)) {
                    Swal.fire('Ningun invitado acepto la invitacion').then(() =>
                        router.push('/dashboard')
                    )
                } else {
                    setInvitados(data.map(convocado => {
                        return {
                            id: convocado.USUARIO,
                            nombre: convocado.NOMBRE + ' ' + convocado.APELLIDO
                        }
                    }))
                }

            })
        }
    }, []);

    const handleSeleccionar = (id) => {
        setSeleccionados((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );

    };

    const handleSubmit = () => {
        if (readOnly) { router.push('/dashboard'); return }
        const datosAEnviar = {
            seleccionados,
        };
        console.log('Datos enviados:', datosAEnviar);

        // fetchProcesoReq(axiosInstance, ReqId, '0004').then(data => {
        //     CrearProcReq(axiosInstance, ReqId, '0005', data.IDPERFIL, user.CODEMPLEADO, data.CONVOCATORIA, data.INVITACION).then((data) => {
        //         for (const seleccionado of datosAEnviar.seleccionados) {
        //             crearProcesosCandidatos(axiosInstance, seleccionado, ReqId, '0005', data.IDPERFIL, data.CONSPROCESO).then(() => {
        //                 console.log('Proceso de candidato creado')
        //             })
        //         }
        //         Swal.fire('Proceso de requerimiento creado', '', 'success').then(() => {
        //             router.push('/dashboard')
        //         })
        //     })
        // })

        fetchProcesoReq(axiosInstance, ReqId, '0004').then(data => {
            CrearProcReq(axiosInstance, ReqId, '0005', data.IDPERFIL, user.CODEMPLEADO, data.CONVOCATORIA, data.INVITACION).then((data) => {
                Swal.fire('Proceso de requerimiento creado', '', 'success').then(() => {
                    router.push('/dashboard')
                })
            })
        })

        // Limpiar la selección después de enviar
        setSeleccionados([]);
        router.push('/dashboard');
    };


    return (
        <div>
            <h2 className="text-xl font-semibold text-primaryText">{readOnly ? "Invitados Preseleccionados" : "Elija los invitados a preseleccionar"}</h2>
            <div className="max-h-[50vh] overflow-y-auto rounded grid grid-cols-2 gap-4 px-2 ">

                {invitados.map((invitado) => (
                    <div key={invitado.id} className="bg-secondaryAccent/50 text-primaryText p-4 rounded-lg flex items-center justify-between mt-2">
                        <div className="flex items-center">
                            {!readOnly && <input
                                type="checkbox"
                                checked={seleccionados.includes(invitado.id)}
                                onChange={() => handleSeleccionar(invitado.id)}
                                className="mr-2"
                                disabled={readOnly}
                            />}
                            <p className="text-lg font-semibold">{invitado.nombre}</p>
                        </div>
                        {!readOnly && <CVDialog id={invitado.id} />}
                    </div>
                ))}
            </div>
            <Button
                onClick={handleSubmit}
                className={cn("mt-4  bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 px-4 rounded")}
            >
                {readOnly ? "Salir" : "Guardar y Salir"}
            </Button>
        </div>
    )
}

function Fase6({ readOnly, procesoReqId, ReqId }) {


    // mockData para las pruebas (según perfilId)
    const pruebasMockData = {
        101: ['Prueba 1', 'Prueba 2', 'Prueba 3',
        ],
        102: ['Prueba 1', 'Prueba 4'],
        103: ['Prueba 2', 'Prueba 3', 'Prueba 4'],
        104: ['Prueba 1', 'Prueba 2', 'Prueba 3', 'Prueba 4'],
    };
    const { axiosInstance, user } = useGlobalContext();
    const [convocados, setConvocados] = useState([]);
    const [pruebas, setPruebas] = useState({});
    const [selectedConvocado, setSelectedConvocado] = useState(null);
    const [selectedPruebas, setSelectedPruebas] = useState({});
    const [fecha, setFecha] = useState({});

    useEffect(() => {
        if (readOnly) {
            fetchAllProcesosCandidatos(axiosInstance, ReqId, '0006').then(data => {
                if ((data.message)) {
                    Swal.fire('Ningun candidato fue preseleccionado').then(() =>
                        router.push('/dashboard')
                    )
                } else {

                    setConvocados(data.map(convocado => {
                        return {
                            id: convocado.USUARIO,
                            nombre: convocado.NOMBRE + ' ' + convocado.APELLIDO,
                            perfilId: convocado.IDPERFIL
                        }
                    }))
                }
            })

        } else {
            fetchAllProcesosCandidatos(axiosInstance, ReqId, '0005').then(data => {
                if ((data.message)) {
                    Swal.fire('Ningun invitado acepto la invitacion').then(() =>
                        router.push('/dashboard')
                    )
                } else {
                    setConvocados(data.map((convocado) => {
                        return {
                            id: convocado.USUARIO,
                            nombre: convocado.NOMBRE + ' ' + convocado.APELLIDO,
                            perfilId: convocado.IDPERFIL
                        }
                    }))

                }
            })
        }
    }, []);

    const fetchPruebas = async (perfilId) => {
        const { IDDISCIPLINA } = await getPerfilAndDisciplina(axiosInstance, ReqId, perfilId, '0005')
        const result = await getPruebas(axiosInstance, IDDISCIPLINA);
        return result.map(prueba => prueba.DESCPRUEBA)
    };

    const handleConvocadoClick = async (convocado) => {
        const pruebas = await fetchPruebas(convocado.perfilId);
        setSelectedConvocado(convocado);
        setPruebas((prev) => ({ ...prev, [convocado.id]: pruebas }));
    };

    const handlePruebaSelect = (convocadoId, prueba) => {
        setSelectedPruebas((prev) => ({
            ...prev,
            [convocadoId]: {
                ...(prev[convocadoId] || {}),
                [prueba]: !prev[convocadoId]?.[prueba],
            },
        }));
    };

    const handleFechaSelect = (convocadoId, prueba, fecha) => {
        setFecha((prev) => ({
            ...prev,
            [convocadoId]: {
                ...(prev[convocadoId] || {}),
                [prueba]: fecha,
            },
        }));
    };

    const handleSubmit = () => {
        let isValid = true;
        for (const convocado of convocados) {
            if (!selectedPruebas[convocado.id]) {
                isValid = false;
                break;
            }
            for (const prueba of Object.keys(selectedPruebas[convocado.id])) {
                if (!selectedPruebas[convocado.id][prueba] || !fecha[convocado.id]?.[prueba]) {
                    isValid = false;
                    break;
                }
            }
        }
        if (!isValid) {
            Swal.fire('Todos los convocados deben tener pruebas y fechas asignadas.');
            return;
        }

        const payload = convocados.map((convocado) => ({
            convocadoId: convocado.id,
            pruebas: Object.keys(selectedPruebas[convocado.id]).map((prueba) => ({
                nombre: prueba,
                fecha: fecha[convocado.id][prueba],
            })),
        }));
        console.log('Enviando payload:', payload);

        // fetchProcesoReq(axiosInstance, ReqId, '0005').then(data => {
        //     CrearProcReq(axiosInstance, ReqId, '0006', data.IDPERFIL, user.CODEMPLEADO, data.CONVOCATORIA, data.INVITACION).then(() => {
        //         for (const candidato of payload) {
        //             crearProcesosCandidatos(axiosInstance, candidato.convocadoId, ReqId, '0006', data.IDPERFIL, procesoReqId).then(() => {
        //                 console.log('Proceso de candidato creado')
        //             })
        //         }
        //         Swal.fire('Proceso de requerimiento creado', '', 'success').then(() => {
        //             router.push('/dashboard')
        //         })
        //     })
        // })
    };

    return (convocados &&
        <div>
            <div className="flex">
                <div className="w-1/2 p-4">
                    <h2 className="text-lg font-bold">Elija los convocados a Pruebas</h2>
                    <div className="flex flex-col gap-4 py-2 max-h-[50vh] h-full overflow-y-auto">
                        {convocados.map((convocado) => (
                            <button
                                key={convocado.id}
                                className="bg-secondaryAccent/50 text-primaryText py-2 px-4 rounded-lg w-full"
                                onClick={() => handleConvocadoClick(convocado)}
                            >
                                {convocado.nombre}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-lg font-bold">Pruebas</h2>
                    <div className="flex flex-col gap-2 py-2 max-h-[50vh] h-full overflow-y-auto">
                        {selectedConvocado && pruebas[selectedConvocado.id] && (
                            <div className="space-y-4">
                                {pruebas[selectedConvocado.id].map((prueba) => (
                                    <div key={prueba} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedPruebas[selectedConvocado.id]?.[prueba] || false}
                                            onChange={() => handlePruebaSelect(selectedConvocado.id, prueba)}
                                        />
                                        <label>{prueba}</label>
                                        {selectedPruebas[selectedConvocado.id]?.[prueba] && (
                                            <FechaDialog
                                                onSelectFecha={handleFechaSelect}
                                                selectedPrueba={prueba}
                                                selectedConvocadoId={selectedConvocado.id}
                                                currentFecha={fecha[selectedConvocado.id]?.[prueba]}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button
                    className="bg-primaryButton text-primaryText py-2 px-4 rounded-lg w-full"
                    onClick={handleSubmit}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}

function Fase7({ readOnly, procesoReqId, ReqId }) {
    const convocadosAprobados = [
        { id: 1, nombre: 'Convocado 1', procentajeCalificación: 100 },
        { id: 2, nombre: 'Convocado 2', procentajeCalificación: 100 },
        { id: 3, nombre: 'Convocado 3', procentajeCalificación: 100 },
        { id: 4, nombre: 'Convocado 4', procentajeCalificación: 100 },
    ];
    const [aprobados, setAprobados] = useState([]);
    const router = useRouter()

    useEffect(() => {
        //fetch de los aprobados
        setAprobados(convocadosAprobados)
    }, [])


    return (
        <div className="h-[60vh]">
            <div className="grid grid-cols-2 gap-4">
                {aprobados.map((aprobado) => {
                    return (<div key={aprobado.id} className="flex flex-col gap-2 w-full h-full bg-secondaryAccent/50 text-primaryText rounded p-4">
                        <p className="text-xl font-bold">Nombre: {aprobado.nombre}</p>
                        <p className="text-xl font-bold">% Calificacion: {aprobado.procentajeCalificación}</p>
                    </div>)
                }
                )}
            </div>
            <div className="mt-4">
                <button
                    className="bg-primaryButton text-primaryText py-2 px-4 rounded-lg w-full"
                    onClick={() => router.push('/dashboard')}
                >
                    Salir
                </button>
            </div>
        </div >
    )
}


export { Fase1, Fase2, Fase3, Fase4, Fase5, Fase6, Fase7 }