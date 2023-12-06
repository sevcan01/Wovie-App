
import axios from "axios"
import { apiKey } from "../contants"
import { language } from "../store/appSettings"


const apiBaseUrl = 'https://api.themoviedb.org/3'
const languageRegion = language === 'tr' ? 'tr-TR' : 'en-US';

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&language=${languageRegion}`
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}&language=${languageRegion}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=${languageRegion}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;




const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}&language=${languageRegion}`

const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}&language=${languageRegion}`
const movieCreditEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}&language=${languageRegion}`
const personDetailEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}&language=${languageRegion}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}&language=${languageRegion}`



const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params || {},
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFkN2M0M2UxNzJjMDg2YzNkOGYyOWYxNWEyOTM3YSIsInN1YiI6IjY1NjEyNzE3NzA2ZTU2MDExYjQ5NmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2VHaN-XjCd-xMBa24-DeXVccAWKuxNOgjm__C78L8c'
        }
    }

    try {
        const response = await axios.request(options)
        return response?.data
    } catch (error) {
        console.log('Err ApiCall ', error)
        return {}
    }

}

//HomeScreen API

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpComingMovies = () => {
    return apiCall(upComingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}


//Search Screen API


export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchCredit = id => {
    return apiCall(movieCreditEndpoint(id))
}


export const fallbackPersonImage =

    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


export const fallbackPoster =
    'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'




//person API

export const fetchPersonDetails = id => {
    return apiCall(personDetailEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}