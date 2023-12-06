import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';


const Loading = () => {
    const { width, height } = useWindowDimensions()
    return (
        <View style={{ width, height }} className='flex-row absolute justify-center items-center w-full h-full'>

            <Progress.CircleSnail color={theme.background} thickness={12} size={160} />
        </View>
    )
}

export default Loading