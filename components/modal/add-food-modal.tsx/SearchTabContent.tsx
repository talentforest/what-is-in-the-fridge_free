import { ActivityIndicator, FlatList, View } from 'react-native';
import { memo, useState } from 'react';
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
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useGetProduct(deferredKeyword);

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

  const loadDataMore = () => {
    fetchNextPage();
  };

  const productList = data?.pages
    ?.map?.((row) => row?.pages?.body)
    ?.map((row) => row?.items)
    ?.flat();

  const totalCount = data?.pages?.[0]?.pages?.body?.totalCount;

  return (
    <View
      style={tw`flex-1 border border-t-0 rounded-b-md border-slate-400 bg-white p-3 w-full`}
    >
      <SearchInput />
      <Text styletw='text-slate-500 mt-2' onPress={() => fetchNextPage()}>
        총 {totalCount || 0} 개
      </Text>
      {!isLoading ? (
        productList?.[0] &&
        foodLocation && (
          <FlatList
            onEndReached={() => {
              loadDataMore();
            }}
            onEndReachedThreshold={0.85}
            contentContainerStyle={tw`justify-between w-full`}
            keyExtractor={({ item }) =>
              `${item.imgurl1}${item.rawmtrl}${item.barcode}${item.nutrient}${item.prdlstNm}`
            }
            data={productList}
            ItemSeparatorComponent={memo(() => (
              <View style={tw`border-b border-slate-400`} />
            ))}
            initialNumToRender={5}
            renderItem={({ item }) => (
              <HaccpProduct
                key={`${item.imgurl1}${item.rawmtrl}${item.barcode}${item.nutrient}${item.prdlstNm}`}
                product={item}
                openForm={openForm}
                setOpenForm={setOpenForm}
                selectedFood={selectedFood}
                onPress={() => onHaccpProductPress(item)}
                setModalVisible={setModalVisible}
              />
            )}
            ListFooterComponent={
              isFetchingNextPage && totalCount > productList?.length ? (
                <View style={tw`text-indigo-300 my-20`}>
                  <ActivityIndicator />
                </View>
              ) : (
                <></>
              )
            }
            disableVirtualization={false}
          />
        )
      ) : (
        <View style={tw`text-indigo-300 mt-20`}>
          <ActivityIndicator />
        </View>
      )}
      {!isLoading && searchKeyword && !!!productList?.length && (
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
