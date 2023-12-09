import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import { GRAY, MEDIUM_GRAY } from '../../constant/colors';
import { View } from 'react-native';
import { useDispatch, useSelector } from '../../redux/hook';
import { togglePurchaseState } from '../../redux/slice/purchaseSlice';
import { useHandleAlert } from '../../hooks';
import { SettingInfo } from '../../constant/settingBtns';

import * as RNIap from 'react-native-iap';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  setting: SettingInfo;
}

export default function SettingBox({ setting }: Props) {
  const { purchased } = useSelector((state) => state.purchaseState);

  const { title, navigate, icon } = setting;

  const { setAlert, alertRestoreIAP, alertHasReceipt } = useHandleAlert();

  const navigation = useNavigation<NavigateProp>();

  const dispatch = useDispatch();

  const onRestoreBtnPress = async () => {
    if (purchased) {
      return setAlert(alertHasReceipt);
    }

    const availableProducts = await RNIap.getAvailablePurchases();
    const receipt = availableProducts[0];

    if (receipt?.purchaseToken) {
      dispatch(
        togglePurchaseState({
          purchased: true,
          purchaseToken: receipt.purchaseToken,
        })
      );
    } else {
      setAlert(alertRestoreIAP); // 토큰이 없는 경우
    }
  };

  const onNavigatePress = () => {
    if (navigate !== '') {
      return navigation.navigate(navigate);
    }
  };

  const disabled = title === '버전';

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={title === '복원' ? onRestoreBtnPress : onNavigatePress}
        style={tw`flex-row py-3.5 items-center justify-between`}
      >
        <View style={tw`flex-row items-center gap-1`}>
          <View style={tw`w-7 justify-center items-center`}>
            <Icon
              name={icon}
              color={disabled ? MEDIUM_GRAY : GRAY}
              size={navigate === 'FridgeSetting' ? 18 : 15}
              type={
                navigate === 'FridgeSetting'
                  ? 'MaterialCommunityIcons'
                  : 'Octicons'
              }
            />
          </View>

          <Text style={tw`${disabled ? 'text-gray-500' : 'text-gray-800'}`}>
            {title}
          </Text>
        </View>

        {title === '버전' ? (
          <Text style={tw`text-slate-400`}>1.0.3</Text>
        ) : null}
      </TouchableOpacity>
    </>
  );
}
