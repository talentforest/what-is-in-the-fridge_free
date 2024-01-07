import { useEffect } from 'react';
import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useDispatch } from '../../redux/hook';
import { BLUE, GRAY, LIGHT_GRAY } from '../../constant/colors';
import { KotraHope } from '../../constant/fonts';
import { shadowStyle } from '../../constant/shadowStyle';
import { requestPurchase, useIAP, withIAPContext } from 'react-native-iap';
import { useHandleAlert } from '../../hooks';
import { togglePurchaseState } from '../../redux/slice/purchaseSlice';

import * as RNIap from 'react-native-iap';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

const skus = ['com.ellie0501.whatisinmyfridge_test'];

const PaymentBtn = () => {
  const dispatch = useDispatch();

  const { setAlert, alertSucessRestoreIAP, alertIAP } = useHandleAlert();

  const {
    connected,
    getProducts,
    currentPurchase,
    finishTransaction, //
  } = useIAP();

  useEffect(() => {
    const checkCurrentPurchase = async (
      purchase: RNIap.Purchase
    ): Promise<void> => {
      if (purchase?.transactionReceipt && connected) {
        try {
          const receipt = {
            purchase,
            isConsumable: false,
            developerPayloadAndroid: '',
          };
          const ackResult = await finishTransaction(receipt);
          if ((ackResult as RNIap.PurchaseResult)?.code === 'OK') {
            switchPurchasedState(purchase.purchaseToken); //구매 상태로 전환
          }
        } catch {
          setAlert(alertIAP);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  const switchPurchasedState = (purchaseToken: string) => {
    return dispatch(togglePurchaseState({ purchased: true, purchaseToken }));
  };

  const handleBuyBtn = async () => {
    try {
      await getProducts({ skus });
      await requestPurchase({ skus });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TouchableOpacity
        disabled={!connected}
        onPress={handleBuyBtn}
        style={tw.style(
          `border ${
            connected
              ? 'bg-amber-200 border-amber-400'
              : 'bg-gray-50 border-gray-300'
          } py-3.5 px-4 rounded-2xl`,
          shadowStyle(3)
        )}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Icon
              name='unlock'
              type='Octicons'
              size={20}
              color={connected ? BLUE : LIGHT_GRAY}
            />
            <Text
              fontSize={18}
              style={tw`${connected ? 'text-blue-600' : 'text-gray-400'}`}
            >
              무제한 저장 이용권 구매
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-0.5`}>
            <Text
              fontSize={18}
              style={tw.style(
                `${connected ? 'text-blue-600' : 'text-gray-400'}`,
                { fontFamily: KotraHope }
              )}
            >
              ₩
            </Text>
            <Text
              fontSize={18}
              style={tw`${connected ? 'text-blue-600' : 'text-gray-400'}`}
            >
              2,000
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {!connected ? (
        <View style={tw`flex-row items-start mt-3 gap-1`}>
          <View style={tw`mt-0.5`}>
            <Icon
              name='information-outline'
              type='MaterialCommunityIcons'
              size={15}
              color={GRAY}
            />
          </View>

          <Text fontSize={15} style={tw`text-slate-600 flex-1 leading-5`}>
            연결 오류로 인해 구매 버튼이 활성화되지 않았어요. 잠시 후 다시
            시도해주세요.
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default withIAPContext(PaymentBtn);
