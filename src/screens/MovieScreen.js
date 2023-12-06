import { View, Text, ScrollView, Image, useWindowDimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MovieList from '../components/MovieList'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline'
import { theme } from '../theme'
import { fetchCredit, fetchMovieDetails, fetchSimilarMovies } from '../api/moviedb'
import Cast from '../components/Cast'
import Loading from '../components/Loading'
import { SafeAreaView } from 'react-native-safe-area-context'
import i18n from '../i18n'
import useMovie from '../store/movie'
import useAppSettings from '../store/appSettings'

const MovieScreen = () => {
    const { movie, setMovie, cast, setCast, similar, setSimilar } = useMovie(state => state)
    const { loading, setLoading } = useAppSettings(state => state);
    const topMargin = Platform.OS === 'ios' ? '' : 'mt-3s'
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions()


    const [isFavorite, setIsFavorite] = useState(false)
    const getMovieDetails = async () => {
        const data = await fetchMovieDetails(item?.id)

        if (data) {
            setMovie({ ...movie, ...data })
        }
    };

    const getSimilarMovies = async () => {
        const data = await fetchSimilarMovies(item?.id)
        if (data?.results) {
            setSimilar(data?.results)
        }
    }
    const getCredits = async () => {
        const data = await fetchCredit(item?.id)
        if (data?.cast) {
            setCast(data?.cast)
        }
    }
    useEffect(() => {
        try {
            setLoading(true)
            getMovieDetails()
            getSimilarMovies()
            getCredits()
        } catch (err) { } finally {
            setLoading(false)
        }
    }, [])





    return (

        <ScrollView className='flex-1 bg-white' contentContainerStyle={{ paddingBottom: 20 }}>
            <View className=' w-full'>
                <SafeAreaView className={'flex-row justify-between px-4 absolute z-20 w-full items-center  ' + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} className='rounded-full bg-neutral-800 ml-4 p-1'>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavorite(prevState => !prevState)}>
                        <HeartIcon size={35} color={isFavorite ? theme.background : 'white'} />
                    </TouchableOpacity>

                </SafeAreaView>
                {loading ? (<Loading />) : (
                    <View>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path}` }} style={{ width, height: height * 0.55 }} className='rounded-3xl' />
                    </View>
                )}
                <View className='space-y-4 mt-5'>
                    <Text className='text-neutral-900 text-center text-3xl font-bold tracking-widest'>{movie?.title}</Text>
                    <Text>{movie?.status} • {movie?.release_date?.split('-')[0]}•{''}
                        {movie?.runtime}
                    </Text>
                    <View>
                        {movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie?.genres.length
                            return (
                                <Text className='text-neutral-900 text-center font-semibold text-base' key={index}>
                                    {genre?.name} {showDot ? '•' : null}
                                </Text>
                            )
                        })}
                        <Text className='text-neutral-400 font-semibold text-base text-center'>{movie?.overview}</Text>
                    </View>

                    {movie?.id && cast.length > 0 && <Cast cast={cast} />}
                    {movie?.id && similar.length > 0 && (
                        <MovieList title={i18n.t('movie.similarMovie')} hideSeeAll={false} data={similar} />

                    )}



                </View>
            </View>
        </ScrollView>
    )
}

export default MovieScreen