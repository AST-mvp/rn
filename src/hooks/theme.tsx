import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

interface Theme {
  backgroundColor: string;
}

type ThemeDispatchAction =
  | ({ type: 'change' } & Partial<Theme>)
  | { type: 'reset' };

const useProvideTheme = () => {
  const [theme, dispatchTheme] = useReducer(
    (state: Theme, action: ThemeDispatchAction): Theme => {
      if (action.type === 'reset') {
        return { backgroundColor: 'white' };
      }
      return {
        ...state,
        ...action,
      };
    },
    { backgroundColor: '' },
  );

  const resetTheme = useCallback(() => dispatchTheme({ type: 'reset' }), []);

  const changeTheme = useCallback(
    (themeProps: Theme) => dispatchTheme({ type: 'change', ...themeProps }),
    [],
  );

  return {
    resetTheme,
    changeTheme,
    theme,
  };
};

const themeContext = createContext<
  ReturnType<typeof useProvideTheme> | undefined
>(undefined);

export const ProvideTheme: React.FC = (props) => {
  const theme = useProvideTheme();
  return <themeContext.Provider value={theme} {...props} />;
};

const useTheme = () => {
  const theme = useContext(themeContext);
  if (!theme) {
    throw new Error('ProvideTheme not found');
  }
  return theme;
};

export default useTheme;
