import React from 'react';
import { StyleSheet } from 'react-native';
import { FlipNumber } from 'react-native-flip-countdown-timer';
import { useState } from 'react';
import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { DropsStackParamList } from '@src/router/navigator';
import dayjs from 'dayjs';
import productImage from '../assets/images/productImageTemp.jpg';
import logoImage from '../assets/images/logoImageTemp.jpg';
import { useLayoutEffect } from 'react';
import { useCallback } from 'react';

type Props = {
  route: RouteProp<DropsStackParamList, 'DropDetail'>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#9a9a9a',
    borderWidth: 0.5,
    padding: 0,
  },
  number: {
    color: '#000',
    fontFamily: 'Gong Gothic OTF',
  },
  numberWrapper: {
    shadowOpacity: 0,
    elevation: 0,
    borderColor: '#9a9a9a',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

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
  const [time, setTime] = useState(61773);
  const duration = dayjs.duration(time, 's');

  useLayoutEffect(
    useCallback(() => {
      const timer = setInterval(() => setTime((t) => t - 1), 1e3);
      return () => {
        clearInterval(timer);
      };
    }, []),
  );

  return (
    <Container>
      <ProductImage source={productImage} />
      <LogoImage source={logoImage} />
      <SubTitle>{'조던 자이언 1'}</SubTitle>
      <Title>{product.nfcID}</Title>
      <CountDownContainer>
        <FlipNumber
          number={duration.hours() + 1}
          size={45}
          cardStyle={styles.card}
          flipCardStyle={styles.card}
          numberStyle={styles.number}
          numberWrapperStyle={styles.numberWrapper}
        />
        <CountDownText>H</CountDownText>
        <FlipNumber
          number={duration.minutes() + 1}
          size={45}
          cardStyle={styles.card}
          flipCardStyle={styles.card}
          numberStyle={styles.number}
          numberWrapperStyle={styles.numberWrapper}
        />
        <CountDownText>M</CountDownText>
        <FlipNumber
          number={duration.seconds()}
          size={45}
          cardStyle={styles.card}
          flipCardStyle={styles.card}
          numberStyle={styles.number}
          numberWrapperStyle={styles.numberWrapper}
        />
        <CountDownText>남음</CountDownText>
      </CountDownContainer>
    </Container>
  );
};

export default DropDetail;
