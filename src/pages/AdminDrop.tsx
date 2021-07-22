import styled from '@emotion/native';
import { writeNdef } from '@src/utils/nfc';
import React, { useState } from 'react';
import { Button, ToastAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import api from '@src/api';
import useAuth from '@src/hooks/user';

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
`;

const Label = styled.Text``;

const TextInput = styled.TextInput`
  border: 1px solid black;
  flex: 0 0 70%;
`;

export default () => {
  const { user } = useAuth();
  const [nfcId, setNfcId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [productId, setProductId] = useState('');
  const [editionId, setEditionId] = useState('');
  const [manufactureDate, setManufactureId] = useState('');
  const [limited, setLimited] = useState(false);

  const handleDrop = async () => {
    await writeNdef(nfcId);
    await api.post('/products', {
      nfcID: nfcId,
      brandID: brandId,
      productID: productId,
      editionID: editionId,
      manufactureDate: manufactureDate,
      limited: limited,
      ownerID: user?.userID,
    });
    ToastAndroid.show('done', ToastAndroid.SHORT);
  };

  return (
    <>
      <Row>
        <Label>nfcId</Label>
        <TextInput value={nfcId} onChangeText={setNfcId} />
      </Row>
      <Row>
        <Label>brandId</Label>
        <TextInput value={brandId} onChangeText={setBrandId} />
      </Row>
      <Row>
        <Label>productId</Label>
        <TextInput value={productId} onChangeText={setProductId} />
      </Row>
      <Row>
        <Label>editionId</Label>
        <TextInput value={editionId} onChangeText={setEditionId} />
      </Row>
      <Row>
        <Label>manufactureDate</Label>
        <TextInput value={manufactureDate} onChangeText={setManufactureId} />
      </Row>
      <Row>
        <Label>limited</Label>
        <CheckBox value={limited} onValueChange={setLimited} />
      </Row>
      <Button onPress={handleDrop} title="drop" />
    </>
  );
};
