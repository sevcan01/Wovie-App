import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, useWindowDimensions, Image } from 'react-native'
import React, { useCallback, useState } from 'react'

import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { fallbackPoster, searchMovies } from '../api/moviedb';
import { debounce } from 'lodash';
import useAppSettings, { language } from '../store/appSettings';

const SearchScreen = () => {
    const navigation = useNavigation()
    const { loading, setLoading } = useAppSettings(state => state)

    const { width, height } = useWindowDimensions()
    const [result, setResult] = useState([])
    const handleSearch = search => {
        if (search && search.length > 2) {
            const languageRegion = language === 'tr' ? 'tr-TR' : 'en-US';

            setLoading(false)
            searchMovies({ query: search, include_adult: true, page: 1, language: languageRegion })
                .then(data => {
                    if (data && data?.results) {
                        setResult(data?.results)
                    }
                })
                .catch(() => {
                    setLoading(false)
                    setResult([])
                })
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])


    return (

        <SafeAreaView className='flex-1 bg-white'>
            <View className='border-neutral-500 border mx-4 mb-3 flex-row justify-between items-center rounded-full'>
                <TextInput className='pb-1 pl-6 flex-1 text-base font-semibold tracking-wider text-neutral-900' placeholder='Search movie' onChangeText={handleTextDebounce} />
                <TouchableOpacity className='rounded-full p-3 m-1 bg-neutral-900' onPress={() => navigation.navigate('Home')}>

                    <XMarkIcon size={20} strokeWidth={2} color={'white'} />
                </TouchableOpacity>
            </View>
            {loading ? (<Loading />) : (<ScrollView className='space-y-3' contentContainerStyle={{ paddingHorizontal: 15 }}>
                <Text className='text-neutral-600 font-semibold ml-1'>Result {result?.length}</Text>
                <View className='flex-row justify-between flex-wrap'>
                    {result.map((item, index) => (

                        < TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
                            <View className='space-y-2 mb-4'>
                                <Image source={{ uri: item?.poster_path ? `https://image.tmdb.org/t/p/w185${item?.poster_path}` : fallbackPoster }} style={{ width: width * 0.44, height: height * 0.3 }} className='rounded-3xl' />
                                <Text className=' text-gray-500 ml-1'>{item?.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}

                </View>
            </ScrollView>)}

        </SafeAreaView >
    )
}

export default SearchScreen