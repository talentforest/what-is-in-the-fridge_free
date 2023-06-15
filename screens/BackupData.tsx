import { View } from 'react-native';
import { Share } from 'react-native';
import { store } from '../redux/store';
import * as FileSystem from 'expo-file-system';
import tw from 'twrnc';
import SettingContainer from '../components/screen-component/setting/SettingContainer';
import SettingItem from '../components/screen-component/setting/SettingItem';

export default function BackupData() {
  const exportData = async () => {
    try {
      const state = store.getState();
      const data = JSON.stringify(state);
      if (data) {
        const filePath = `${FileSystem.documentDirectory}backupfile.json`;

        await FileSystem.writeAsStringAsync(filePath, data, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        await Share.share({
          url: filePath,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tw`mx-4 mt-2`}>
      <SettingContainer title='백업'>
        <SettingItem
          title='핸드폰에 데이터 저장하기'
          onPress={() => console.log('store data')}
          iconName='cellphone-arrow-down'
        />
        <SettingItem
          title='데이터 파일 내보내기'
          onPress={exportData}
          iconName='database-export-outline'
        />
      </SettingContainer>
      <SettingContainer title='복원'>
        <SettingItem
          title='데이터 복원하기'
          onPress={() => console.log('restore data')}
          iconName='restore'
        />
      </SettingContainer>
    </View>
  );
}
