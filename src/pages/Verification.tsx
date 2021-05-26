import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Text } from 'react-native';
import { navigate } from '@src/router/navigator';
import useTheme from '@src/hooks/theme';

export default () => {
  const { changeTheme, resetTheme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      changeTheme({ backgroundColor: 'black' });
      return () => {
        console.log('sssssss');
        resetTheme();
      };
    }, [changeTheme, resetTheme]),
  );
  // useFocusEffect(() => {
  //   const readTag = async () => {
  //     try {
  //       const nfcId = await readNdef();
  //       if (!nfcId) {
  //         readTag();
  //         return;
  //       }
  //       navigate('Detail', { nfcId });
  //     } catch {
  //       readTag();
  //     }
  //     console.log('test');
  //   };
  //   readTag();
  // });

  const handleTestButton = () => navigate('Detail', { nfcId: '1001' });

  return (
    <>
      <Text>태그를 뒷면에 가져다 대세요.</Text>
      <Button title="test" onPress={handleTestButton} />
    </>
  );
};
