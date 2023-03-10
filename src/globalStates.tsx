import { createContext, useState, useMemo, ReactNode } from 'react';

interface GlobalStates {
  collapsing: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  hasSubtitle: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  customClassname: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  blockBtnsVertical: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const initialState: GlobalStates = {
  collapsing: [false, () => {}],
  hasSubtitle: [false, () => {}],
  customClassname: [false, () => {}],
  blockBtnsVertical: [false, () => {}],
};

export const GlobalStatesContext = createContext(initialState);

export const GlobalStatesProvider = ({ children }: { children: ReactNode }) => {
  const collapsing = useState(false);
  const hasSubtitle = useState(false);
  const customClassname = useState(false);
  const blockBtnsVertical = useState(false);

  const value = useMemo(
    () => ({
      collapsing,
      hasSubtitle,
      customClassname,
      blockBtnsVertical,
    }),
    [blockBtnsVertical, collapsing, customClassname, hasSubtitle]
  );

  return (
    <GlobalStatesContext.Provider value={value}>
      {children}
    </GlobalStatesContext.Provider>
  );
};
