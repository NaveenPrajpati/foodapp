import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import InputTag from '../elements/InputTag';

type modalProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  onChangeText: (e: String) => void;
  onPress: () => void;
};

const CancelModal = ({
  modalVisible,
  setModalVisible,
  onPress,
  onChangeText,
}: modalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className=" text-black textlg font-medium">
              Are you sure?
            </Text>

            <InputTag
              iconName="sticky-note"
              placeholder="Reasong or review"
              onChangeText={onChangeText}
            />

            <View className="flex-row space-x-2 mt-5">
              <Pressable
                style={[styles.button, {backgroundColor: 'black'}]}
                onPress={() => setModalVisible(pre => !pre)}>
                <Text className="text-white">Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={onPress}>
                <Text className="text-white">Cancel Order</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CancelModal;
