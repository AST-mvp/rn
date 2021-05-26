import styled from '@emotion/native';
import { useFocusEffect } from '@react-navigation/core';
import useTheme from '@src/hooks/theme';
import React, { useCallback } from 'react';
import searchIcon from '../assets/images/search-outlined.png';

const HeaderContainer = styled.View`
  background-color: black;
  height: 60px;
  padding: 10px 20px;
`;

const SearchContainer = styled.View`
  background-color: white;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 0 15px;
`;

const TextInput = styled.TextInput`
  flex: 1;
`;

const SearchIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

const Search = () => {
  const { changeTheme, resetTheme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      changeTheme({
        backgroundColor: 'white',
        topColor: 'black',
      });
      return resetTheme;
    }, [changeTheme, resetTheme]),
  );
  return (
    <>
      <HeaderContainer>
        <SearchContainer>
          <TextInput />
          <SearchIcon source={searchIcon} />
        </SearchContainer>
      </HeaderContainer>
    </>
  );
};

export default Search;
