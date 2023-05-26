import { FlatList, View } from 'react-native';
import { useRef, useState } from 'react';
import { FoodLocation } from '../../../constant/fridgeInfo';
import { initialFoodInfo } from '../../../constant/foods';
import { Text } from '../../native-component';
import { useDispatch, useSelector } from '../../../redux/hook';
import { select } from '../../../redux/slice/selectedFoodSlice';
import { getCategory } from '../../../util/getCategory';
import useGetProduct, { HaccpProductType } from '../../../hooks/useGetProduct';
import SearchInput from './SearchInput';
import useDebounce from '../../../hooks/useDebounce';
import HaccpProduct from './HaccpProduct';
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
  const dispatch = useDispatch();

  const deferredKeyword = useDebounce(searchKeyword, 500);
  const { products, isLoading } = useGetProduct(deferredKeyword);

  const flatListRef = useRef<FlatList<HaccpProductType> | null>(null);

  const onHaccpProductPress = (product: HaccpProductType) => {
    const { space, compartmentNum } = foodLocation;

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
      <SearchInput />
      {!isLoading ? (
        !!products?.length &&
        foodLocation && (
          <>
            <Text styletw='pt-4'>
              검색결과: {products && products?.length}개
            </Text>
            <FlatList
              ref={flatListRef}
              keyExtractor={(_, index) => index.toString()}
              style={tw`mt-2`}
              contentContainerStyle={tw`justify-between w-full`}
              data={products}
              ItemSeparatorComponent={() => (
                <View style={tw`border-b border-slate-400`} />
              )}
              renderItem={({ item }: any) => (
                <HaccpProduct
                  key={item.item.imgurl1}
                  product={item}
                  openForm={openForm}
                  selectedFood={selectedFood}
                  onPress={() => onHaccpProductPress(item)}
                  setModalVisible={setModalVisible}
                />
              )}
            />
          </>
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
