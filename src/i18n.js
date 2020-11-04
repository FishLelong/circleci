import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';


// en
import en from './config/locales/en.json';

//zh-CN
import zhCN from './config/locales/zh-CN.json';

// en
addMessages('en', en);

//zh-CN
addMessages('zh-CN', zhCN);


init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
