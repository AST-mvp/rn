import React from 'react';
import styled from '@emotion/native';
import { Text } from 'react-native';
import { reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';

const Container = styled.View`
  padding: 20px;
`;

const Button = styled.TouchableOpacity`
  padding: 16px;
  width: 200px;
  margin: 8px;
  text-align: center;
  border: 1px solid black;
`;

export default () => {
  const logout = async () => {
    await setToken(null);
    reset('Root');
  };

  return (
    <Container>
      <Button>
        <Text>Login</Text>
      </Button>
      <Button>
        <Text>Check Login</Text>
      </Button>
      <Button>
        <Text>Tag & Check Mine</Text>
      </Button>
      <Button>
        <Text>Transfer</Text>
      </Button>
      <Button>
        <Text>Register</Text>
      </Button>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
};
