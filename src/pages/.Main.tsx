import React, { useState } from 'react';
import styled from '@emotion/native';
import { ScrollView, NativeSyntheticEvent, Text, TextInputChangeEventData } from 'react-native';
import { reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';
import nfcManager, { NfcTech } from 'react-native-nfc-manager';
import api from '@src/api';
import { readNdef, writeNdef } from '@src/utils/nfc';

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
  const [userId, setUserId] = useState('');

  const handleTag = async () => {
    await nfcManager.cancelTechnologyRequest();
    setTagData('loading');
    await nfcManager.requestTechnology(NfcTech.Ndef);
    setTagData('loaded');
    const tag = await nfcManager.getTag();
    setTagData(JSON.stringify(tag));
    await nfcManager.cancelTechnologyRequest();
  };

  const handleReadId = async () => {
    setTagData('loading');
    const text = await readNdef();
    if (!text) {
      setTagData('fail');
      return;
    }
    setTagData(text);
  };

  const handleFetchAll = async () => {
    setTagData('loading');
    const { data } = await api.get('/products');
    setTagData(JSON.stringify(data));
  };

  const handleFetch = async () => {
    setTagData('loading');
    const text = await readNdef();
    if (!text) {
      setTagData('fail');
      return;
    }
    const { data } = await api.get(`/products/${text}`);
    setTagData(JSON.stringify(data));
  };

  const handleWriteId = async () => {
    setTagData('loading');
    await writeNdef(writeData);
    setTagData('success');
  };

  const handleCheckMine = async () => {
    setTagData('loading');
    const text = await readNdef();
    if (!text) {
      setTagData('fail');
      return;
    }
    const { data: { result } } = await api.get(`/products/${text}/check`);
    setTagData(`${result}`);
  };

  const handleTrade = async () => {
    setTagData('loading');
    const text = await readNdef();
    if (!text) {
      setTagData('fail');
      return;
    }
    const { data } = await api.post('/products/trade', {
      userID: userId,
      nfcID: text,
    });
    console.warn(data);
  };

  const handleLogout = async () => {
    await setToken(null);
    reset('Root');
  };

  const handleChangeWriteData = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setWriteData(event.nativeEvent.text);
  };

  const handleChangeTradeUserId = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setUserId(event.nativeEvent.text);
  };

  return (
    <ScrollView>
      <Text>{tagData}</Text>
      <Button onPress={handleTag}>
        <Text>Tag</Text>
      </Button>
      <Button onPress={handleReadId}>
        <Text>Read</Text>
      </Button>
      <Button onPress={handleFetchAll}>
        <Text>Fetch All</Text>
      </Button>
      <Button onPress={handleFetch}>
        <Text>Fetch</Text>
      </Button>
      <Row>
        <Text>write data: </Text>
        <Input value={writeData} onChange={handleChangeWriteData} />
      </Row>
      <Button onPress={handleWriteId}>
        <Text>Write</Text>
      </Button>
      <Button onPress={handleCheckMine}>
        <Text>Check Mine</Text>
      </Button>
      <Row>
        <Text>user id: </Text>
        <Input value={userId} onChange={handleChangeTradeUserId} />
      </Row>
      <Button onPress={handleTrade}>
        <Text>Trade</Text>
      </Button>
      <Button>
        <Text>Register</Text>
      </Button>
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </ScrollView>
  );
};