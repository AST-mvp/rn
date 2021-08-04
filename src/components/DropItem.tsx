import React from 'react';
import styled from '@emotion/native';
import { GestureResponderEvent, ImageSourcePropType, View } from 'react-native';
import Button from './Button';

const Container = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const ProductImage = styled.Image`
  width: 170px;
  height: 170px;
`;

const LogoImage = styled.Image`
  width: 180px;
  height: 20px;
  margin-bottom: 15px;
`;

const SubTitle = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 10px;
  margin-bottom: 4px;
`;

const Title = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 20px;
  margin-bottom: 12px;
`;

const Price = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 12px;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF';
  font-size: 12px;
  margin-bottom: 16px;
`;

const NotifyButton = styled(Button)`
  height: 30px;
`;

interface DropItemProps {
  productImage: ImageSourcePropType;
  logoImage: ImageSourcePropType;
  subtitle: string;
  title: string;
  price: number;
  description: string;
  onClickNotify: (event: GestureResponderEvent) => void;
  onClickProduct: (event: GestureResponderEvent) => void;
}

const DropItem: React.FC<DropItemProps> = ({
  productImage,
  logoImage,
  subtitle,
  title,
  price,
  description,
  onClickNotify,
  onClickProduct,
}) => (
  <Container onPress={onClickProduct}>
    <ProductImage source={productImage} />
    <View>
      <LogoImage source={logoImage} resizeMode="contain" />
      <SubTitle>{subtitle}</SubTitle>
      <Title>{title}</Title>
      <Price>{`₩ ${price
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Price>
      <Description>{description}</Description>
      <NotifyButton onPress={onClickNotify} text="Notify Me" />
    </View>
  </Container>
);

export default DropItem;
