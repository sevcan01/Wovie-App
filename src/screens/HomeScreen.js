import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import TrengingMovies from '../components/TrengingMovies'
import MovieList from '../components/MovieList'
import { MagnifyingGlassIcon, LanguageIcon } from "react-native-heroicons/outline";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpComingMovies } from '../api/moviedb'
import i18n from "i18next";
import useAppSettings, { setLanguage, setLoading, loading } from '../store/appSettings';
import useMovie from '../store/movie'
const HomeScreen = () => {
    const navigation = useNavigation()
    const { language, setLanguage, setLoading, loading } = useAppSettings(state => state);
    const { trending, setTrending, upComing, setUpComing, topRated, setTopRated } =

        useMovie(state => state);


    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()

        if (data?.results) {
            setTrending(data?.results)
        }
    }
    const getUpComingMovies = async () => {
        const data = await fetchUpComingMovies()

        if (data?.results) {
            setUpComing(data?.results)
        }
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()

        if (data?.results) {
            setTopRated(data?.results)
        }
    }
    useEffect(() => {
        try {
            setLoading(true)
            getTrendingMovies()
            getUpComingMovies()
            getTopRatedMovies()
        } catch (err) {
        } finally {
            setLoading(false)

        }
    }, [])
    useEffect(() => {
        try {
            setLoading(true)
            getTrendingMovies()
            getUpComingMovies()
            getTopRatedMovies()
        } catch (err) {
        } finally {
            setLoading(false)

        }
    }, [language])
    const changeLanguage = () => {
        const newLanguage = language === 'en' ? 'tr' : 'en'
        setLanguage(newLanguage)
        i18n.changeLanguage(newLanguage)
    }
    return (
        <View className='flex-1 bg-white'>
            <SafeAreaView >
                <View className='flex-row justify-between items-center mx-4'>


                    <Text className='text-neutral-800 text-3xl font-bold'>
                        <Text style={styles.text}>W</Text>ovie
                    </Text>
                    <View className='flex-row justify-between items-center'>

                        <TouchableOpacity onPress={() => changeLanguage()}>
                            <LanguageIcon size={30} strokeWidth={2} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                            <MagnifyingGlassIcon size={30} strokeWidth={2} color={'black'} />
                        </TouchableOpacity>
                    </View>


                </View>
                {loading ? <Loading /> :
                    <View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TrengingMovies data={trending} />
                            <View className=' ml-4'>
                                {upComing.length > 0 && (
                                    <MovieList data={upComing} title={i18n.t('home.upcoming')} />
                                )}
                                {topRated.length > 0 && (
                                    <MovieList data={topRated} title={i18n.t('home.topRated')} />
                                )}




                            </View>
                        </ScrollView>
                    </View>
                }

            </SafeAreaView>
        </View>
    )
}

export default HomeScreen