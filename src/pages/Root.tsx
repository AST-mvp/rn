import styled from '@emotion/native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import nfcManager, { NfcEvents, NfcTech, TagEvent } from 'react-native-nfc-manager';

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
  const resp = await nfcManager.requestTechnology(NfcTech.NfcV);
  console.warn('1', resp);
  const tag = await nfcManager.getTag();
  console.warn('2', JSON.stringify(tag));
  const event = await nfcManager.getNdefMessage();
  console.warn(event);
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
  padding: 10px;
  width: 200px;
  margin: 20px;
  border-width: 1px solid black;
`;

export default () => {
  useEffect(() => {
    initNFC();
  }, []);

  return (
    <Container>
        <Text>NFC Demo</Text>
        <Button onPress={_test}>
          <Text>Test</Text>
        </Button>
        <Button onPress={_cancel}>
          <Text>Cancel Test</Text>
        </Button>
      </Container>
  );
};


