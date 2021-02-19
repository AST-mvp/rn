import React from 'react';
import { navigate, reset } from '@src/router/navigator';
import { Text } from 'react-native';
import { readNdef } from '@src/utils/nfc';
import { useFocusEffect } from '@react-navigation/native';
import { setToken } from '@src/utils/auth';
import styled from '@emotion/native';

const Button = styled.TouchableOpacity`
  padding: 16px;
  width: 200px;
  margin: 8px;
  text-align: center;
  border: 1px solid black;
`;

export default () => {
  useFocusEffect(() => {
    const readTag = async () => {
      try {
        const nfcId = await readNdef();
        if (!nfcId) {
          readTag();
          return;
        }
        navigate('Detail', { nfcId });
      } catch {
        readTag();
      }
    };
    readTag();
  });

  const handleLogout = async () => {
    await setToken(null);
    reset('Root');
  };

  return (
    <>
      <Text>태그를 가져다대세요</Text>
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </>
  );
};
