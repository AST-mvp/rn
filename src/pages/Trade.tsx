import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/core';
import { reset, RootStackParamList } from '@src/router/navigator';
import { Button, Text, ToastAndroid } from 'react-native';
import styled from '@emotion/native';
import api from '@src/api';

type Props = {
  route: RouteProp<RootStackParamList, 'Trade'>;
};

const Container = styled.View`
  padding: 8px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput`
  border: 1px solid black;
  flex: 1;
`;

export default ({
  route: {
    params: { nfcId },
  },
}: Props) => {
  const [userId, setUserId] = useState('');

  const handleTrade = () => {
    api
      .post('/products/trade', {
        userID: userId,
        nfcID: nfcId,
      })
      .then(() => {
        ToastAndroid.show('done', ToastAndroid.SHORT);
        reset('Main');
      })
      .catch(() => {
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };

  return (
    <Container>
      <Row>
        <Text>userId: </Text>
        <Input value={userId} onChangeText={setUserId} />
      </Row>
      <Button title="trade" onPress={handleTrade} />
    </Container>
  );
};
