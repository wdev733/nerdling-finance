import MASTER_VAMPIRE_ABI from './abi/MasterVampire_abi.json'
import TOKEN_ABI from "./abi/Token_abi.json"

export const NERDLING_POOL_ID = 0
export const NERDLING_POOL_ADDRESS = "0x69e2cfd60f9f42cdca363066c6670deb25aa9370"

export const MASTER_VAMPIRE_ADDRESS = '0xBde001C5700Fd7A1C749440E11E9D10Fdd3Ad7Cf'
export { MASTER_VAMPIRE_ABI, TOKEN_ABI }

export const NERDLING_POOL = {
  name: 'NERDLING',
  tokenName: 'NERDLING-ETH',
  tokenAddress: NERDLING_POOL_ADDRESS,
  visible: true,
  _pid: NERDLING_POOL_ID,
  _victimPoolId: NERDLING_POOL_ID,
}

export const PROTOCOLS = [
  {
    title: 'UniSwap',
    link: 'uniswap',
  },
  {
    title: 'SushiSwap',
    link: 'sushiswap',
  },
  {
    title: 'Pickle',
    link: 'pickle',
  },
  {
    title: 'LuaSwap',
    link: 'luaswap',
  },
  // {
  //   title: 'Dodo',
  //   link: 'dodo',
  // },
  {
    title: 'SashimiSwap',
    link: 'sashimiswap',
  },
  {
    title: 'YFValue',
    link: 'yfvalue',
  },
];


