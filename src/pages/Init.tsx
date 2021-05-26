import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { navigate } from '@src/router/navigator';
import Button from '@src/components/Button';
import colors from '@src/constants/colors';
import useTheme from '@src/hooks/theme';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 65px;
  text-align: center;
  margin-top: 120px;
  font-family: 'Road Rage';
`;

const SubTitle = styled.Text`
  font-size: 15px;
  text-align: center;
  font-family: 'paybooc OTF Bold';
`;

const Spacer = styled.View`
  flex: 1;
`;

const LoginButton = styled(Button)`
  background-color: white;
  border: 1px solid ${colors.borderColor};
  margin-bottom: 10px;
`;

export default () => {
  const { resetTheme } = useTheme();

  useEffect(resetTheme, [resetTheme]);

  const handleLogin = () => navigate('Login');

  const handleRegister = () => {};

  return (
    <Container>
      <Title>AST</Title>
      <SubTitle>A Simple Tag</SubTitle>
      <Spacer />
      <LoginButton text="로그인" textColor="black" onPress={handleLogin} />
      <Button text="회원가입" onPress={handleRegister} />
    </Container>
  );
};
