import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import api from '@src/api';
import { RootStackParamList } from '@src/router/navigator';
import { Text } from 'react-native';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

export default ({ route: { params: { nfcId }}}: Props) => {
  const [st, setSt] = useState('');
  useEffect(() => {
    api.get(`/products/${nfcId}`).then(({ data }) => setSt(data.result));
  }, [nfcId]);
  return <Text>{JSON.stringify(st)}</Text>;
};
