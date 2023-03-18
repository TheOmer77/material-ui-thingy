import { useContext } from 'react';
import { ContainerTransformContext } from 'contexts/containerTransformContext';

const useContainerTransform = () => useContext(ContainerTransformContext);

export default useContainerTransform;
