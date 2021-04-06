import styled from '@emotion/native';
import { useFocusEffect } from '@react-navigation/core';
import api from '@src/api';
import { Product } from '@src/constants/types';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

const ItemContainer = styled.View`
  border: 1px solid black;
`;

const Name = styled.Text``;

const styles = StyleSheet.create({
  columnWrapperStyle: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
});

const Item: React.FC<Product> = ({ productID, brandID, manufactureDate }) => (
  <ItemContainer>
    <Name>product: {productID}</Name>
    <Name>brand: {brandID}</Name>
    <Name>{manufactureDate}</Name>
  </ItemContainer>
);

export default () => {
  const [myCloset, setMyCloset] = useState<Product[]>([]);
  useFocusEffect(() => {
    api.get('/closet').then((res) => setMyCloset(res.data.result));
  });

  return (
    <FlatList
      data={myCloset}
      keyExtractor={({ nfcID }) => nfcID}
      renderItem={({ item }) => <Item {...item} />}
      columnWrapperStyle={styles.columnWrapperStyle}
      numColumns={2}
    />
  );
};
