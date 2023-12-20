import { useSelector } from '../../redux/hook';
import { getCompartments } from '../../util';
import { Space } from '../../constant/fridgeInfo';
import { Food } from '../../constant/foodInfo';
import { MutableRefObject } from 'react';
import { ScrollView } from 'react-native';

import CompartmentBox from '../../components/compartment/CompartmentBox';
import CompartmentContainer from '../../components/compartment/CompartmentContainer';
import ExpandedCompartmentModal from '../modal/ExpandedCompartmentModal';

interface Props {
  space: Space;
  foodList: Food[];
  scrollViewRef: MutableRefObject<ScrollView>;
}

export default function ViewByCompartment({
  space,
  foodList,
  scrollViewRef,
}: Props) {
  const {
    expandCompartmentModal: { compartmentNum },
  } = useSelector((state) => state.modalVisible);

  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const maxCompartmentNum = fridgeInfo.compartments[space];

  const compartments = getCompartments(maxCompartmentNum);

  return (
    <>
      <CompartmentContainer>
        {space === '실온보관' ? (
          <CompartmentBox
            position={{ space, compartmentNum }}
            scrollViewRef={scrollViewRef}
          />
        ) : (
          compartments.map((compartment) => (
            <CompartmentBox
              key={compartment.compartmentNum}
              position={{ space, ...compartment }}
              scrollViewRef={scrollViewRef}
            />
          ))
        )}
      </CompartmentContainer>

      {space !== '실온보관' && (
        <ExpandedCompartmentModal position={{ space, compartmentNum }} />
      )}
    </>
  );
}
