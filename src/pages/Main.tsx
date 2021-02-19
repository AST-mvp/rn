import React from 'react';
import { navigate } from '@src/router/navigator';
import { Text } from 'react-native';
import { readNdef } from '@src/utils/nfc';
import { useFocusEffect } from '@react-navigation/native';

export default () => {
  useFocusEffect(() => {
    const readTag = async () => {
      const nfcId = await readNdef();
      if (!nfcId) {
        readTag();
        return;
      }
      navigate('Detail', { nfcId });
    };
    readTag();
  });

  return (
    <>
      <Text>태그를 가져다대세요</Text>
    </>
  );
};
