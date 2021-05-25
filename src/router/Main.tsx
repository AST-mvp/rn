import React from 'react';
import Drop from '@src/pages/Drop';
import { Tab } from './navigator';
import MyCloset from '@src/pages/MyCloset';
import Verification from '@src/pages/Verification';
import { StyleSheet } from 'react-native';
import Profile from '@src/pages/Profile';
import Search from '@src/pages/Search';

const styles = StyleSheet.create({
  tabSceneContainerStyle: {
    backgroundColor: 'white',
  },
});

export default () => (
  <Tab.Navigator sceneContainerStyle={styles.tabSceneContainerStyle}>
    <Tab.Screen name="Drop" component={Drop} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Verification" component={Verification} />
    <Tab.Screen name="MyCloset" component={MyCloset} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
