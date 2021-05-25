import React, { useState } from 'react';
import styled from '@emotion/native';
import { login as loginAsKakao } from '@react-native-seoul/kakao-login';
import api from '@src/api';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import useAuth from '@src/hooks/user';
import { back, reset } from '@src/router/navigator';
import TextInput from '@src/components/TextInput';
import Button from '@src/components/Button';
import colors from '@src/constants/colors';
import BackButton from '@src/components/BackButton';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 60px;
  text-align: center;
  margin-top: 120px;
  margin-bottom: 16px;
  font-family: 'Road Rage';
  font-size: 36px;
`;

const FormInput = styled(TextInput)`
  margin-bottom: 10px;
`;

const Spacer = styled.View`
  flex: 1;
`;

const OrWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const RowLine = styled.View`
  align-self: center;
  height: 1px;
  background-color: ${colors.placeholder};
  flex: 1;
`;

const OrText = styled.Text`
  margin: 0 8px;
  color: ${colors.placeholder};
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 14px;
`;

const KakaoLoginButton = styled(Button)`
  background-color: #fee509;
`;

const GoogleLoginButton = styled(Button)`
  margin-top: 8px;
  background-color: #fff;
  border: 1px solid ${colors.borderColor};
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
    const { accessToken } = await loginAsKakao();
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
      <BackButton onClick={back} />
      <Title>LOG IN</Title>
      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
        autoCapitalize="none"
      />
      <FormInput
        value={pw}
        onChangeText={setPw}
        textContentType="password"
        secureTextEntry
        placeholder="패스워드를 입력하세요"
        autoCapitalize="none"
      />
      <Button onPress={handleLogin} text="로그인" />

      <Spacer />

      <OrWrapper>
        <RowLine />
        <OrText>또는</OrText>
        <RowLine />
      </OrWrapper>

      <KakaoLoginButton
        onPress={kakaoLogin}
        text="카카오톡으로 로그인"
        textColor="black"
      />
      <GoogleLoginButton
        onPress={googleLogin}
        text="구글 계정으로 로그인"
        textColor="black"
      />
    </Container>
  );
};
