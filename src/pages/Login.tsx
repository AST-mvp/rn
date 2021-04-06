import React from 'react';
import styled from '@emotion/native';
import { login } from '@react-native-seoul/kakao-login';
import api from '@src/api';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import useAuth from '@src/hooks/user';
import { reset } from '@src/router/navigator';
import { Text } from 'react-native';

const Container = styled.View`
  padding: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  margin-bottom: 10px;
  border: 1px solid black;
`;

export default () => {
  const { dispatchToken } = useAuth();

  const updateToken = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    dispatchToken({ type: 'update', token });
    reset('Main');
  };

  const kakaoLogin = async () => {
    const { accessToken } = await login();
    const { data } = await api.post('/auth/oauth/kakao', { accessToken });
    updateToken(data.token);
  };

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();
    const { data } = await api.post('/auth/oauth/google', { accessToken });
    updateToken(data.token);
  };

  const mockLogin = async () => {
    const {
      data: { access_token },
    } = await api.post('/login', {
      id: 'admin',
      pw: 'admin',
    });
    updateToken(access_token);
  };

  const mockLogin2 = async () => {
    const {
      data: { access_token },
    } = await api.post('/login', {
      id: 'test3',
      pw: '3333',
    });
    updateToken(access_token);
  };

  return (
    <Container>
      <LoginButton onPress={kakaoLogin}>
        <Text>kakao login</Text>
      </LoginButton>
      <LoginButton onPress={googleLogin}>
        <Text>google login</Text>
      </LoginButton>
      <LoginButton onPress={mockLogin}>
        <Text>admin login</Text>
      </LoginButton>
      <LoginButton onPress={mockLogin2}>
        <Text>user3 login</Text>
      </LoginButton>
    </Container>
  );
};
