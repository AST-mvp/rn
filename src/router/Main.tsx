import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import MyCloset from '@src/pages/MyCloset';
import Verification from '@src/pages/Verification';
import Profile from '@src/pages/Profile';
import Search from '@src/pages/Search';

import dropActiveIcon from '../assets/images/drop-filled.png';
import dropInactiveIcon from '../assets/images/drop-outlined.png';
import searchInactiveIcon from '../assets/images/search-outlined.png';
import verificationInactiveIcon from '../assets/images/verification-outlined.png';
import myclosetActiveIcon from '../assets/images/closet-filled.png';
import myclosetInactiveIcon from '../assets/images/closet-outlined.png';
import profileActiveIcon from '../assets/images/profile-filled.png';
import profileInactiveIcon from '../assets/images/profile-outlined.png';
import { MainTabParamList, Tab } from './navigator';
import Drop from '@src/pages/Drop';
import useTheme from '@src/hooks/theme';

const styles = StyleSheet.create({
  tabSceneContainerStyle: {
    backgroundColor: 'white',
  },
  defaultIcon: {
    width: 24,
    height: 24,
  },
  verificationIcon: {
    width: 56,
    height: 56,
  },
});

const tabBarList: {
  name: keyof MainTabParamList;
  component: React.ComponentType;
  activeIcon: ImageSourcePropType;
  inactiveIcon: ImageSourcePropType;
}[] = [
  {
    name: 'Drop',
    component: Drop,
    activeIcon: dropActiveIcon,
    inactiveIcon: dropInactiveIcon,
  },
  {
    name: 'Search',
    component: Search,
    activeIcon: searchInactiveIcon,
    inactiveIcon: searchInactiveIcon,
  },
  {
    name: 'Verification',
    component: Verification,
    activeIcon: verificationInactiveIcon,
    inactiveIcon: verificationInactiveIcon,
  },
  {
    name: 'MyCloset',
    component: MyCloset,
    activeIcon: myclosetActiveIcon,
    inactiveIcon: myclosetInactiveIcon,
  },
  {
    name: 'Profile',
    component: Profile,
    activeIcon: profileActiveIcon,
    inactiveIcon: profileInactiveIcon,
  },
];

export default () => {
  const { changeTheme } = useTheme();

  useEffect(() => {
    changeTheme({ backgroundColor: 'white' });
  }, [changeTheme]);

  return (
    <Tab.Navigator sceneContainerStyle={styles.tabSceneContainerStyle}>
      {tabBarList.map((page) => (
        <Tab.Screen
          key={page.name}
          name={page.name}
          component={page.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? page.activeIcon : page.inactiveIcon}
                style={
                  page.name !== 'Verification'
                    ? styles.defaultIcon
                    : styles.verificationIcon
                }
                resizeMode="contain"
              />
            ),
            tabBarLabel: page.name === 'Verification' ? '' : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
