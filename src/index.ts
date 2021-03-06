#!/usr/bin/env node

//  0. Load from WIF/Create keyPair
//  1. Select an endpoint and connect to the daemon
//  2. Select asset pair and Fetch his market rate
//  3. Start swap proposal
//  4. Parsing acceptance from the daemon & sign
//  5. Sending signed swap back to daemon.
import { program } from 'commander';

//Components
import {
  walletAction,
  infoAction,
  networkAction,
  marketAction,
  marketListAction,
  connectAction,
  marketPriceAction,
  walletSendAction,
  walletBalanceAction,
  tradeAction,
} from './actions';

import { NETWORKS } from './helpers';
//eslint-disable-next-line
const pkg = require('../package.json');

program.version(pkg.version);

program
  .command('info')
  .description('Get info about the current session')
  .action(infoAction);

/**
 * Network
 */
program
  .command('network <chain>')
  .option(
    '-e, --explorer <endpoint>',
    'Set a different electrum server endpoint for connecting to the blockchain'
  )
  .description(
    'Select the network. Available networks: ' + Object.keys(NETWORKS)
  )
  .action(networkAction);

/**
 * Connect
 */
program
  .command('connect <endpoint>')
  .description('Connect to the liquidity provider')
  .action(connectAction);

/**
 * Market
 */

const market = program
  .command('market <pair>')
  .description('Select the asset pair to use for the swap')
  .action(marketAction);

market
  .command('list')
  .description('Get available assets pairs for current provider')
  .action(marketListAction);

market
  .command('price')
  .description('Get the current price for the selected market')
  .action(marketPriceAction);

/**
 * Wallet
 */

const wallet = program
  .command('wallet')
  .description('Create new key pair or restore from WIF')
  .action(walletAction);

wallet
  .command('balance')
  .description('Show current wallet balance')
  .action(walletBalanceAction);

wallet
  .command('send')
  .description('Send funds of an asset to a given address')
  .action(walletSendAction);

/**
 * Trade
 */
program
  .command('trade')
  .description('Make a trade proposal')
  .action(tradeAction);

program.parse(process.argv);
