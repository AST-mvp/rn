import useAuth from '@src/hooks/user';
import { reset } from '@src/router/navigator';
import { getToken } from '@src/utils/auth';
import { useEffect } from 'react';

export default () => {
  const { dispatchToken } = useAuth();
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        return reset('Login');
      }
      dispatchToken({ type: 'update', token: token.token });
      return reset('Main');
    })();
  }, [dispatchToken]);
  return null;
};
