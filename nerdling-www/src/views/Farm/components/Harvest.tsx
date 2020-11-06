import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import { getBalanceNumber } from '../../../utils/formatBalance'

import pageActions from "../../../redux/page/actions";

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const dispatch = useDispatch();

  const [earnings, setEarnings] = useState(0);
  const [pendingTx, setPendingTx] = useState(false)

  const getInitValues = useCallback(() => {
    dispatch(pageActions.getStaked(pid, (staked: any) => setEarnings(staked.rewardDebt)));
  }, [dispatch, pid])

  useEffect(() => {
    getInitValues()
  }, [dispatch, getInitValues])

  const { onReward } = useReward(pid)
  const handleHarvest = () => {
    setPendingTx(true)
    dispatch(pageActions.harvestToken(pid, callbackHarvest));
  }

  const callbackHarvest = (status: any) => {
    console.log(status);
    setPendingTx(false)
  }

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={require('../../../assets/img/logo.png')} alt="" height="60" /></CardIcon>
            <Value value={getBalanceNumber(new BigNumber(earnings))} />
            <Label text="NERDLING Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={earnings <= 0 || pendingTx}
              text={pendingTx ? 'Collecting NERDLING' : 'Harvest'}
              onClick={handleHarvest}
            />
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

const StyledSpacer = styled.div`
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

export default Harvest
