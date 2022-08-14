import React, { useContext, useReducer } from 'react';
import reducer from './globalReducer';

import { cat, dog, testBoxerOne, testBoxerTwo } from '../../classes/classes';

const initialState = {
  cat: cat,
  dog: dog,
  testBoxerOne: testBoxerOne,
  testBoxerTwo: testBoxerTwo,
};

const GlobalContext = React.createContext(initialState);

// This context provider is passed to any component requiring the context
const GlobalContextProvider = ({ children }: any) => {
  // use reducer for dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleIsTrue = () => {
    dispatch({ type: 'TOGGLE_ISTRUE' });
  };
  const toggleIsFalse = () => {
    dispatch({ type: 'TOGGLE_ISFALSE' });
  };

  const setFoobarFoo = (foo: any) => {
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
