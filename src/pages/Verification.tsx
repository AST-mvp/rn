import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '@src/router/navigator';
import useTheme from '@src/hooks/theme';
import styled from '@emotion/native';

import alertOutlined from '../assets/images/alert-outlined.png';
import readyVerificationImage from '../assets/images/verification-ready.png';
import doneVerificationImage from '../assets/images/verification-done.png';
import failVerificationImage from '../assets/images/verification-fail.png';
import { readNdef } from '@src/utils/nfc';

const Container = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
`;

const StatusText = styled.Text`
  font-family: 'NEXON Lv1 Gothic OTF Bold';
  font-size: 16px;
  color: white;
  margin: 100px 0 15px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
`;

const InfoIcon = styled.Image`
  width: 10px;
  height: 10px;
`;

const InfoText = styled.Text`
  margin-left: 10px;
  font-family: 'NEXON Lv1 Gothic OTF';
  font-size: 10px;
  color: #9a9a9a;
`;

const StatusWrapper = styled.View`
  position: absolute;
  justify-content: center;
  top: 0;
  bottom: 0;
`;

const StatusImage = styled.Image`
  height: 320px;
  width: 320px;
`;

const RetryContainer = styled.View``;

const RetryText = styled.Text``;

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

const getInfoText = (status: Status) => {
  if (status === 'ready') {
    return '스캔되지 않는다면 기기 설정에서 NFC를 켜주세요';
  }
  if (status === 'fail') {
    return '왜 알 수 없는 태그라고 뜨나요?';
  }
  return '';
};

const StatusIcon: React.FC<{ status: Status }> = ({ status }) => (
  <StatusImage
    source={
      status === 'ready'
        ? readyVerificationImage
        : status === 'done'
        ? doneVerificationImage
        : failVerificationImage
    }
  />
);

export default () => {
  const { changeTheme, resetTheme } = useTheme();
  const [status, setStatus] = useState<Status>('ready');

  useFocusEffect(
    useCallback(() => {
      setStatus('ready');
      changeTheme({ backgroundColor: 'black', bottomColor: 'white' });
      return resetTheme;
    }, [changeTheme, resetTheme]),
  );

  useFocusEffect(
    useCallback(() => {
      let canceled = false;
      const readTag = async () => {
        try {
          const nfcId = await readNdef();
          if (!nfcId) {
            readTag();
            return;
          }
          if (canceled) {
            return;
          }
          setStatus('done');
          navigate('Detail', { nfcId });
        } catch {
          if (canceled) {
            return;
          }
          setStatus('fail');
        }
      };
      readTag();
      return () => {
        canceled = true;
      };
    }, []),
  );

  return (
    <Container>
      <StatusText>{getStatusText(status)}</StatusText>
      {getInfoText(status) ? (
        <InfoContainer>
          <InfoIcon source={alertOutlined} />
          <InfoText>{getInfoText(status)}</InfoText>
        </InfoContainer>
      ) : null}
      <StatusWrapper>
        <StatusIcon status={status} />
      </StatusWrapper>
      {status === 'fail' && (
        <RetryContainer>
          <RetryText>다시 시도하기</RetryText>
        </RetryContainer>
      )}
    </Container>
  );
};
