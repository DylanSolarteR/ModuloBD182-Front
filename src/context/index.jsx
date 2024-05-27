"use client";
import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalWrapper({ children }) {

    const axios = require('axios').default;
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000/',
    });

    const [user, setUser] = useState(null);
    /* 
    {
        "CODEMPLEADO": "00006",
        "NOMEMPLEADO": "Laura",
        "APELLEMPLEADO": "Sanchez",
        "FECHANAC": "1988-05-19T05:00:00.000Z",
        "FECHAINGRE": "2010-11-14T05:00:00.000Z",
        "FECHAEGRESO": null,
        "CORREO": "lauraSanchez@gmail.com",
        "CONSECARGO": 7,
        "IDTIPOCARGO": "003",
        "FECHAINICIOCARGO": "2010-11-14T05:00:00.000Z",
        "FECHAFINCARGO": null,
        "DESCCARGO": "Analista SicolÃ³gico",
        "DESCTIPOCARGO": "Analista Sicologico"
    }
    */
    return (
        <GlobalContext.Provider
            value={{
                axiosInstance,
                user,
                setUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
