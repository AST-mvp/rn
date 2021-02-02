import React, { useEffect } from 'react';
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
  nfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag: TagEvent) => {
    console.warn(tag);
    await readTag();
    await writeTag();
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

const writeTag = async () => {
  const resp = await nfcManager.requestTechnology(NfcTech.Ndef, {
    alertMessage: 'ready to write some nfc tags!',
  });
  console.warn(resp);
  const ndef = await nfcManager.getNdefMessage();
  console.warn(ndef);
  const bytes = Ndef.encodeMessage([
    Ndef.textRecord('test'),
  ]);
  await nfcManager.writeNdefMessage(bytes);
  console.warn('success');
  await nfcManager.cancelTechnologyRequest();
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
