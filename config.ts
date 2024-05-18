import { localConfig } from './config.local';

export const config = {
  CONTRACT_ADDRESS: localConfig ? localConfig.CONTRACT_ADDRESS : process.env.CONTRACT_ADDRESS,
  RPC_PROVIDER: localConfig ? localConfig.RPC_PROVIDER : process.env.RPC_PROVIDER,
}