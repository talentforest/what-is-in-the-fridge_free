import { INDIGO } from '../../../constant/colors';
import { Image, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { Food } from '../../../constant/foods';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

export interface ProductType {
  item: {
    nutrient: string;
    rawmtrl: string;
    prdlstNm: string;
    imgurl2: string;
    barcode: string;
    imgurl1: string;
    productGb: string;
    seller: string;
    prdkindstate: string;
    rnum: string;
    manufacture: string;
    prdkind: string;
    capacity: string;
    prdlstReportNo: string;
    allergy: string;
  };
}

interface Props {
  product: ProductType;
  selectedFood: Food;
  openForm: boolean;
  onPress: (product: ProductType) => void;
}

export default function Product({
  product,
  selectedFood,
  openForm,
  onPress,
}: Props) {
  const {
    item: { prdlstNm, imgurl1, prdkind, capacity },
  } = product;

  const detail = [prdkind, capacity].filter(
    (info) => info && info !== '알수없음'
  );

  return (
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
  );
}
