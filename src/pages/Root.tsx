import React from 'react';
import styled from '@emotion/native';
import useAuth from '@src/hooks/user';
import { reset } from '@src/router/navigator';
import { getToken } from '@src/utils/auth';
import { useEffect } from 'react';
import requestCloudMessaging from '@src/utils/requestCloudMessaging';
import useTheme from '@src/hooks/theme';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Title = styled.Text`
  color: white;
  font-size: 60px;
  text-align: center;
  margin-top: 120px;
  font-family: 'Road Rage';
`;

export default () => {
  const { dispatchToken } = useAuth();
  const { changeTheme } = useTheme();

  useEffect(() => {
    changeTheme({ backgroundColor: 'black' });
  }, [changeTheme]);

  useEffect(() => {
    (async () => {
      await requestCloudMessaging();
      const token = await getToken();
      if (!token) {
        return reset('Init');
      }
      dispatchToken({ type: 'update', token: token.token });
      return reset('Main');
    })();
  }, [dispatchToken]);
  return (
    <Container>
      <Title>AST</Title>
    </Container>
  );
};
