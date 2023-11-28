import { Button, View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { changeNoLimit } from '../../redux/slice/limitSlice';
import { useDispatch } from '../../redux/hook';

import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { requestPurchase, useIAP, withIAPContext } from 'react-native-iap';
import { useEffect } from 'react';

const PaymentBtn = () => {
  const dispatch = useDispatch();

  const {
    connected,
    products,
    subscriptions,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
  } = useIAP();

  useEffect(() => {
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  // console.log(initConnectionError, 'con');

  useEffect(() => {
    // ... listen to currentPurchase, to check if the purchase went through
    // console.log(currentPurchase);
  }, [currentPurchase]);

  const ID = 'com.ellie0501.whatisinmyfridge_test';

  return (
    <>
      <Button
        title='Get the products'
        onPress={() => {
          getProducts({
            skus: [ID],
          }).then((res) => {
            console.log(res, '상품 응답');
          });
        }}
      />
      <TouchableOpacity
        onPress={() => {
          console.log(availablePurchases);
          console.log('이용권 구매');
        }}
        style={tw.style(
          `bg-blue-50 border border-blue-200 py-3.5 px-4 rounded-2xl`,
          shadowStyle(15)
        )}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`items-center`}>
              <Icon name='unlock' type='Octicons' size={20} />
            </View>
            <Text fontSize={17} style={tw`text-blue-700`}>
              식료품 개수 한도 해제 버튼
            </Text>
          </View>

          <View style={tw`flex-row items-center`}>
            <Text style={tw.style(`text-sm`, { fontFamily: 'LocusSangSang' })}>
              ₩
            </Text>
            <Text fontSize={17}> 2,000</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default withIAPContext(PaymentBtn);
