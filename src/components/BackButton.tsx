import React from 'react';
import styled from '@emotion/native';
import { GestureResponderEvent, Image } from 'react-native';
import backImage from '../assets/images/back.png';

const Container = styled.TouchableOpacity``;

interface BackButtonProps {
  onClick: (event: GestureResponderEvent) => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Container onPress={onClick}>
      <Image source={backImage} />
    </Container>
  );
};

export default BackButton;
