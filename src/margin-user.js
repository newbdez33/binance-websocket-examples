#!/usr/bin/env node

import getUserDataStream from './lib/services/margin/getUserDataStream';
import SocketClient from './lib/socketClient';
import renewListenKey from './lib/helpers/renewListenKey';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || 'vcm1oKLEVNw9NskJgrZHT8n5iTm5MqU4k0XQIbTp1jbTts1wpZe4paaRwKNRJmUP';
const APISECET = process.env.APISECET || 'CUPvtXQqF9Z0gvSqjN9Po85BiUbGUJyVodwkOVnMeer43Pslg5T50RkQnKMC8e9w';

export default async function createApp() {
  logger.info('start application to get margin user account update');
  const listenKey = await getUserDataStream(APIKEY, APISECET);

  logger.info('key received.');
  const socketApi = new SocketClient(`ws/${listenKey}`);
  socketApi.setHandler('executionReport', (params) => logger.info(params));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(params));

  renewListenKey(APIKEY, APISECET)(listenKey);
}

createApp();
