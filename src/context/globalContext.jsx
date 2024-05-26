"use client";
import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalWrapper({ children }) {

    const axios = require('axios').default;
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api/',
    });

    return (
        <GlobalContext.Provider
            value={{
                axiosInstance
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useAppContext() {
    return useContext(GlobalContext);
}
