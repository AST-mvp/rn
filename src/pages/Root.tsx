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

export default () => {
  useEffect(() => {
    initNFC();
  }, []);

  return (
    <Text>대충 메인</Text>
  );
};
