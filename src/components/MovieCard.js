import React from "react"
import { Image, TouchableWithoutFeedback, useWindowDimensions } from "react-native"



const MovieCard = ({ item, handleClick }) => {
    const { width, height } = useWindowDimensions()
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image source={{ uri: `https://www.themoviedb.org/t/p/w500/${item.poster_path}` }} style={{ width: width * 0.6, height: height * 0.40 }} />
        </TouchableWithoutFeedback>
    )
}

export default MovieCard