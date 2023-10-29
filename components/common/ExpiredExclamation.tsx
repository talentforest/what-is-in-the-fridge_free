import { View } from 'react-native';
import { expired, getDiffDate } from '../../util';
import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  size?: number;
}

export default function ExpiredExclamation({ expiredDate, size = 16 }: Props) {
  return (
    <>
      {expired(expiredDate) ? (
        <View style={tw`-mx-1`}>
          <Icon
            name='exclamation-thick'
            type='MaterialCommunityIcons'
            color='red'
            size={size}
          />
        </View>
      ) : getDiffDate(expiredDate) === 0 ? (
        <View style={tw`-mx-1`}>
          <Icon
            name='exclamation-thick'
            type='MaterialCommunityIcons'
            color='amber'
            size={size}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
