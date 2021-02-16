import styled from '@emotion/native';
import api from '@src/api';
import { setToken } from '@src/utils/auth';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import nfcManager, { Ndef, NfcEvents, NfcTech, TagEvent } from 'react-native-nfc-manager';

const startNFC = async () => {
  try {
    await nfcManager.start();
    return await nfcManager.isSupported();
  } catch {
    return false;
  }
};

const registerTagEvent = async () => {
  await nfcManager.registerTagEvent();
  nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
    console.warn(tag);
    readTag();
  });
};

const readTag = async () => {
  const resp = await nfcManager.requestTechnology(NfcTech.Ndef);
  console.warn('1', resp);
  const tag = await nfcManager.getTag();
  console.warn('2', JSON.stringify(tag));
  const event = await nfcManager.getNdefMessage();
  console.warn(JSON.stringify(event));
  if (event) {
    const payload = Ndef.text.decodePayload(event.ndefMessage[0].payload as never);
    console.warn(payload);
  }
  await nfcManager.cancelTechnologyRequest();
};

const initNFC = async () => {
  console.log(await startNFC());
  registerTagEvent();
  // await readTag();
};

const _test = async () => {
  try {
    await nfcManager.registerTagEvent();
  } catch (ex) {
    console.warn('ex', ex);
    nfcManager.unregisterTagEvent().catch(() => 0);
  }
};

const _cancel = () => {
  nfcManager.unregisterTagEvent().catch(() => 0);
};

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
  const [tag, setTag] = useState();

  useEffect(() => {
    initNFC();
  }, []);

  const handleLogin = async () => {
    const { data: { access_token } } = await api.post('/login', {
      id: 'admin',
      pw: 'admin',
    });
    await setToken({ token: access_token});
  };

  const handleCheckLogin = async () => {
    const { data } = await api.get('/login');
    console.warn(data);
  };

  const handleTag = async () => {
    const { data } = await api.get(`/products/${1001}`);
    console.log(data);
  };

  return (
    <Container>
      <Button onPress={handleLogin}>
        <Text>Login</Text>
      </Button>
      <Button onPress={handleCheckLogin}>
        <Text>Check Login</Text>
      </Button>
      <Button onPress={handleTag}>
        <Text>Tag & Check Mine</Text>
      </Button>
      <Button onPress={handleTag}>
        <Text>Transfer</Text>
      </Button>
      {/* <Button onPress={handleTag}>
        <Text></Text>
      </Button> */}
    </Container>
  );
};


