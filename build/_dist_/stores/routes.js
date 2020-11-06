import { writable } from '../../web_modules/svelte/store.js';

import pools from '../config/pools.json.proxy.js';

import NotFound from '../pages/NotFound.js';
import Pool from '../pages/Pool.js';
import CepToken from '../pages/CepToken.js';
import Dashboard from '../pages/Dashboard.js';
import LPStaking from '../pages/LPStaking.js';
import CepLanding from '../pages/CepIndexLanding.js';
import EarlyBird from "../pages/EarlyBird.js";

export const defaultRouteObj = {
  page: Dashboard,
  params: {
    address: pools.default,
  },
};

const deriveRoute = () => {
  try {
    const core = window.location.href.split('#')[1];

    if (!core) {
      return [];
    }

    const parts = core.split('/').filter((part) => part && part.length > 0);

    return parts;
  } catch (e) {
    return [];
  }
};

const formatRoute = (route) => {
  let address;
  let poolAction;
  let referral;
  let method;
  const notFound = { page: NotFound, params: { path: `/${route.join('/')}` } };

  switch (route[0] || 'root') {
    case 'cep':
      address = (route[1] || '').toLowerCase();
      return { page: CepLanding, params: { address } };
    case 'ceptoken':
      return { page: CepToken };
    case 'earlybird':
      return { page: EarlyBird };
    case 'stake':
      referral = route[1] || null;

      if (referral) {
        window.localStorage.setItem('referral', referral);
      }
      return { page: LPStaking, params: { referral } };
    case 'pools':
      address = (route[1] || '').toLowerCase();
      poolAction = (route[2] || 'add').toLowerCase();
      method = (route[3] || 'single').toLowerCase();

      if (pools.available.includes(address)) {
        return { page: Pool, params: { address, poolAction, method } };
      }

      break;
    case 'root':
      return defaultRouteObj;
    default:
      return notFound;
  }

  return notFound;
};

const route = deriveRoute();

export const currentRoute = writable({ ...formatRoute(route) });

window.addEventListener('hashchange', () => {
  const newRoute = deriveRoute();
  currentRoute.set({ ...formatRoute(newRoute) });
  window,scrollTo(0,0)
});
