import { createContext, useState, useMemo } from 'react';

const initialState = {
  collapsing: false,
  setCollapsing: () => {},
  hasSubtitle: false,
  setHasSubtitle: () => {},
  customClassname: false,
  setCustomClassname: () => {},
  blockBtnsVertical: false,
  setBlockBtnsVertical: () => {},
};

export const GlobalStatesContext = createContext(initialState);

export const GlobalStatesProvider = ({ children }) => {
  const [collapsing, setCollapsing] = useState(false);
  const [hasSubtitle, setHasSubtitle] = useState(false);
  const [customClassname, setCustomClassname] = useState(false);
  const [blockBtnsVertical, setBlockBtnsVertical] = useState(false);

  const value = useMemo(
    () => ({
      collapsing,
      setCollapsing,
      hasSubtitle,
      setHasSubtitle,
      customClassname,
      setCustomClassname,
      blockBtnsVertical,
      setBlockBtnsVertical,
    }),
    [blockBtnsVertical, collapsing, customClassname, hasSubtitle]
  );

  return (
    <GlobalStatesContext.Provider value={value}>
      {children}
    </GlobalStatesContext.Provider>
  );
};
