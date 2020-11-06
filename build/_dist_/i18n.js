import { addMessages, init, getLocaleFromNavigator } from '../web_modules/svelte-i18n.js';


// en
import en from './config/locales/en.json.proxy.js';

//zh-CN
import zhCN from './config/locales/zh-CN.json.proxy.js';

// en
addMessages('en', en);

//zh-CN
addMessages('zh-CN', zhCN);


init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
