import Button from '@src/components/Button';
import styled from '@emotion/native';
import useAuth from '@src/hooks/user';
import { navigate, reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';
import React from 'react';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const LogOut = styled.View`
  marginTop: 160%;
`;

const AdminDrop = styled.View`
  marginTop: 1.5%;
`;

const Profile = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await setToken(null);
    reset('Root');
  };

  const handleAdminDrop = async () => {
    navigate('AdminDrop');
  };

  return (
    <Container>
      <LogOut>
        <Button onPress={handleLogout} text="logout" />
      </LogOut>
      <AdminDrop>
        {user?.username === 'admin' && (
        <Button onPress={handleAdminDrop} text="admin drop" />
        )}
      </AdminDrop>
    </Container>
  );
};

export default Profile;
