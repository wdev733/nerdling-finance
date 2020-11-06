const actions = {
  GET_ALLOWANCE: 'GET_ALLOWANCE',
  GET_STAKED: 'GET_STAKED',
  GET_BALANCE: 'GET_BALANCE',

  APPROVE_TOKEN: 'APPROVE_TOKEN',
  DEPOSIT_TOKEN: 'DEPOSIT_TOKEN',
  WITHDRAW_TOKEN: 'WITHDRAW_TOKEN',
  HARVEST_TOKEN: 'HARVEST_TOKEN',
  DRAIN_TOKEN: 'DRAIN_TOKEN',

  getBalance: (tokenAddress, callback) => ({
    type: actions.GET_BALANCE,
    payload: { tokenAddress, callback },
  }),

  getAllowance: (tokenAddress, callback) => ({
    type: actions.GET_ALLOWANCE,
    payload: { tokenAddress, callback },
  }),

  getStaked: (pid, callback) => ({
    type: actions.GET_STAKED,
    payload: { pid, callback },
  }),

  approveToken: (tokenAddress, callback) => ({
    type: actions.APPROVE_TOKEN,
    payload: { tokenAddress, callback },
  }),

  depositToken: (pid, amount, callback) => ({
    type: actions.DEPOSIT_TOKEN,
    payload: { pid, amount, callback },
  }),

  withdrawToken: (pid, amount, callback) => ({
    type: actions.WITHDRAW_TOKEN,
    payload: { pid, amount, callback },
  }),

  harvestToken: (pid, callback) => ({
    type: actions.HARVEST_TOKEN,
    payload: { pid, callback },
  }),

  drainToken: (pid, callback) => ({
    type: actions.DRAIN_TOKEN,
    payload: { pid, callback },
  }),
}

export default actions
