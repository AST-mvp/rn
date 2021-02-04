import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { login } from '@react-native-seoul/kakao-login';
import api from '@src/api';

const Container = styled.View`
  padding: 20px;
`;

export default () => {
  const kakaoLogin = async () => {
    const { accessToken } = await login();
    console.warn(accessToken);
    const res = await api.post('/auth/oauth/kakao', { accessToken });
  };

  return (
    <Container>
      <TouchableOpacity onPress={kakaoLogin}>
        <ImageBackground source={require('../../img/kakao_login/en/kakao_login_medium_wide.png')} style={{width: 300, height: 45}}/>
      </TouchableOpacity>
    </Container>
  );
};


