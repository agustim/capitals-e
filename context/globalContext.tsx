import React, { use, useState, useEffect, useRef } from 'react';

export interface Pais {
    idGeojson: number;
    nom: string;
    capital: string;
    feta: boolean;
}


export const GlobalContext = React.createContext({
    originalPaisos: [] as any[],
    setOriginalPaisos: (value: any[]) => {},
    paisos: [] as Pais[],
    setPaisos: (value: Pais[]) => {},
    paisActiu: null as number | null,
    setPaisActiu: (value: number | null) => {},
    selectPais: () => {},
    checkPais: (nom: string, capital: string) => {},
    encerts: 0,
    setEncerts: (value: number) => {},
    ajudes: 0,
    setAjudes: (value: number) => {},
    getPais: () => {},
    getCapital: () => {}
})

export const GlobalContextProvider =  (props:any) => {
    const [originalPaisos, setOriginalPaisos] = useState<any[]>([]);
    const [paisos, setPaisos] = useState<Pais[]>([]);
    const [paisActiu, setPaisActiu] = useState<number | null>(null);
    const [encerts, setEncerts] = useState<number>(0);
    const [ajudes, setAjudes] = useState<number>(0);

    const randomNumber = (max: number) => {
        return Math.floor(Math.random() * max);
    };

    const selectPais = () => {
        const number = randomNumber(paisos.length-1 );
        let y = 0;
        let count = 0;
        for (let i = 0; i < number && count < paisos.length;) {
            console.log("i: " + i + " y: " + y + " count: " + count);
            if (!paisos[y].feta) {
                count = 0;
                i++;
            } else {
                count++;
            }
            y = (i == paisos.length) ? 0 : y + 1;
        }
        if (count == paisos.length && paisos.length > 0) {
            console.log("Tots els paisos fets");
        }
        setPaisActiu(y);
    };

    const checkPais = (nom: string, capital: string) => {
        let ret = false;
        // Busquem el país actiu
        console.log("Pais actiu: " + paisActiu);
        for (let i = 0; i < paisos.length; i++) {
            if (paisos[i].idGeojson == paisActiu) {
                console.log(paisos[i])
                // Comprovem si el nom i la capital coincideixen
                if (paisos[i].nom == nom && paisos[i].capital == capital) {
                    // Marquem el país com a fet
                    paisos[i].feta = true;
                    // Actualitzem el context
                    setPaisos(paisos);
                    // Seleccionem un nou país
                    selectPais();
                    // Sumem un encert
                    setEncerts(encerts + 1);
                    // Retornem true
                    ret = true;
                }
                break;
            }
        }
        return ret;
    }

    const getCountry = () => {
        let ret = null;
        for (let i = 0; i < paisos.length; i++) {
            if (paisos[i].idGeojson == paisActiu) {
                ret = paisos[i];
                break;
            }
        }
        return ret;
    }
    const getPais = () => {
        return getCountry()?.nom;
    }
    const getCapital = () => {
        return getCountry()?.nom;
    }   

    useEffect(() => {
        console.log("GlobalContextProvider")
    }, [])

    useEffect(() => {
        if (paisos.length === originalPaisos.length && paisos.length > 0 && paisActiu === null) {
          selectPais(); 
        } 
      }, [paisos]);

    return (
        <GlobalContext.Provider 
        value={{
            originalPaisos,
            setOriginalPaisos,
            paisos,
            setPaisos,
            paisActiu,
            setPaisActiu,
            selectPais,
            checkPais,
            encerts,
            setEncerts,
            ajudes,
            setAjudes,
            getPais,
            getCapital
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
