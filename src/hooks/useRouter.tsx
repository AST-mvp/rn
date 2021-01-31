import React, { createContext, useContext, useState } from 'react';
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@src/router/navigator';

const useProvidedRouter = () => {
  const [navigator, setNavigator] = useState<NavigationContainerRef | null>();

  const navigate = <K extends keyof RootStackParamList>(routeName: K, params?: RootStackParamList[K]) => {
    if (!navigator) {
      throw new Error('navigator is not defined');
    }
    navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  };

  const reset = <K extends keyof RootStackParamList>(routeName: K) => {
    if (!navigator) {
      throw new Error('navigator is not defined');
    }
    navigator.dispatch(
      CommonActions.reset({
        routes: [
          { name: routeName },
        ],
      }),
    );
  };

  const back = () => {
    if (!navigator) {
      throw new Error('navigator is not defined');
    }
    navigator.dispatch(CommonActions.goBack());
  };

  return {
    setNavigator,
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
