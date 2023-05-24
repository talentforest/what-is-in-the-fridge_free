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
  onPress: (product: ProductType) => void;
}

export default function Product({ product, selectedFood, onPress }: Props) {
  const { item } = product;

  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      style={tw`rounded-md border-slate-300 flex-row gap-2 py-2.5 items-center ${
        item.prdlstNm === selectedFood.name ? 'border-b-0' : ' border-b'
      }`}
    >
      <Image style={tw`h-14 w-14 rounded-md`} source={{ uri: item.imgurl1 }} />
      <View style={tw`flex-1 gap-2 justify-center`}>
        <Text>{item.prdlstNm}</Text>
        <View style={tw`flex-row gap-1`}>
          {item.prdkind !== '알수없음' && item.prdkind && (
            <Text styletw='text-slate-500'>{item.prdkind}</Text>
          )}
          {item.capacity !== '알수없음' && item.capacity && (
            <>
              <Text styletw='text-slate-500'>/</Text>
              <Text styletw='text-slate-500 flex-1 pb-1'>{item.capacity}</Text>
            </>
          )}
        </View>
      </View>
      <Icon
        name={
          item.prdlstNm === selectedFood.name
            ? 'checkmark-circle-outline'
            : 'add'
        }
        size={24}
        color={INDIGO}
      />
    </TouchableOpacity>
  );
}
