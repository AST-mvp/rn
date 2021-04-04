import styled from '@emotion/native';
import React from 'react';
import { FlatList } from 'react-native';

const mockData = [
  {
    nfcID: '1001',
    brandID: '1',
    productID: '1',
    editionID: '1',
    manufactureDate: '2020-12-11',
    limited: 0,
    ownerID: '2002',
  },
  {
    nfcID: '1002',
    brandID: '2',
    productID: '2',
    editionID: '2',
    manufactureDate: '2020-09-30',
    limited: 0,
    ownerID: '2002',
  },
  {
    nfcID: '1003',
    brandID: '3',
    productID: '3',
    editionID: '1',
    manufactureDate: '2020-12-11',
    limited: 1,
    ownerID: '1624041530',
  },
  {
    nfcID: '1004',
    brandID: '4',
    productID: '4',
    editionID: '1',
    manufactureDate: '2020-12-11',
    limited: 1,
    ownerID: '2001',
  },
  {
    nfcID: '1005',
    brandID: '5',
    productID: '5',
    editionID: '1',
    manufactureDate: '2021-03-19',
    limited: 0,
    ownerID: '2002',
  },
  {
    nfcID: '1006',
    brandID: '6',
    productID: '6',
    editionID: '1',
    manufactureDate: '2021-03-20',
    limited: 0,
    ownerID: '2001',
  },
  {
    nfcID: '1007',
    brandID: '7',
    productID: '7',
    editionID: '1',
    manufactureDate: '2021-03-20',
    limited: 0,
    ownerID: '2001',
  },
  {
    nfcID: '1008',
    brandID: '8',
    productID: '8',
    editionID: '1',
    manufactureDate: '2021-03-26',
    limited: 1,
    ownerID: '2001',
  },
  {
    nfcID: '1009',
    brandID: '9',
    productID: '9',
    editionID: '1',
    manufactureDate: '2021-03-26',
    limited: 0,
    ownerID: '2002',
  },
];

const ItemContainer = styled.View`
  border: 1px solid black;
`;

const Name = styled.Text``;

const Item: React.FC<typeof mockData[number]> = ({ productID, brandID, manufactureDate }) => (
  <ItemContainer>
    <Name>productID: {productID}</Name>
    <Name>brandID: {brandID}</Name>
    <Name>{manufactureDate}</Name>
  </ItemContainer>
);

export default () => {
  return (
    <FlatList
      data={mockData}
      keyExtractor={({ nfcID }) => nfcID}
      renderItem={({ item }) => <Item {...item} />}
      columnWrapperStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      numColumns={2}
    />
  );
};
