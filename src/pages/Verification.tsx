import React from 'react';
import { readNdef } from '@src/utils/nfc';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import { navigate } from '@src/router/navigator';

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

  return (
    <Text>태그를 뒷면에 가져다 대세요.</Text>
  );
};
