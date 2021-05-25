import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacityProps } from 'react-native';

const Container = styled.TouchableOpacity`
  background-color: black;
  border-radius: 5px;
  height: 50px;
  justify-content: center;
`;

const Text = styled.Text<{ color?: string }>`
  text-align: center;
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 14px;
  color: ${({ color }) => color || 'white'};
`;

interface ButtonProps {
  text?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps & TouchableOpacityProps> = ({
  text,
  textColor,
  ...props
}) => {
  return (
    <Container {...props}>
      {text !== undefined && <Text color={textColor}>{text}</Text>}
    </Container>
  );
};

export default Button;
