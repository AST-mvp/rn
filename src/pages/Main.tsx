import React, { useState } from 'react';
import styled from '@emotion/native';
import { Text } from 'react-native';
import { reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';
import nfcManager, { NfcTech } from 'react-native-nfc-manager';

const Container = styled.View`
  padding: 20px;
`;

const Button = styled.TouchableOpacity`
  padding: 16px;
  width: 200px;
  margin: 8px;
  text-align: center;
  border: 1px solid black;
`;

export default () => {
  const [tagData, setTagData] = useState('');

  const handleTag = async () => {
    setTagData('loading');
    await nfcManager.requestTechnology(NfcTech.Ndef);
    setTagData('loaded');
    const tag = await nfcManager.getTag();
    setTagData(JSON.stringify(tag));
    await nfcManager.cancelTechnologyRequest();
  };

  const logout = async () => {
    await setToken(null);
    reset('Root');
  };

  return (
    <Container>
      <Text>{tagData}</Text>
      <Button onPress={handleTag}>
        <Text>Tag & Check Mine</Text>
      </Button>
      <Button>
        <Text>Transfer</Text>
      </Button>
      <Button>
        <Text>Register</Text>
      </Button>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};
