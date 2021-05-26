import Button from '@src/components/Button';
import useAuth from '@src/hooks/user';
import { navigate, reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';
import React from 'react';

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
    <>
      <Button onPress={handleLogout} text="logout" />
      {user?.username === 'admin' && (
        <Button onPress={handleAdminDrop} text="admin drop" />
      )}
    </>
  );
};

export default Profile;
