import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import api from '@src/api';
import { navigate, RootStackParamList } from '@src/router/navigator';
import { Button, Text } from 'react-native';
import { Product } from '@src/constants/types';
import styled from '@emotion/native';
import useAuth from '@src/hooks/user';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'>;
};

const Row = styled.View`
  flex-direction: row;
`;

export default ({
  route: {
    params: { nfcId },
  },
}: Props) => {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>();
  useEffect(() => {
    api
      .get(`/products/${nfcId}`)
      .then(({ data }) => setProduct(data.products))
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
      {user?.username === 'test3' ? (
        <>
          <Text>제품 거래</Text>
          <Row>
            <Button onPress={() => {}} title="확인" />
            <Button onPress={() => {}} title="취소" />
          </Row>
        </>
      ) : (
        <Button title="trade" onPress={handleTrade} />
      )}
    </>
  );
};
