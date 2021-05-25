import React from 'react';
import { navigate, reset } from '@src/router/navigator';
import { Text } from 'react-native';
import { setToken } from '@src/utils/auth';
import styled from '@emotion/native';
import useAuth from '@src/hooks/user';

const Button = styled.TouchableOpacity`
  padding: 16px;
  width: 200px;
  margin: 8px;
  text-align: center;
  border: 1px solid black;
`;

export default () => {
  const { user } = useAuth();

  const handleDrop = () => navigate('Drop');

  const handleVerification = () => navigate('Verification');

  const handleMyCloset = () => navigate('MyCloset');

  const handleLogout = async () => {
    await setToken(null);
    reset('Root');
  };

  const handleTest = () => navigate('TestArea');

  return (
    <>
      {user?.username === 'admin' && (
        <Button onPress={handleDrop}>
          <Text>Drop</Text>
        </Button>
      )}
      <Button onPress={handleVerification}>
        <Text>Verification</Text>
      </Button>
      <Button onPress={handleMyCloset}>
        <Text>My closet</Text>
      </Button>
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </>
  );
};
