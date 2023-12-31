import { View, Text, SafeAreaView, ScrollView, Image, useWindowDimensions, Button, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline'
import { theme } from '../theme'
import Loading from '../components/Loading'
import { fetchPersonDetails, fetchPersonMovies } from '../api/moviedb'
import MovieList from '../components/MovieList'
import i18n from '../i18n'
import useMovie from '../store/movie'
import useAppSettings from '../store/appSettings'


const PersonScreen = () => {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isFavorite, setIsFavorite] = useState(false)


    const { loading, setLoading } = useAppSettings(state => state);

    const { person, setPerson, personMovies, setPersonMovies } = useMovie(state => state)

    const { width, height } = useWindowDimensions()

    const topMargin = Platform.OS === 'ios' ? '' : 'mt-3s'

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        if (data) {
            setPerson(data)
        }
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);

        if (data?.cast) {
            setPersonMovies(data.cast);
        }

        setLoading(false);
    };




    useEffect(() => {
        setLoading(true);
        getPersonDetails(item?.id)
        getPersonMovies(item?.id)


    }, [item])


    return (

        <ScrollView className='flex-1 bg-white' showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 25 }}>

            <SafeAreaView className={'flex-row justify-between px-4 absolute z-20 w-full items-center  ' + topMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-full bg-neutral-800 ml-4 p-1'>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity className='rounded-full p-2 bg-neutral-800 mr-2' onPress={() => setIsFavorite(prevState => !prevState)}>
                    <HeartIcon size={35} color={isFavorite ? theme.background : 'white'} />
                </TouchableOpacity>

            </SafeAreaView>


            {loading ? (<Loading />) : (
                <View>
                    <View className='flex-row justify-center'>
                        <View>

                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item?.profile_path}` }} style={{ width, height: height * 0.55 }} className='rounded-3xl' />
                        </View>
                    </View>
                    <View>
                        <Text className='text-neutral-900 font-bold text-3xl text-center'>{person?.name}</Text>
                        <Text className=' text-neutral-500 text-base text-center'>{person?.place_of_birth}</Text>

                    </View>
                    <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-yellow-500 rounded-full'>
                        <View className='border-r-2 border-r-neutral-900 px-2 items-center'>
                            <Text className=' border-r-neutral-900 font-semibold'>{i18n.t('person.gender')}</Text>
                            <Text className='text-white text-sm'>{person?.gender == 1 ? 'Female' : 'Male'}</Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-900 px-2 items-center'>
                            <Text className=' border-r-neutral-900 font-semibold'>{i18n.t('person.birthday')}</Text>
                            <Text className='text-white text-sm'>{person?.birthday}</Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-900 px-2 items-center'>
                            <Text className=' border-r-neutral-900 font-semibold'>known for</Text>
                            <Text className='text-white text-sm'>{person?.known_for_department}</Text>
                        </View>

                        <View className=' px-2 items-center'>
                            <Text className=' border-r-neutral-900 font-semibold'>{i18n.t('person.popularity')}</Text>
                            <Text className='text-white text-sm'>{person?.popularity?.toFixed(2)}</Text>
                        </View>
                    </View>
                    {person?.biography && (
                        <View className=' my-6 mx-4 space-y-2'>
                            <Text className=' text-neutral-900 text-lg'>{i18n.t('person.biography')}</Text>
                            <Text className=' text-neutral-400 tracking-wide'>{person?.biography}</Text>
                        </View>
                    )}
                    {person?.id && personMovies?.length > 0 && (
                        <MovieList title={i18n.t('movie.title')} hideSeeAll={false} data={personMovies} />
                    )}

                </View>
            )}
        </ScrollView>
    )
}

export default PersonScreen