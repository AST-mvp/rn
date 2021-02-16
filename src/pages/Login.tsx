import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { login } from '@react-native-seoul/kakao-login';
import api from '@src/api';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import useAuth from '@src/hooks/user';
import { reset } from '@src/router/navigator';
import kakaoLoginImage from '@src/img/kakao_login/en/kakao_login_medium_wide.png';

const Container = styled.View`
  padding: 20px;
`;

const KakaoLoginImage = styled.Image`
  width: 300px;
  height: 45px;
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
    const { data: { access_token } } = await api.post('/login', {
      id: 'admin',
      pw: 'admin',
    });
    updateToken(access_token);
  };

  return (
    <Container>
      <TouchableOpacity onPress={kakaoLogin}>
        <KakaoLoginImage source={kakaoLoginImage} />
      </TouchableOpacity>
      <GoogleSigninButton onPress={googleLogin} />
      <Button onPress={mockLogin} title="admin login" />
    </Container>
  );
};
