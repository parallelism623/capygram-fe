import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import step1Register_en from '@/utils/i18n/english/step1Register.json';
import step1Register_vi from '@/utils/i18n/vietnamese/step1Register.json';

import step2Register_en from '@/utils/i18n/english/step2Register.json';
import step2Register_vi from '@/utils/i18n/vietnamese/step2Register.json';

import step3Register_en from '@/utils/i18n/english/step3Register.json';
import step3Register_vi from '@/utils/i18n/vietnamese/step3Register.json';

import profile_en from '@/utils/i18n/english/profile.json';
import profile_vi from '@/utils/i18n/vietnamese/profile.json';

import note_profile_en from '@/utils/i18n/english/note_profile.json';
import note_profile_vi from '@/utils/i18n/vietnamese/note_profile.json';



const resources = {
  en: {
    step1Register: step1Register_en,
    step2Register: step2Register_en,
    step3Register: step3Register_en,
    profile: profile_en,
    note_profile: note_profile_en,

  vi: {
    step1Register: step1Register_vi,
    step2Register: step2Register_vi,
    step3Register: step3Register_vi,
    profile: profile_vi,
    note_profile: note_profile_vi,

  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
