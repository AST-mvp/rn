import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return null;
  }
  return { token };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export const setToken = async (token: ThenArg<ReturnType<typeof getToken>>) => {
  if (token) {
    await AsyncStorage.setItem('token', token.token);
    return;
  }
  await AsyncStorage.removeItem('token');
};
