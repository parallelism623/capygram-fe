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

import login_en from '@/utils/i18n/english/login.json';
import login_vi from '@/utils/i18n/vietnamese/login.json';

import edit_profile_en from '@/utils/i18n/english/edit_profile.json';
import edit_profile_vi from '@/utils/i18n/vietnamese/edit_profile.json';

import changePhoto_profile_en from '@/utils/i18n/english/changePhoto_profile.json';
import changePhoto_profile_vi from '@/utils/i18n/vietnamese/changePhoto_profile.json';

import reset_password_en from '@/utils/i18n/english/reset_password.json';
import reset_password_vi from '@/utils/i18n/vietnamese/reset_password.json';

import verify_account_en from '@/utils/i18n/english/verify_account.json';
import verify_account_vi from '@/utils/i18n/vietnamese/verify_account.json';

import sms_messages_en from '@/utils/i18n/english/sms_messages.json';
import sms_messages_vi from '@/utils/i18n/vietnamese/sms_messages.json';

import archive_profile_en from '@/utils/i18n/english/archive_profile.json';
import archive_profile_vi from '@/utils/i18n/vietnamese/archive_profile.json';

import setting_en from '@/utils/i18n/english/setting.json';
import setting_vi from '@/utils/i18n/vietnamese/setting.json';

import menu_en from '@/utils/i18n/english/menu.json'
import menu_vi from '@/utils/i18n/vietnamese/menu.json'

import hotStory_en from '@/utils/i18n/english/hotStory.json';
import hotStory_vi from '@/utils/i18n/vietnamese/hotStory.json';

import search_en from '@/utils/i18n/english/search.json';
import search_vi from '@/utils/i18n/vietnamese/search.json';

import createPost_en from '@/utils/i18n/english/createPost.json';
import createPost_vi from '@/utils/i18n/vietnamese/createPost.json';

import messages_en from '@/utils/i18n/english/messages.json';
import messages_vi from '@/utils/i18n/vietnamese/messages.json';

import explore_en from '@/utils/i18n/english/explore.json';
import explore_vi from '@/utils/i18n/vietnamese/explore.json';

import postItem_en from '@/utils/i18n/english/postItem.json';
import postItem_vi from '@/utils/i18n/vietnamese/postItem.json';

import listFollow_en from '@/utils/i18n/english/listFollow.json';
import listFollow_vi from '@/utils/i18n/vietnamese/listFollow.json';

const resources = {
  en: {
    step1Register: step1Register_en,
    step2Register: step2Register_en,
    step3Register: step3Register_en,
    profile: profile_en,
    note_profile: note_profile_en,
    login: login_en,
    edit_profile: edit_profile_en,
    changePhoto_profile: changePhoto_profile_en,
    reset_password: reset_password_en,
    verify_account: verify_account_en,
    sms_messages: sms_messages_en,
    archive_profile: archive_profile_en,
    setting: setting_en,
    menu: menu_en,
    hotStory: hotStory_en,
    search: search_en,
    createPost: createPost_en,
    messages: messages_en,
    explore: explore_en,
    postItem: postItem_en,
    listFollow: listFollow_en,

  },
  vi: {
    step1Register: step1Register_vi,
    step2Register: step2Register_vi,
    step3Register: step3Register_vi,
    profile: profile_vi,
    note_profile: note_profile_vi,
    login: login_vi,
    edit_profile: edit_profile_vi,
    changePhoto_profile: changePhoto_profile_vi,
    reset_password: reset_password_vi,
    verify_account: verify_account_vi,
    sms_messages: sms_messages_vi,
    archive_profile: archive_profile_vi,
    setting: setting_vi,
    menu: menu_vi,
    hotStory: hotStory_vi,
    search: search_vi,
    createPost: createPost_vi,
    messages: messages_vi,
    explore: explore_vi,
    postItem: postItem_vi,
    listFollow: listFollow_vi,
    
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
