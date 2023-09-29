import { Animated, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import FoodBox from '../../components/common/FoodBox';
import tw from 'twrnc';
import { useSelector } from '../../redux/hook';

interface Props {
  dragPosition: Animated.ValueXY;
}

export default function DragGeneratedFoodBox({ dragPosition }: Props) {
  const { selectedFood } = useSelector((state) => state.selectedFood);

  return (
    <Animated.View
      style={{
        backgroundColor: '#fff',
        zIndex: 100,
        borderRadius: 8,
        position: 'absolute',
        transform: [
          { translateX: dragPosition.x },
          { translateY: dragPosition.y },
        ],
      }}
    >
      <View style={tw`absolute top-0 rounded-lg bg-white`}>
        <FoodBox food={selectedFood} />
      </View>
    </Animated.View>
  );
}
