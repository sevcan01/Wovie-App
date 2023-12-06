import { View, Text, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackPersonImage } from '../api/moviedb'
import i18n from '../i18n'

const Cast = ({ cast }) => {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()
    return (
        <View className='my-6'>
            <Text className=' text-neutral-900 text-lg mx-4 mb-5'>{i18n.t('credit.cast')}</Text>
            <ScrollView horizontal showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {cast && cast.length > 0 && cast?.map((person, index) => {
                    return (
                        <TouchableOpacity key={index} className='mr-4 items-center' onPress={() => navigation.navigate('Person', person)}>
                            <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                                <Image source={{ uri: person?.profile_path ? `https://image.tmdb.org/t/p/w500${person?.profile_path}` : fallbackPersonImage }} className='rounded-2x h-24 w-20' />
                                <Text>{person?.chatacter}</Text>
                                <Text>{person?.original_name}</Text>
                            </View>
                        </TouchableOpacity>)
                })}


            </ScrollView>
        </View>
    )
}

export default Cast