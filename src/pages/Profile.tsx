import Button from '@src/components/Button';
import { reset } from '@src/router/navigator';
import { setToken } from '@src/utils/auth';
import React from 'react';

const Profile = () => {
  const handleLogout = async () => {
    await setToken(null);
    reset('Root');
  };

  return <Button onPress={handleLogout} text="logout" />;
};

export default Profile;
