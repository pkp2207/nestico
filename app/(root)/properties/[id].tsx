import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const Property = () => {
    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>Property</Text>
    </View>
  )
}

export default Property