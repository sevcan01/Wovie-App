import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigation from './src/navigation/appNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigation />
    </GestureHandlerRootView>
  )
}

export default App