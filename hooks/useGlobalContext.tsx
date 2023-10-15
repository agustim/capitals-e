import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

export const useGlobalContext = () => useContext(GlobalContext);