import React, { createContext, useContext } from 'react';
import {
  initialContext,
  reducer,
  TOGGLE_LOADING,
} from './reducer';

const StateContext = createContext(initialContext);
const DispatchContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialContext);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useUIState = () => useContext(StateContext);

export const useUIDispatch = () => {
  const dispatch = useContext(DispatchContext)

  const toggleLoading = React.useCallback((payload) => {
    dispatch({ type: TOGGLE_LOADING, payload })
  }, [dispatch]);

  return React.useMemo(
    () => ({
      toggleLoading,
    }),
    [dispatch],
  )
}
