import { View, Text, Modal, Button } from 'react-native'
import React, { useState } from 'react'

export default function WarningModal({message}) {
    const[visible,setVisible]=useState(true)
    console.log('showing warnign')
  return (
    <View>
      <Modal
      transparent={true}
      visible={visible}
      animationType='non'
      >
      <View>
      <View className='bg-white p-2'>
      <Text>{message}</Text>
      <Button title='close' onPress={()=>setVisible(false)}></Button>
      </View>
      </View>
      </Modal>
    </View>
  )
}