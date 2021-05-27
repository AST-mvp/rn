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
  justify-content: space-between;
  background-color: black;
`;

const Title = styled.Text`
  color: white;
  font-size: 60px;
  text-align: center;
  margin-top: 220px;
  font-family: 'Road Rage';
`;

const SubTitle = styled.Text`
  color: white;
  font-size: 15px;
  text-align: center;
  margin-bottom: 60px;
  font-family: 'paybooc OTF Bold';
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
        setTimeout(() => {
          reset('Init');
        }, 1000);
        return;
      }
      dispatchToken({ type: 'update', token: token.token });
      return reset('Main');
    })();
  }, [dispatchToken]);
  return (
    <Container>
      <Title>AST</Title>
      <SubTitle>A SIMPLE TAG</SubTitle>
    </Container>
  );
};
