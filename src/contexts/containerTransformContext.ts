import { createContext } from 'react';

export interface IContainerTransformContext {
  expanded: boolean;
  rootElementRef?: React.RefObject<HTMLDivElement>;
}

const initialState: IContainerTransformContext = { expanded: false };

export const ContainerTransformContext =
  createContext<IContainerTransformContext>(initialState);
