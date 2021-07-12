import React, { useCallback, useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DropItem from '@src/components/DropItem';
import styled from '@emotion/native';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import api from '@src/api';
import { Product } from '@src/constants/types';
import logoImage from '../assets/images/logoImageTemp.jpg';
import productImage from '../assets/images/productImageTemp.jpg';

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: 'black',
  },
  tabbar: {
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
  },
});

const HeaderContainer = styled.View`
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  font-family: 'Road Rage';
`;

const Banner = styled.View`
  background-color: #000;
  height: 200px;
`;

const Ongoing = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/products').then((res) => setProducts(res.data.products));
    }, []),
  );

  return (
    <FlatList
      data={products}
      listKey="nfcID"
      keyExtractor={(item) => item.nfcID}
      renderItem={({ item }) => (
        <DropItem
          logoImage={logoImage}
          productImage={productImage}
          subtitle="에어 조던 1 KO"
          title={item.productID}
          description="5월 12일 오전 11시 출시 예정"
          price={139000}
          onClickNotify={() => {}}
        />
      )}
    />
  );
};

const Drop = () => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <HeaderContainer>
        <HeaderTitle>AST</HeaderTitle>
      </HeaderContainer>
      <Banner />
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor="black"
            inactiveColor="#b2b2b2"
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
          />
        )}
        navigationState={{
          index,
          routes: [
            { key: 'ongoing', title: '진행 중' },
            { key: 'ready', title: '발매 예정' },
            { key: 'history', title: '지난 발매' },
          ],
        }}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          ongoing: Ongoing,
          ready: Ongoing,
          history: Ongoing,
        })}
      />
    </>
  );
};
export default Drop;
