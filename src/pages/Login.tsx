import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {login} from '@react-native-seoul/kakao-login';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { AppRegistry } from 'react-native'
import styled, { css } from '@emotion/native'

useEffect(() => {
  GoogleSignin.configure({
    webClientId: '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com', 
    offlineAccess: true, 
    hostedDomain: '', 
    forceConsentPrompt: true, 
  });
}, []);

export const state = {
  pushData: [],
  loggedIn: false
}

const KaKaoBtn = styled.TouchableOpacity`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #bbb790;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const kakaoLogin = async () => {
  const {accessToken} = await login();
  // const res = await api(`/auth/kakao?token=${accessToken}`, {method: 'POST'});

};

export const _signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo: userInfo, loggedIn: true });
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

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

export default () => {
  useEffect(() => {
  }, []);

  return (
    <View style={{padding: 20}}>
        <TouchableOpacity onPress={kakaoLogin}>
          <ImageBackground source={require("../../img/kakao_login/en/kakao_login_medium_wide.png")} style={{width: 300, height: 45}}/>
        </TouchableOpacity>

        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
          disabled={this.state.isSigninInProgress} 
        />

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          //onPress={_cancel}
        >
          <Text>Cancel Test</Text>
        </TouchableOpacity>
      </View>
    
  );
};


