import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DropItem from '@src/components/DropItem';
import styled from '@emotion/native';
import { StyleSheet } from 'react-native';
import logoImage from '../assets/images/logoImageTemp.png';
import productImage from '../assets/images/productImageTemp.png';

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
  return (
    <>
      <DropItem
        logoImage={logoImage}
        productImage={productImage}
        subtitle="에어 조던 1 KO"
        title="Chicago"
        description="5월 12일 오전 11시 출시 예정"
        price={139000}
        onClickNotify={() => {}}
      />
      <DropItem
        logoImage={0}
        productImage={0}
        subtitle="에어 조던 1 KO"
        title="Chicago"
        description="5월 12일 오전 11시 출시 예정"
        price={139000}
        onClickNotify={() => {}}
      />
      <DropItem
        logoImage={0}
        productImage={0}
        subtitle="에어 조던 1 KO"
        title="Chicago"
        description="5월 12일 오전 11시 출시 예정"
        price={139000}
        onClickNotify={() => {}}
      />
      <DropItem
        logoImage={0}
        productImage={0}
        subtitle="에어 조던 1 KO"
        title="Chicago"
        description="5월 12일 오전 11시 출시 예정"
        price={139000}
        onClickNotify={() => {}}
      />
    </>
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
