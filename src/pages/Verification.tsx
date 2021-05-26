import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native';
import { navigate } from '@src/router/navigator';
import useTheme from '@src/hooks/theme';
import styled from '@emotion/native';

const Container = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
`;

const StatusText = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 16px;
  color: white;
`;

type Status = 'ready' | 'done' | 'fail';

const getStatusText = (status: Status) => {
  if (status === 'ready') {
    return '심플 태그를 스캔해주세요';
  }
  if (status === 'done') {
    return '심플 태그 정품입니다';
  }
  return '알 수 없는 태그입니다';
};

export default () => {
  const { changeTheme, resetTheme } = useTheme();
  const [status, setStatus] = useState<Status>('ready');

  useFocusEffect(
    useCallback(() => {
      changeTheme({ backgroundColor: 'black', bottomColor: 'white' });
      return resetTheme;
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
    <Container>
      <StatusText>{getStatusText(status)}</StatusText>
      <Button title="test" onPress={handleTestButton} />
    </Container>
  );
};
