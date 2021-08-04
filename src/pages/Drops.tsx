import React, { useCallback, useState, useRef } from 'react';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import DropItem from '@src/components/DropItem';
import styled from '@emotion/native';
import {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import api from '@src/api';
import { Product } from '@src/constants/types';
import logoImage from '../assets/images/logoImageTemp.jpg';
import productImage from '../assets/images/productImageTemp.jpg';
import moveToTopImage from '../assets/images/move-top.png';
import { DropsStack, navigate } from '@src/router/navigator';
import DropDetail from './DropDetail';

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: 'black',
  },
  label: {
    fontWeight: 'bold',
  },
  headerContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 20,
  },
});

const HeaderContainer = styled.View`
  height: 60px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: white;
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  font-family: 'Road Rage';
`;

const BannerContainer = styled.View`
  background-color: #000;
  height: 200px;
`;

const BodyContainer = styled.View`
  flex: 1;
`;

const MoveToTopWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const MoveToTopIcon = styled.Image`
  width: 35px;
  height: 35px;
`;

const Header = () => <BannerContainer pointerEvents="none" />;

const Container = styled.View`
  flex: 1;
  height: 100%;
`;

const Ongoing = (props: Partial<FlatListProps<Product>>) => {
  const [products, setProducts] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      api
        .get<{ products: Product[] }>('/products')
        .then((res) =>
          setProducts(
            res.data.products.reduce(
              (prev, curr) =>
                prev.find((p) => p.nfcID === curr.nfcID)
                  ? prev
                  : [...prev, curr],
              [] as Product[],
            ),
          ),
        );
    }, []),
  );

  return (
    <Tabs.FlatList
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
          onClickProduct={() =>
            navigate('DropDetail', {
              nfcId: item.nfcID,
            })
          }
        />
      )}
      {...props}
    />
  );
};

const DropsList = () => {
  const ref = useRef<CollapsibleRef>();
  const [showingMoveToTop, setShowingMoveToTop] = useState(false);
  const moveToTop = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current?.setIndex(ref.current.getCurrentIndex());
  }, []);
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) =>
      setShowingMoveToTop(
        event.nativeEvent.contentOffset.y > (Platform.OS === 'ios' ? 30 : 230),
      ),
    [],
  );
  return (
    <Container>
      <BodyContainer>
        <Tabs.Container
          renderHeader={Header}
          headerContainerStyle={styles.headerContainer}
          ref={ref}
          renderTabBar={(props) => (
            <MaterialTabBar
              {...props}
              inactiveColor="#b2b2b2"
              activeColor="#000"
              indicatorStyle={styles.indicator}
              labelStyle={styles.label}
            />
          )}>
          <Tabs.Tab name="ongoing" label="진행 중">
            <Ongoing
              onScroll={undefined}
              onScrollEndDrag={onScroll}
              onMomentumScrollEnd={onScroll}
            />
          </Tabs.Tab>
          <Tabs.Tab name="ready" label="발매 예정">
            <Ongoing
              onScroll={undefined}
              onScrollEndDrag={onScroll}
              onMomentumScrollEnd={onScroll}
            />
          </Tabs.Tab>
          <Tabs.Tab name="history" label="지난 발매">
            <Ongoing
              onScroll={undefined}
              onScrollEndDrag={onScroll}
              onMomentumScrollEnd={onScroll}
            />
          </Tabs.Tab>
        </Tabs.Container>
        {showingMoveToTop && (
          <MoveToTopWrapper onPress={moveToTop}>
            <MoveToTopIcon source={moveToTopImage} />
          </MoveToTopWrapper>
        )}
      </BodyContainer>
    </Container>
  );
};

const Drops = () => {
  return (
    <>
      <HeaderContainer>
        <HeaderTitle>AST</HeaderTitle>
      </HeaderContainer>
      <DropsStack.Navigator
        initialRouteName="DropsList"
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>
        <DropsStack.Screen name="DropsList" component={DropsList} />
        <DropsStack.Screen name="DropDetail" component={DropDetail} />
      </DropsStack.Navigator>
    </>
  );
};
export default Drops;
