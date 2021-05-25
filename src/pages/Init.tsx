import React from 'react';
import styled from '@emotion/native';
import { navigate } from '@src/router/navigator';

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 60px;
  text-align: center;
  margin-top: 120px;
  font-family: 'Road Rage';
`;

const SubTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-top: 8px;
`;

const Spacer = styled.View`
  flex: 1;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
`;

const LoginText = styled.Text`
  text-align: center;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: black;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
`;

const RegisterText = styled.Text`
  color: white;
  text-align: center;
`;

export default () => {
  const handleLogin = () => navigate('Login');

  const handleRegister = () => {};

  return (
    <Container>
      <Title>AST</Title>
      <SubTitle>A Simple Tag</SubTitle>
      <Spacer />
      <LoginButton onPress={handleLogin}>
        <LoginText>로그인</LoginText>
      </LoginButton>
      <RegisterButton onPress={handleRegister}>
        <RegisterText>회원가입</RegisterText>
      </RegisterButton>
    </Container>
  );
};
