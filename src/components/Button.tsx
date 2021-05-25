import React from 'react';
import styled from '@emotion/native';
import { ImageSourcePropType, TouchableOpacityProps } from 'react-native';

const Container = styled.TouchableOpacity`
  background-color: black;
  border-radius: 5px;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Text = styled.Text<{ color?: string }>`
  text-align: center;
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 14px;
  color: ${({ color }) => color ?? 'white'};
`;

const PrefixImage = styled.Image`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 20px;
`;

interface ButtonProps {
  text?: string;
  textColor?: string;
  prefixImage?: ImageSourcePropType;
}

const Button: React.FC<ButtonProps & TouchableOpacityProps> = ({
  text,
  textColor,
  prefixImage,
  ...props
}) => {
  return (
    <Container {...props}>
      <>
        {prefixImage !== undefined && <PrefixImage source={prefixImage} />}
        {text !== undefined && <Text color={textColor}>{text}</Text>}
      </>
    </Container>
  );
};

export default Button;
