import React, { use, useState, useEffect, useRef } from 'react';

export interface Pais {
    idGeojson: number;
    nom: string;
    capital: string;
    feta: boolean;
    lat?: number;
    lon?: number;
    zoom?: number;
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
    marcarPaisActiuFet: () => {},
    netejarPaisos: () => {},
    encerts: 0,
    setEncerts: (value: number) => {},
    ajudes: 0,
    setAjudes: (value: number) => {},
    comptarPaisosNoFets: () => {},
    getPais: () => {},
    getCapital: () => {},
    getPoint: () => {},
    getZoom: () => {},
    nextPais: () => {},
    debugPaisos: () => {},
    llistaContinent: [] as string[],
    continent: "" as string,
    setContinent: (value: string) => {}
})

export const GlobalContextProvider =  (props:any) => {
    const llistaContinent = ["Europa", "Asia", "Amèrica", "Africa", "Oceania"];
    const [continent, setContinent] = useState<string>(llistaContinent[4]);
    const [originalPaisos, setOriginalPaisos] = useState<any[]>([]);
    const [paisos, setPaisos] = useState<Pais[]>([]);
    const [paisActiu, setPaisActiu] = useState<number | null>(null);
    const [encerts, setEncerts] = useState<number>(0);
    const [ajudes, setAjudes] = useState<number>(0);


    const randomNumber = (max: number) => {
        return Math.floor(Math.random() * max);
        //return 13;
    };

    const comptarPaisosNoFets = () => {
        let count = 0;
        paisos.forEach((pais) => {
            if (!pais.feta) {
                count++;
            }
        });
        return count;
    }

    const buscaPaisX = (x: number):number  => {
        let i = 0;
        let count = 0;
        for (; i < paisos.length; i++) {
            if (!paisos[i].feta) {
                if (count == x) {
                    break;
                }
                count++;
            }
        }
        return i;   
    }

    const selectPais = () => {
        const numeroPaisosRestants = comptarPaisosNoFets();
        if (numeroPaisosRestants === 0) {
            console.log("Tots els paisos fets");
            return;
        }
        const numero = randomNumber(numeroPaisosRestants);
        const y = buscaPaisX(numero);        
        setPaisActiu(y);
    };

    const nextPais = () => {
        if (paisos.length > 0 && paisActiu !== null) {
            if (paisActiu < paisos.length - 1){
                setPaisActiu(paisActiu + 1);
            } else {
                setPaisActiu(0);
            }
        } else {
            console.log("No hi ha paisos");
        }
    }

    const isCorrectPais = (nom: string, capital: string):[boolean, number|null] => {
        for (let i = 0; i < paisos.length; i++) {
            if (paisos[i].idGeojson == paisActiu) {
                // Comprovem si el nom i la capital coincideixen
                return [(paisos[i].nom == nom && paisos[i].capital == capital), i]; 
            }
        }
        return [false, null];
    }
    const marcarPaisActiuFet = () => {
        if (paisActiu === null) {
            return;
        }
        const paisosAux = paisos;
        paisosAux[paisActiu].feta = true;
        setPaisos(paisosAux);
    }

    const netejarPaisos = () => {
        const paisosAux = paisos;
        paisosAux.forEach((pais) => {
            pais.feta = false;
        });
        setPaisos(paisosAux);
    }

    const checkPais = (nom: string, capital: string) => {

        const [ret, paisActiu] = isCorrectPais(nom, capital);

        if (ret && paisActiu !== null) {
            // Marquem el país com a fet
            marcarPaisActiuFet();
            // Actualitzem el context
            setPaisos(paisos);
            // Seleccionem un nou país
            selectPais();
            // Sumem un encert
            setEncerts(encerts + 1);
            // Retornem true
            return true;
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
        return getCountry()?.capital;
    }
    const getPoint = () => {
        return [getCountry()?.lon, getCountry()?.lat];
    }
    const getZoom = () => {
        return getCountry()?.zoom;
    }

    const debugPaisos = () => {
        paisos.forEach((pais) => {
            console.log(pais.nom + ":" + pais.capital+ " " + pais.feta);
        });
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
            marcarPaisActiuFet,
            netejarPaisos,
            encerts,
            setEncerts,
            ajudes,
            setAjudes,
            comptarPaisosNoFets,
            getPais,
            getCapital,
            getPoint,
            getZoom,
            nextPais,
            debugPaisos,
            llistaContinent,
            continent,
            setContinent
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
