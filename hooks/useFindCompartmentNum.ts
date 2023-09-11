import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from '../redux/hook';
import { useHeaderHeight } from '@react-navigation/elements';
import { CompartmentNum } from '../constant/fridgeInfo';
import { DEVICE_HEIGHT } from '../util';
import { Food } from '../constant/foodInfo';

const FILTER_HEIGHT = 48;
const GAP = 10;

export const useFindCompartmentNum = ({ food }: { food: Food }) => {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const compartmentTopMostHeight = +(
    insets.bottom +
    headerHeight +
    FILTER_HEIGHT
  ).toFixed(0);
  const maxCompartmentNum = fridgeInfo.compartments[food.space];
  const compartmentGaps = GAP * (maxCompartmentNum + 1);
  const heightExcludeCompartment =
    compartmentTopMostHeight + compartmentGaps + 13;
  const compartmentsHeight = DEVICE_HEIGHT - heightExcludeCompartment;

  const compartmentHeight = compartmentsHeight / maxCompartmentNum;

  const getPositionY = (
    compartmentHeight: number,
    compartmentNum: CompartmentNum,
    moveY: number
  ) => {
    const calNum = +compartmentNum.slice(0, 1);
    const topHeight =
      compartmentTopMostHeight + GAP + compartmentHeight * (calNum - 1);
    const bottomHeight =
      compartmentTopMostHeight + GAP + compartmentHeight * calNum;

    return topHeight <= moveY && moveY <= bottomHeight;
  };

  const findCompartmentNum = (moveY: number) => {
    if (getPositionY(compartmentHeight, '1번', moveY)) return '1번';

    if (getPositionY(compartmentHeight, '2번', moveY)) return '2번';

    if (getPositionY(compartmentHeight, '3번', moveY)) return '3번';

    if (getPositionY(compartmentHeight, '4번', moveY)) return '4번';

    if (getPositionY(compartmentHeight, '5번', moveY)) return '5번';

    return food.compartmentNum;
  };

  return {
    findCompartmentNum,
  };
};
