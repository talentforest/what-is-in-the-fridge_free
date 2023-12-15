import { View } from 'react-native';
import { fridgeSettingBtns } from '../constant/settingBtns';

import Container from '../components/common/Container';
import SettingBox from '../screen-component/setting/SettingBox';
import tw from 'twrnc';

export default function SettingFridge() {
  return (
    <Container>
      <View style={tw`px-1`}>
        {fridgeSettingBtns.map((setting) => (
          <SettingBox key={setting.title} setting={setting} />
        ))}
      </View>
    </Container>
  );
}
