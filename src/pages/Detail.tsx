import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@src/router/navigator';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

export default ({ route: { params: { nfcId }}}: Props) => {
  console.log(nfcId);
  return null;
};
