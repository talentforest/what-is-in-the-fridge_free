import { FlatList, View } from 'react-native';
import { useRef, useState } from 'react';
import { getProducts } from '../../../service/getProductInfo';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { initialFoodInfo } from '../../../constant/foods';
import { Text } from '../../native-component';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from '../../../redux/hook';
import { select } from '../../../redux/slice/selectedFoodSlice';
import { search } from '../../../redux/slice/searchKeywordSlice';
import { foodCategories } from '../../../constant/foodCategories';
import Product, { ProductType } from './Product';
import SearchInput from './SearchInput';
import Form from '../form/Form';
import SubmitBtn from '../form/SubmitBtn';
import useAddSelectFood from '../../../hooks/useAddSelectFood';
import useDebounce from '../../../hooks/useDebounce';
import tw from 'twrnc';

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

  const flatListRef = useRef<FlatList<ProductType> | null>(null);

  const { onChange, onSubmit } = useAddSelectFood();

  const { data, isLoading } = useQuery(
    ['search', deferredKeyword],
    () => getProducts(deferredKeyword),
    { enabled: deferredKeyword !== '' }
  );

  const { space, compartmentNum } = foodLocation;
  const products = data?.body?.items;

  const getCategory = (prdkind: string) => {
    return foodCategories.find((category) => {
      if (prdkind) return category.prdkind.includes(prdkind);
    })?.category;
  };

  const onProductPress = (product: ProductType, index: number) => {
    if (openForm && selectedFood.name === product.item.prdlstNm)
      return setOpenForm(false);

    const { item } = product;
    const food = {
      ...initialFoodInfo,
      image: item.imgurl1,
      name: item.prdlstNm,
      space,
      compartmentNum,
      category: getCategory(product.item.prdkind) || initialFoodInfo.category,
    };

    dispatch(select(food));
    setOpenForm(true);
  };

  return (
    <View
      style={tw`flex-1 border border-t-0 rounded-b-md border-slate-400 bg-white p-4 w-full`}
    >
      <Text styletw='mb-2 text-slate-600 text-xs'>
        HACCP 인증 제품만 검색됩니다.
      </Text>
      <SearchInput />
      {!isLoading ? (
        !!products?.length &&
        foodLocation && (
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.item.prdlstReportNo}
            style={tw`mt-2`}
            contentContainerStyle={tw`justify-between w-full`}
            data={products}
            ItemSeparatorComponent={() => (
              <View style={tw`border-b border-slate-400`} />
            )}
            renderItem={({ item, index }) => (
              <View key={item.item.prdlstReportNo}>
                <Product
                  product={item}
                  openForm={openForm}
                  selectedFood={selectedFood}
                  onPress={() => onProductPress(item, index)}
                />
                {item.item.prdlstNm === selectedFood.name && openForm && (
                  <View style={tw`mb-4`}>
                    <Text styletw='text-indigo-500 mb-2 ml-1'>추가 정보</Text>
                    <View
                      style={tw`border border-slate-400 bg-slate-100 rounded-md p-3 gap-3`}
                    >
                      <Form
                        items={[
                          '카테고리',
                          '구매날짜',
                          '유통기한',
                          '즐겨찾는 식품인가요?',
                        ]}
                        prdkind={item.item.prdkind}
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
            )}
          />
        )
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
    </View>
  );
}
