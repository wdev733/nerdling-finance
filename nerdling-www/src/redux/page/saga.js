import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects'

import actions from './actions'
import Web3 from 'web3'

import axios from 'axios'
import BigNumber from 'bignumber.js'

import {
  MASTER_VAMPIRE_ADDRESS,
  MASTER_VAMPIRE_ABI,
  TOKEN_ABI,
} from '../../helper/constants'

/**
 * Load Web3.js
 */
const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        // Request account access if needed
        await window.ethereum.enable()
        // Acccounts now exposed
        resolve(web3)
      } catch (error) {
        reject(error)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3
      // console.log("Injected web3 detected.");
      resolve(web3)
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
      const web3 = new Web3(provider)
      // console.log("No web3 instance injected, using Local web3.");
      resolve(web3)
    }
  })

// Helpers *********************************************************************************
const getBalanceAsync = async (instance, address) => {
  return await instance.methods
    .balanceOf(address)
    .call()
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const getStakedAsync = async (instance, pid, address) => {
  return await instance.methods
    .userInfo(pid, address)
    .call()
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const getAllowanceAsync = async (instance, owner, sender) => {
  return await instance.methods
    .allowance(owner, sender)
    .call()
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const approveAsync = async (instance, amount, address, spender) => {
  return await instance.methods
    .approve(spender, new BigNumber(amount).toString())
    .send({
      from: address,
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const depositAsync = async (instance, web3, pid, amount, address) => {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json',
  )
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  }

  return await instance.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), 'gwei'),
      gas: 160000,
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const withdrawAsync = async (instance, web3, pid, amount, address) => {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json',
  )
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  }

  return await instance.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), 'gwei'),
      gas: 160000,
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const harvestAsync = async (instance, web3, pid, address) => {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json',
  )
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  }

  return await instance.methods
    .emergencyWithdraw(pid)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), 'gwei'),
      gas: 160000,
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

const drainAsync = async (instance, web3, pid, address) => {
  const response = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json',
  )
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    fastest: Math.round(response.data.fastest / 10),
  }

  return await instance.methods
    .drain(pid)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), 'gwei'),
      gas: 160000,
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

//----------------------------------------------------------------------------
export function* getBalance() {
  yield takeLatest(actions.GET_BALANCE, function* ({ payload }) {
    const { tokenAddress, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = TOKEN_ABI
    const instance = new web3.eth.Contract(abi, tokenAddress)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const balance = yield call(
      getBalanceAsync,
      instance,
      accounts[0],
      MASTER_VAMPIRE_ADDRESS,
    )
    callback(balance)
  })
}

export function* getAllowance() {
  yield takeLatest(actions.GET_ALLOWANCE, function* ({ payload }) {
    const { tokenAddress, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = TOKEN_ABI
    const instance = new web3.eth.Contract(abi, tokenAddress)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const allowance = yield call(
      getAllowanceAsync,
      instance,
      accounts[0],
      MASTER_VAMPIRE_ADDRESS,
    )
    callback(allowance)
  })
}

export function* getStaked() {
  yield takeLatest(actions.GET_STAKED, function* ({ payload }) {
    const { pid, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = MASTER_VAMPIRE_ABI
    const instance = new web3.eth.Contract(abi, MASTER_VAMPIRE_ADDRESS)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const staked = yield call(getStakedAsync, instance, pid, accounts[0])
    callback(staked)
  })
}

export function* approveToken() {
  yield takeLatest(actions.APPROVE_TOKEN, function* ({ payload }) {
    const { tokenAddress, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = TOKEN_ABI
    const instance = new web3.eth.Contract(abi, tokenAddress)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    // Check balance
    const tokenBalance = yield call(getBalanceAsync, instance, accounts[0])

    // approve with max balance
    const approveResult = yield call(
      approveAsync,
      instance,
      tokenBalance,
      accounts[0],
      MASTER_VAMPIRE_ADDRESS,
    )

    callback(approveResult.status)
  })
}

export function* depositToken() {
  yield takeLatest(actions.DEPOSIT_TOKEN, function* ({ payload }) {
    const { pid, amount, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = MASTER_VAMPIRE_ABI
    const instance = new web3.eth.Contract(abi, MASTER_VAMPIRE_ADDRESS)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const depositResult = yield call(
      depositAsync,
      instance,
      web3,
      pid,
      amount,
      accounts[0],
    )

    callback(depositResult.status)
  })
}

export function* withdrawToken() {
  yield takeLatest(actions.WITHDRAW_TOKEN, function* ({ payload }) {
    const { pid, amount, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = MASTER_VAMPIRE_ABI
    const instance = new web3.eth.Contract(abi, MASTER_VAMPIRE_ADDRESS)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const withdrawResult = yield call(
      withdrawAsync,
      instance,
      web3,
      pid,
      amount,
      accounts[0],
    )

    callback(withdrawResult.status)
  })
}

export function* harvestToken() {
  yield takeLatest(actions.HARVEST_TOKEN, function* ({ payload }) {
    const { pid, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = MASTER_VAMPIRE_ABI
    const instance = new web3.eth.Contract(abi, MASTER_VAMPIRE_ADDRESS)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const harvestResult = yield call(
      harvestAsync,
      instance,
      web3,
      pid,
      accounts[0],
    )

    callback(harvestResult.status)
  })
}

export function* drainToken() {
  yield takeLatest(actions.DRAIN_TOKEN, function* ({ payload }) {
    const { pid, callback } = payload

    const web3 = yield call(getWeb3)
    const abi = MASTER_VAMPIRE_ABI
    const instance = new web3.eth.Contract(abi, MASTER_VAMPIRE_ADDRESS)

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts)

    const drainResult = yield call(drainAsync, instance, web3, pid, accounts[0])

    callback(drainResult.status)
  })
}

export default function* rootSaga() {
  yield all([
    fork(approveToken),
    fork(getAllowance),
    fork(getStaked),
    fork(depositToken),
    fork(withdrawToken),
    fork(harvestToken),
    fork(drainToken),
  ])
}
