import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'

import pageActions from "../../../redux/page/actions";

interface Farm {
  name: string,
  tokenName: string,
  tokenAddress: string,
  visible: boolean,
  _pid: number,
  _victimPoolId: number
}

interface StakeProps {
  farm: Farm
}

const Stake: React.FC<StakeProps> = ({ farm }) => {
  const dispatch = useDispatch();

  const [tokenBalance, setTokenBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const [requestedApproval, setRequestedApproval] = useState(false)

  const getInitValues = useCallback(() => {
    dispatch(pageActions.getBalance(farm.tokenAddress, (balance: any) => setTokenBalance(balance)));
    dispatch(pageActions.getStaked(farm._pid, (staked: any) => setStakedBalance(staked.amount)));
    dispatch(pageActions.getAllowance(farm.tokenAddress, (allowance: any) => setAllowance(allowance)));
  }, [dispatch, farm._pid, farm.tokenAddress])

  useEffect(() => {
    getInitValues()
  }, [dispatch, getInitValues,])

  const handleStake = (amount: any) => {
    dispatch(pageActions.depositToken(farm._pid, amount, callback))
  }

  const handleUnstake = (amount: any) => {
    dispatch(pageActions.withdrawToken(farm._pid, amount, callback))
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={new BigNumber(tokenBalance)}
      onConfirm={handleStake}
      tokenName={farm.tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={new BigNumber(stakedBalance)}
      onConfirm={handleUnstake}
      tokenName={farm.tokenName}
    />,
  )

  const callback = (status: any) => {
    if (status) {
      getInitValues();
    }
  }

  const handleApprove = () => {
    setRequestedApproval(true)
    dispatch(pageActions.approveToken(farm.tokenAddress, (status: any) => {
      if (status) {
        getInitValues();
        setRequestedApproval(false);
      }
    }))
  }

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <img src={require('../../../assets/img/running-nerd.png')} alt="" height="60" />
            </CardIcon>
            <Value value={getBalanceNumber(new BigNumber(stakedBalance))} />
            <Label text={`${farm.tokenName} Tokens Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {allowance <= 0 ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={`Approve ${farm.tokenName}`}
              />
            ) : (
                <>
                  <Button
                    disabled={(new BigNumber(stakedBalance)).eq(new BigNumber(0))}
                    text="Unstake"
                    onClick={onPresentWithdraw}
                  />
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                </>
              )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
