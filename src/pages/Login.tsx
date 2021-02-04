import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { login } from '@react-native-seoul/kakao-login';
import api from '@src/api';
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from '@react-native-community/google-signin';

const Container = styled.View`
  padding: 20px;
`;

export default () => {
  const [userInfo, setUserInfo] = useState<User | null>();
  const kakaoLogin = async () => {
    const { accessToken } = await login();
    console.warn(accessToken);
    const res = await api.post('/auth/oauth/kakao', { accessToken });
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setUserInfo(await GoogleSignin.signIn());
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
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


