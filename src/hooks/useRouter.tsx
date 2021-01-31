import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@src/router/navigator';

const useProvidedRouter = () => {
  const navigator = useRef<NavigationContainerRef | null>();

  const setTopLevelNavigator = (ref: NavigationContainerRef | null) => {
    navigator.current = ref;
  };

  const navigate = useCallback(<K extends keyof RootStackParamList>(routeName: K, params?: RootStackParamList[K]) => {
    if (!navigator.current) {
      throw new Error('navigator is not defined');
    }
    navigator.current.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  }, [navigator]);

  const reset = useCallback(<K extends keyof RootStackParamList>(routeName: K) => {
    if (!navigator.current) {
      throw new Error('navigator is not defined');
    }
    navigator.current.dispatch(
      CommonActions.reset({
        routes: [
          { name: routeName },
        ],
      }),
    );
  }, [navigator]);

  const back = useCallback(() => {
    if (!navigator.current) {
      throw new Error('navigator is not defined');
    }
    navigator.current.dispatch(CommonActions.goBack());
  }, [navigator]);

  return {
    setTopLevelNavigator,
    navigate,
    reset,
    back,
  };
};

const routerContext = createContext<ReturnType<typeof useProvidedRouter> | undefined>(undefined);

export const ProvideRouter: React.FC = ({ children }) => {
  const router = useProvidedRouter();
  return (
    <routerContext.Provider value={router}>{children}</routerContext.Provider>
  );
};

const useRouter = () => {
  const router = useContext(routerContext);
  if (router === undefined) {
    throw new Error('ProvideRouter not found');
  }
  return router;
};

export default useRouter;
