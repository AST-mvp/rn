import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import {login} from '@react-native-seoul/kakao-login';
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from '@react-native-community/google-signin';
import styled from '@emotion/native';

export const kakaoLogin = async () => {
  // const res = await api(`/auth/kakao?token=${accessToken}`, {method: 'POST'});
};


const Container = styled.View`
  padding: 20px;
`;

export default () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setUserInfo(await GoogleSignin.signIn());
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {`이름: ${userInfo?.user.name}`}
      <TouchableOpacity onPress={kakaoLogin}>
        <ImageBackground source={require('../../img/kakao_login/en/kakao_login_medium_wide.png')} style={{width: 300, height: 45}}/>
      </TouchableOpacity>

      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        // disabled={isSigninInProgress}
      />
    </Container>
  );
};


