import { Animated, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import FoodBox from '../../components/common/FoodBox';
import tw from 'twrnc';

interface Props {
  food: Food;
  dragPosition: Animated.ValueXY;
}

export default function DragGeneratedFoodBox({ food, dragPosition }: Props) {
  return (
    <Animated.View
      style={{
        backgroundColor: 'fff',
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
        <FoodBox food={food} />
      </View>
    </Animated.View>
  );
}
