import { create } from 'zustand'
import { defoult_language } from '../i18n';

const useAppSettings = create((set) => ({
    language: defoult_language,
    loading: false,
    setLanguage: language => set(state => ({ ...state, language })),
    setLoading: loading => set(state => ({ ...state, loading })),

}))

export const setLanguage = language =>
    useAppSettings.getState().setLanguage(language)

export const language = useAppSettings.getState().language;

export default useAppSettings;