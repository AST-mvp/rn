import React, { useEffect } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { login } from '@react-native-seoul/kakao-login';
import api from '@src/api';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
  padding: 20px;
`;

export default () => {
  useEffect(() => {
  }, []);

  const kakaoLogin = async () => {
    const { accessToken } = await login();
    const { data } = await api.post('/auth/oauth/kakao', { accessToken });
    await AsyncStorage.setItem('token', data.token);
  };

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();
    const { data } = await api.post('/auth/oauth/google', { accessToken });
    await AsyncStorage.setItem('token', data.token);
  };

  return (
    <Container>
      <TouchableOpacity onPress={kakaoLogin}>
        <ImageBackground source={require('../../img/kakao_login/en/kakao_login_medium_wide.png')} style={{width: 300, height: 45}}/>
      </TouchableOpacity>
      <GoogleSigninButton onPress={googleLogin} />
    </Container>
  );
};
