import { View } from 'react-native';
import { Text } from '../components/common/native-component';
import { LIGHT_BLUE } from '../constant/colors';
import { shadowStyle } from '../constant/shadowStyle';
import { useDispatch, useSelector } from '../redux/hook';
import { settingBtns } from '../constant/settingBtns';
import { PlatformIOS } from '../constant/statusBarHeight';

import Container from '../components/common/Container';
import SettingBox from '../screen-component/setting/SettingBox';
import PaymentBtn from '../screen-component/setting/PaymentBtn';
import Icon from '../components/common/native-component/Icon';
import AlertModal from '../screen-component/modal/AlertModal';
import tw from 'twrnc';
import { useEffect } from 'react';
import { togglePurchaseState } from '../redux/slice/purchaseSlice';

export default function Setting() {
  const { purchased } = useSelector((state) => state.purchaseState);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(togglePurchaseState({ purchased: false, purchaseToken: null }));
  // }, []);

  return (
    <Container topPadding>
      <View style={tw`gap-3`}>
        {!purchased && !PlatformIOS ? (
          <View
            style={tw.style(
              `border border-blue-100 bg-white rounded-xl py-4 px-3.5`,
              shadowStyle(3)
            )}
          >
            <View style={tw`flex-row items-center gap-1 mb-1.5`}>
              <Icon
                name='credit-card'
                type='Octicons'
                color={LIGHT_BLUE}
                size={19}
              />
              <Text fontSize={18}>이용권 구매</Text>
            </View>
            <Text fontSize={15} style={tw`text-slate-600 mb-2 leading-4`}>
              이용권을 한번만 구매하면 식료품을 계속 무제한으로 저장할 수 있어요
            </Text>

            <PaymentBtn />
          </View>
        ) : null}

        <View>
          {settingBtns.map((setting) => (
            <SettingBox key={setting.title} setting={setting} />
          ))}
        </View>
      </View>
      <AlertModal />
    </Container>
  );
}
