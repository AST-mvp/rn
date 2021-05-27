import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from '@emotion/native';
import { navigate } from '@src/router/navigator';
import Button from '@src/components/Button';
import colors from '@src/constants/colors';
import useTheme from '@src/hooks/theme';

const Container = styled(Animated.View)`
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
  const titleTop = useRef(new Animated.Value(100)).current;
  const titleSize = useRef(new Animated.Value(55 / 65)).current;
  const subTitleTop = useRef(new Animated.Value(470)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(resetTheme, [resetTheme]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleTop, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(titleSize, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(subTitleTop, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, [backgroundColor, opacity, subTitleTop, titleSize, titleTop]);

  const handleLogin = () => navigate('Login');

  const handleRegister = () => {};

  return (
    <Container
      style={{
        backgroundColor: backgroundColor.interpolate({
          inputRange: [0, 1],
          outputRange: ['black', 'white'],
        }),
      }}>
      <Animated.View
        style={{
          transform: [{ translateY: titleTop }, { scale: titleSize }],
        }}>
        <Title>AST</Title>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: subTitleTop }] }}>
        <SubTitle>A Simple Tag</SubTitle>
      </Animated.View>
      <Spacer />
      <Animated.View style={{ opacity }}>
        <LoginButton text="로그인" textColor="black" onPress={handleLogin} />
        <Button text="회원가입" onPress={handleRegister} />
      </Animated.View>
    </Container>
  );
};
