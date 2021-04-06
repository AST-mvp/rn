import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import api from '@src/api';
import { RootStackParamList } from '@src/router/navigator';
import { Text } from 'react-native';
import { Product } from '@src/constants/types';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'>;
};

export default ({
  route: {
    params: { nfcId },
  },
}: Props) => {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    api.get(`/products/${nfcId}`).then(({ data }) => setProduct(data.result));
  }, [nfcId]);
  return (
    <>
      <Text>{JSON.stringify(product)}</Text>
    </>
  );
};
