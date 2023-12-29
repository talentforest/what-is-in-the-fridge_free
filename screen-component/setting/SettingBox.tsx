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
import IconFridge from '../../components/svg/IconFridge';
import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import tw from 'twrnc';

interface Props {
  setting: SettingInfo;
}

export default function SettingBox({ setting }: Props) {
  const purchase = useSelector((state) => state.purchaseState);

  const { title, navigate, icon } = setting;

  const {
    setAlert,
    alertFailRestoreIAP,
    alertSucessRestoreIAP,
    alertHasReceipt,
    alertInitializeData, //
  } = useHandleAlert();

  const navigation = useNavigation<NavigateProp>();

  const dispatch = useDispatch();

  const onRestorePurchaseBtnPress = async () => {
    if (purchase.purchased) {
      return setAlert(alertHasReceipt);
    }

    try {
      const availableProducts = await RNIap.getAvailablePurchases();
      const receipt = availableProducts[0];

      if (receipt?.purchaseToken) {
        dispatch(
          togglePurchaseState({
            purchased: true,
            purchaseToken: receipt.purchaseToken,
          })
        );
        setAlert(alertSucessRestoreIAP);
      } else {
        setAlert(alertFailRestoreIAP); // 토큰이 없는 경우
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenResetDataAlertPress = async () => {
    setAlert(alertInitializeData);
  };

  const onNavigatePress = () => {
    if (navigate !== '') {
      return navigation.navigate(navigate);
    }
  };

  const disabled =
    title === '버전' || (purchase?.purchased && title === '구매 복원');

  return (
    <>
      {title === '버전' ? (
        <View style={tw`border-t-2 border-gray-200`} />
      ) : null}

      <TouchableOpacity
        disabled={disabled}
        onPress={
          title === '전체 데이터 초기화'
            ? onOpenResetDataAlertPress
            : title === '구매 복원'
            ? onRestorePurchaseBtnPress
            : onNavigatePress
        }
        style={tw`flex-row py-3.5 items-center justify-between`}
      >
        <View style={tw`flex-row items-center gap-1`}>
          <View style={tw`w-7 justify-center items-center`}>
            {icon === 'fridge' ? (
              <IconFridge size={17} color={GRAY} />
            ) : (
              <Icon
                name={icon}
                color={disabled ? MEDIUM_GRAY : GRAY}
                size={15}
                type='Octicons'
              />
            )}
          </View>

          <Text style={tw`${disabled ? 'text-gray-500' : 'text-gray-800'}`}>
            {title}
          </Text>
        </View>

        {title === '버전' ? (
          <Text style={tw`text-slate-400`}>1.0.3</Text>
        ) : null}

        {navigate !== '' ? (
          <IconChevronRight size={16} color={MEDIUM_GRAY} />
        ) : null}
      </TouchableOpacity>
    </>
  );
}
