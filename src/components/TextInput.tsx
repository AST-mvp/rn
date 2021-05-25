import React from 'react';
import styled from '@emotion/native';
import { TextInputProps } from 'react-native';
import colors from '@src/constants/colors';

const Container = styled.TextInput`
  background-color: ${colors.lightGray};
  border-radius: 5px;
  height: 50px;
  padding-left: 20px;
  font-family: 'NanumSquareB';
`;

const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <Container
      {...props}
      placeholderTextColor={props.placeholderTextColor ?? colors.placeholder}
    />
  );
};

export default TextInput;
