import React from 'react';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { DropsStackParamList } from '@src/router/navigator';
import productImage from '../assets/images/productImageTemp.jpg';
import logoImage from '../assets/images/logoImageTemp.jpg';

type Props = {
  route: RouteProp<DropsStackParamList, 'DropDetail'>;
};

const Container = styled.View`
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
`;

const LogoImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 15px;
`;

const SubTitle = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 12px;
  margin-bottom: 5px;
`;

const Title = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 30px;
  margin-bottom: 30px;
`;

const CountDownContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CountDownText = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 10px;
  margin: 0 10px;
`;

const DropDetail = ({
  route: {
    params: { product },
  },
}: Props) => {
  return (
    <Container>
      <ProductImage source={productImage} />
      <LogoImage source={logoImage} />
      <SubTitle>{'조던 자이언 1'}</SubTitle>
      <Title>{product.nfcID}</Title>
      <CountDownContainer>
        <CountDownText>H</CountDownText>
        <CountDownText>M</CountDownText>
        <CountDownText>남음</CountDownText>
      </CountDownContainer>
    </Container>
  );
};

export default DropDetail;
