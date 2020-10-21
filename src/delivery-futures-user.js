#!/usr/bin/env node

import getDeliveryListenKey from './lib/services/futures/getDeliveryListenKey';
import SocketClient from './lib/socketClient';
import logger from './lib/logger';

const APIKEY = process.env.APIKEY || 'vcm1oKLEVNw9NskJgrZHT8n5iTm5MqU4k0XQIbTp1jbTts1wpZe4paaRwKNRJmUP';
const APISECET = process.env.APISECET || 'CUPvtXQqF9Z0gvSqjN9Po85BiUbGUJyVodwkOVnMeer43Pslg5T50RkQnKMC8e9w';
const WS_BASEURL = process.env.WS_BASEURL || 'wss://dstream.binance.com/';

export default async function createApp() {
  logger.info('start application');
  const listenKey = await getDeliveryListenKey(APIKEY, APISECET, false);

  logger.info('key received.', listenKey);
  const socketApi = new SocketClient(`ws/${listenKey}`, WS_BASEURL);
  socketApi.setHandler('executionReport', (params) => logger.info(JSON.stringify(params)));
  socketApi.setHandler('outboundAccountInfo', (params) => logger.info(JSON.stringify(params)));

  // renew listenkey
}

createApp();
