import Notify from '../web_modules/bnc-notify.js';

import { isAddress, isTransactionHash } from '../web_modules/@pie-dao/utils.js';

import { isString } from '../web_modules/@pie-dao/utils/src/utils/typeChecks.js';
import env from './config/env.json.proxy.js';

const notify = Notify(env.blocknative);

const displayNotification = ({
  address,
  autoDismiss = 4000,
  eventCode = 'notice',
  hash,
  message,
  onclick = () => {},
  type = 'success',
}) => {
  console.log('displayNotification', {
    address,
    autoDismiss,
    eventCode,
    hash,
    message,
    onclick,
    type,
  });

  const notificationObject = {
    autoDismiss,
    eventCode,
    message,
    onclick,
    type,
  };

  let notificationResponse = {};

  if (isString(message)) {
    notificationResponse = notify.notification(notificationObject);
  }

  if (isAddress(address)) {
    const { emitter } = notify.account(address);
    return { ...notificationResponse, emitter };
  }

  if (isTransactionHash(hash)) {
    const { emitter } = notify.hash(hash);
    return { ...notificationResponse, emitter };
  }

  return notificationResponse;
};

export default displayNotification;
