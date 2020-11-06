import uniswap from "./Uniswap.json";
import sushiswap from "./Sushi.json";
import pickle from "./Pickle.json";
import luaswap from "./Lua.json";
import dodo from "./DODO.json";
import sashimiswap from "./Sashimi.json";
import yfvalue from "./Yfv.json";
import yfvalueNew from './Yfv_new.json'

const nerdlings = {
  uniswap,
  sushiswap,
  pickle,
  luaswap,
  // dodo,
  sashimiswap,
  yfvalue
}

export const getNerdsByAdapter = (adapter) => nerdlings[adapter]

export default nerdlings;