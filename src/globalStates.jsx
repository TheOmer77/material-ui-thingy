import { createContext, useState, useMemo } from 'react';

const initialState = {
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  collapsing: [false, () => {}],
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  hasSubtitle: [false, () => {}],
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  customClassname: [false, () => {}],
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  blockBtnsVertical: [false, () => {}],
};

export const GlobalStatesContext = createContext(initialState);

export const GlobalStatesProvider = ({ children }) => {
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
