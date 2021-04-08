import React, { useState } from 'react';
import styled from '@emotion/native';
import { login } from '@react-native-seoul/kakao-login';
import api from '@src/api';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import useAuth from '@src/hooks/user';
import { reset } from '@src/router/navigator';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 60px;
  text-align: center;
  margin-top: 120px;
  margin-bottom: 16px;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: black;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
`;

const LoginText = styled.Text`
  color: white;
  text-align: center;
`;

const Spacer = styled.View`
  flex: 1;
`;

const OrWrapper = styled.View``;

const KakaoLoginButton = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: #f4e44e;
  padding: 16px;
  flex-direction: row;
`;

const GoogleLoginButton = styled.TouchableOpacity`
  margin-top: 8px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
`;

const SocialLoginText = styled.Text`
  flex: 1;
  text-align: center;
`;

export default () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

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

  const handleLogin = async () => {
    const {
      data: { access_token },
    } = await api.post('/login', {
      id: email,
      pw,
    });
    updateToken(access_token);
  };

  return (
    <Container>
      <Title>LOG IN</Title>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
      />
      <TextInput
        value={pw}
        onChangeText={setPw}
        textContentType="password"
        secureTextEntry
        placeholder="패스워드를 입력하세요"
      />
      <LoginButton onPress={handleLogin}>
        <LoginText>로그인</LoginText>
      </LoginButton>

      <Spacer />

      <OrWrapper />

      <KakaoLoginButton onPress={kakaoLogin}>
        <SocialLoginText>카카오톡으로 로그인</SocialLoginText>
      </KakaoLoginButton>
      <GoogleLoginButton onPress={googleLogin}>
        <SocialLoginText>구글 계정으로 로그인</SocialLoginText>
      </GoogleLoginButton>
    </Container>
  );
};
