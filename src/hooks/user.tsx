import api from '@src/api';
import { setToken } from '@src/utils/auth';
import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react';

interface Token {
  token: string;
}

type TokenDispatchAction =
  | { type: 'update'; token: string }
  | { type: 'refresh' };

interface User {
  userID: string;
  username: string;
}

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>();
  const [token, dispatchToken] = useReducer(
    (state: Token, action: TokenDispatchAction): Token => {
      if (action.type === 'refresh') {
        return { ...state };
      }
      const newToken = {
        token: action.token,
      };
      setToken(newToken);
      return newToken;
    },
    { token: '' },
  );

  useEffect(() => {
    api
      .get('/users/me')
      .then((res) => {
        if (res.data.login === false) {
          return;
        }
        setUser(res.data);
      })
      .catch(() => {});
  }, [token]);

  return {
    dispatchToken,
    user,
  };
};

const authContext = createContext<
  ReturnType<typeof useProvideAuth> | undefined
>(undefined);

export const ProvideAuth: React.FC = (props) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth} {...props} />;
};

const useAuth = () => {
  const auth = useContext(authContext);
  if (!auth) {
    throw new Error('ProvideAuth not found');
  }
  return auth;
};

export default useAuth;
