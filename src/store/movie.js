import { create } from "zustand";

const useMovie = create(set => ({

    trending: [],
    upComing: [],
    topRated: [],
    movie: {},
    cast: [],
    similar: [],
    person: {},
    personMovies: [],
    setTrending: (trending) => set(state => ({ ...state, trending })),
    setUpcoming: (upcoming) => set(state => ({ ...state, upcoming })),
    setTopRated: (topRated) => set(state => ({ ...state, topRated })),
    setMovie: (movie) => set(state => ({ ...state, movie })),
    setCast: (cast) => set(state => ({ ...state, cast })),
    setSimilar: (similar) => set(state => ({ ...state, similar })),
    setPerson: (person) => set(state => ({ ...state, person })),
    setPersonMovies: (personMovies) => set(state => ({ ...state, personMovies })),

}))

export default useMovie;