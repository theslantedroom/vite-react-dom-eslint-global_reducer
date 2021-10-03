import React, { useContext, useReducer } from 'react';
import reducer from './globalReducer.jsx';

const GlobalContext = React.createContext();

const initialState = {
  isTrue: true,
  isFalse: false,
  foobar: 'FooBar',
};

// This context provider is passed to any component requiring the context
const GlobalContextProvider = ({ children }) => {
  // use reducer for dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleIsTrue = () => {
    dispatch({ type: 'TOGGLE_ISTRUE' });
  };
  const toggleIsFalse = () => {
    dispatch({ type: 'TOGGLE_ISFALSE' });
  };

  const setFoobarFoo = (foo) => {
    dispatch({ type: 'RUN_FOO', foo });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        toggleIsTrue,
        toggleIsFalse,
        setFoobarFoo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// make sure to use
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
