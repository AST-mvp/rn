import { readNdef, writeNdef } from '@src/utils/nfc';
import React, { useState } from 'react';
import { Button, TextInput, ToastAndroid } from 'react-native';

export default () => {
  const [text, setText] = useState('');

  const handleRead = async () => {
    ToastAndroid.show((await readNdef()) ?? 'not found', ToastAndroid.SHORT);
  };

  const handleWrite = async () => {
    await writeNdef(text);
    ToastAndroid.show('done', ToastAndroid.SHORT);
    setText('');
  };

  return (
    <>
      <TextInput value={text} onChangeText={setText} />
      <Button onPress={handleRead} title="read" />
      <Button onPress={handleWrite} title="write" />
    </>
  );
};
