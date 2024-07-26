export const config = {
  CONTRACT_ADDRESS: process.env.NODE_ENV === 'production' ? process.env.CONTRACT_ADDRESS : require('./config.local').CONTRACT_ADDRESS,
  RPC_PROVIDER: process.env.NODE_ENV === 'production' ? process.env.RPC_PROVIDER : require('./config.local').RPC_PROVIDER,
  GA_ID: process.env.NODE_ENV === 'production' ? process.env.GA_ID : require('./config.local').GA_ID,
}