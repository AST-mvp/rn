import React, { useState } from 'react';
import styled from '@emotion/native';
import { NativeSyntheticEvent, Text, TextInputChangeEventData } from 'react-native';
import { reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';
import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

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

const Input = styled.TextInput`
  border: 1px solid black;
  flex: 1;
`;

const Row = styled.View`
  width: 200px;
  margin: 8px;
  flex-direction: row;
  align-items: center;
`;

export default () => {
  const [tagData, setTagData] = useState('');
  const [writeData, setWriteData] = useState('');

  const handleTag = async () => {
    setTagData('loading');
    await nfcManager.requestTechnology(NfcTech.Ndef);
    setTagData('loaded');
    const tag = await nfcManager.getTag();
    setTagData(JSON.stringify(tag));
    await nfcManager.cancelTechnologyRequest();
  };

  const readId = async () => {
    setTagData('loading');
    await nfcManager.requestTechnology(NfcTech.Ndef);
    setTagData('loaded');
    const event = await nfcManager.getNdefMessage();
    console.warn(JSON.stringify(event));
    if (!event?.ndefMessage?.[0]) {
      setTagData('fail');
      await nfcManager.cancelTechnologyRequest();
      return;
    }
    const text = Ndef.text.decodePayload(Uint8Array.from(event.ndefMessage[0].payload));
    setTagData(text);
    await nfcManager.cancelTechnologyRequest();
  };

  const writeId = async () => {
    setTagData('loading');
    await nfcManager.requestTechnology(NfcTech.Ndef);
    setTagData('loaded');
    const bytes = Ndef.encodeMessage([
      Ndef.textRecord(writeData),
    ]);
    await nfcManager.writeNdefMessage(bytes);
    setTagData('success');
    await nfcManager.cancelTechnologyRequest();
  };

  const logout = async () => {
    await setToken(null);
    reset('Root');
  };

  const handleChangeWriteData = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setWriteData(event.nativeEvent.text);
  };

  return (
    <Container>
      <Text>{tagData}</Text>
      <Button onPress={handleTag}>
        <Text>Tag</Text>
      </Button>
      <Button onPress={readId}>
        <Text>Read</Text>
      </Button>
      <Row>
        <Text>write data: </Text>
        <Input value={writeData} onChange={handleChangeWriteData} />
      </Row>
      <Button onPress={writeId}>
        <Text>Write</Text>
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
