import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import api from '@src/api';
import { navigate, RootStackParamList } from '@src/router/navigator';
import { Button, Text } from 'react-native';
import { Product } from '@src/constants/types';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'>;
};

export default ({
  route: {
    params: { nfcId },
  },
}: Props) => {
  const [product, setProduct] = useState<Product | null>();
  useEffect(() => {
    api
      .get(`/products/${nfcId}`)
      .then(({ data }) => setProduct(data.result))
      .catch(() => setProduct(null));
  }, [nfcId]);

  const handleTrade = () => navigate('Trade', { nfcId });

  return product === undefined ? null : product === null ? (
    <Text>찾을 수 없습니다.</Text>
  ) : (
    <>
      <Text>brand: {product.brandID}</Text>
      <Text>product: {product.productID}</Text>
      <Text>{product.manufactureDate}</Text>
      <Button title="trade" onPress={handleTrade} />
    </>
  );
};
