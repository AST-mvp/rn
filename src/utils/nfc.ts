import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

export const readNdef = async () => {
  await nfcManager.cancelTechnologyRequest();
  await nfcManager.requestTechnology(NfcTech.Ndef);
  const event = await nfcManager.getNdefMessage();
  if (!event?.ndefMessage?.[0]) {
    await nfcManager.cancelTechnologyRequest();
    return null;
  }
  const text = Ndef.text.decodePayload(
    Uint8Array.from(event.ndefMessage[0].payload),
  );
  return text;
};

export const writeNdef = async (data: string) => {
  await nfcManager.cancelTechnologyRequest();
  await nfcManager.requestTechnology(NfcTech.Ndef);
  const bytes = Ndef.encodeMessage([Ndef.textRecord(data)]);
  await nfcManager.writeNdefMessage(bytes);
  await nfcManager.cancelTechnologyRequest();
};
