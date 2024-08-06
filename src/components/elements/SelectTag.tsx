import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
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
  value?: string;
  style?: StyleProp<ViewStyle>;
  error?: string;
};

const SelectTag = ({
  onSelect,
  placeholder,
  data,
  label,
  value,
  style,
  error,
}: selectProp) => {
  return (
    <View className="my-1">
      {label && <Text className="font-semibold text-gray-500">{label}</Text>}
      <SelectDropdown
        defaultValue={value}
        data={data}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={[styles.dropdownButtonStyle, style]}>
              <Text className=" text-lg font-semibold text-gray-700 capitalize">
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
      {error && <Text className="text-red-500 text-right">{error}</Text>}
    </View>
  );
};

export default SelectTag;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'red',
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
    color: 'red',
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
