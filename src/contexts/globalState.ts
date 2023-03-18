import { createContext } from 'react';

export interface GlobalState {
  collapsing: boolean;
  hasSubtitle: boolean;
  customClassname: boolean;
  blockBtnsVertical: boolean;
}

export const initialState: GlobalState = {
  collapsing: false,
  hasSubtitle: false,
  customClassname: false,
  blockBtnsVertical: false,
};
const initialDispatch = () => {
  return;
};

export const GlobalStateContext = createContext<GlobalState>(initialState),
  GlobalDispatchContext =
    createContext<(options: Partial<GlobalState>) => void>(initialDispatch);
