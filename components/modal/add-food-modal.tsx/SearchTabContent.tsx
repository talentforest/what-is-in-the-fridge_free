import { ScrollView, View } from 'react-native';
import { useDeferredValue, useState } from 'react';
import { getProducts } from '../../../service/getProductInfo';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { initialFoodInfo } from '../../../constant/foods';
import { Text } from '../../native-component';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from '../../../redux/hook';
import { select } from '../../../redux/slice/selectedFoodSlice';
import { search } from '../../../redux/slice/searchKeywordSlice';
import SearchInput from './SearchInput';
import Product, { ProductType } from './Product';
import Form from '../form/Form';
import SubmitBtn from '../form/SubmitBtn';
import useAddSelectFood from '../../../hooks/useAddSelectFood';
import tw from 'twrnc';
import useDebounce from '../../../hooks/useDebounce';

interface Props {
  foodLocation: FoodLocation;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function SearchTabContent({
  foodLocation,
  setModalVisible,
}: Props) {
  const [openForm, setOpenForm] = useState(false);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { searchKeyword } = useSelector((state) => state.searchKeyword);
  const deferredKeyword = useDebounce(searchKeyword, 800);
  const dispatch = useDispatch();

  const { onChange, onSubmit } = useAddSelectFood();

  const { data, isLoading } = useQuery(
    ['search', deferredKeyword],
    () => getProducts(deferredKeyword),
    { enabled: deferredKeyword !== '' }
  );

  const { space, compartmentNum } = foodLocation;
  const products = data?.body?.items;

  const onProductPress = (product: ProductType) => {
    const { item } = product;
    const food = {
      ...initialFoodInfo,
      image: item.imgurl1,
      name: item.prdlstNm,
      space,
      compartmentNum,
    };

    dispatch(select(food));
    setOpenForm(true);
  };

  return (
    <View
      style={tw`flex-1 border border-t-0 rounded-b-md border-slate-400 bg-white p-4 w-full`}
    >
      <SearchInput />
      <ScrollView
        style={tw`mt-2`}
        contentContainerStyle={tw`justify-between w-full`}
      >
        {!isLoading ? (
          !!products?.length &&
          foodLocation &&
          products?.map((product: ProductType) => (
            <View key={product.item.prdlstReportNo}>
              <Product
                product={product}
                selectedFood={selectedFood}
                onPress={onProductPress}
              />
              {product.item.prdlstNm === selectedFood.name && openForm && (
                <View style={tw`mb-4`}>
                  <Text styletw='text-indigo-500 mb-2 ml-1'>추가 정보</Text>
                  <View
                    style={tw`border border-slate-400 bg-slate-100 rounded-md p-3 gap-3`}
                  >
                    <Form
                      items={[
                        '구매날짜',
                        '카테고리',
                        '유통기한',
                        '즐겨찾는 식품인가요?',
                      ]}
                      food={selectedFood}
                      changeInfo={onChange}
                    />
                    <SubmitBtn
                      btnName='식료품 정보 추가하기'
                      onPress={() => {
                        onSubmit();
                        setModalVisible(false);
                        dispatch(search(''));
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text styletw='text-slate-500 text-center mt-20'>로딩중...</Text>
        )}

        {!isLoading && searchKeyword && !!!products?.length && (
          <Text styletw='text-slate-500 text-center mt-20'>
            검색 결과가 없습니다.
          </Text>
        )}

        {!searchKeyword && (
          <Text styletw='text-slate-500 text-center mt-20'>
            검색어를 작성해주세요.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
