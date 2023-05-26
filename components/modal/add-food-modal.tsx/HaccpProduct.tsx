import { INDIGO } from '../../../constant/colors';
import { Image, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { Food } from '../../../constant/foods';
import { useDispatch } from '../../../redux/hook';
import { search } from '../../../redux/slice/searchKeywordSlice';
import { HaccpProductType } from '../../../hooks/useGetProduct';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Form from '../form/Form';
import SubmitBtn from '../form/SubmitBtn';
import useAddSelectFood from '../../../hooks/useAddSelectFood';

interface Props {
  product: HaccpProductType;
  selectedFood: Food;
  openForm: boolean;
  onPress: (product: HaccpProductType) => void;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function HaccpProduct({
  product,
  selectedFood,
  openForm,
  onPress,
  setModalVisible,
}: Props) {
  const { onChange, onSubmit } = useAddSelectFood();
  const dispatch = useDispatch();

  const {
    item: { prdlstNm, imgurl1, prdkind, capacity },
  } = product;

  const detail = [prdkind, capacity].filter(
    (info) => info && info !== '알수없음'
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(product)}
        style={tw`rounded-md border-slate-300 flex-row gap-2 py-2.5 items-center`}
      >
        <Image style={tw`h-14 w-14 rounded-md`} source={{ uri: imgurl1 }} />
        <View style={tw`flex-1 gap-2 justify-center`}>
          <Text>{prdlstNm}</Text>
          <View style={tw`flex-row gap-1 w-full`}>
            {detail.map(
              (info, index) =>
                info !== '알수없음' &&
                info && (
                  <Text
                    key={info}
                    styletw={`text-slate-500 pb-0.5 leading-5 ${
                      index === detail.length - 1 && 'flex-1'
                    }`}
                  >
                    {info} {index !== detail.length - 1 && '|'}
                  </Text>
                )
            )}
          </View>
        </View>
        <Icon
          name={
            openForm && prdlstNm === selectedFood.name
              ? 'checkmark-circle-outline'
              : 'add'
          }
          size={24}
          color={INDIGO}
        />
      </TouchableOpacity>
      {prdlstNm === selectedFood.name && openForm && (
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
  );
}
