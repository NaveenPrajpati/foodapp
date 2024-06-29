import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type selectedProp = {
  selectedItem: string;
  index: number;
};

type selectProp = {
  placeholder: string;
  onSelect: ({selectedItem}: selectedProp) => void;
  data: string[];
  label?: string;
};

const SelectTag = ({onSelect, placeholder, data, label}: selectProp) => {
  const emojisWithIcons = [
    'happy',
    'cool',
    'lol',
    'sad',
    'cry',
    'angry',
    'confused',
    'excited',
    'kiss',
    'devil',
    'dead',
    'wink',
    'sick',
    'frown',
  ];
  return (
    <View className="my-1">
      {label && <Text className="font-semibold text-gray-500">{label}</Text>}
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text className=" text-lg font-semibold text-black capitalize">
                {(selectedItem && selectedItem) || `${placeholder}`}
              </Text>
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View className={` bg-blue-400`}>
              <Text
                className={`${
                  isSelected && ' bg-gray-300'
                } text-black font-semibold capitalize text-lg text-center  p-1`}>
                {item}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default SelectTag;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#FED7AA',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
