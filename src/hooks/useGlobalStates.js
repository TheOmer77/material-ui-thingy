import { useContext } from 'react';
import { GlobalStatesContext } from '../globalStates';

const useGlobalStates = () => useContext(GlobalStatesContext);

export default useGlobalStates;
