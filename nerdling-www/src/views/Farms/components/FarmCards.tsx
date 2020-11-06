import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import BigNumber from 'bignumber.js'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
// import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import { useParams } from 'react-router-dom'

import { getNerdsByAdapter } from '../../../helper/adapters';
import { NERDLING_POOL } from "../../../helper/constants";

import pageActions from "../../../redux/page/actions";

interface Farm {
  name: string,
  tokenName: string,
  tokenAddress: string,
  visible: boolean,
  _pid: number,
  _victimPoolId: number
}

interface Adapter {
  name: string,
  address: string,
  images: number,
}

const FarmCards: React.FC = () => {
  const dispatch = useDispatch();

  const { protocol } = useParams()
  const { account } = useWallet()

  const selectedFarms = getNerdsByAdapter(protocol)

  const rows = [NERDLING_POOL, ...selectedFarms.pools].reduce(
    (farmRows: any, farm: any) => {
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([{ ...farm }])
      } else {
        newFarmRows[newFarmRows.length - 1].push({ ...farm })
      }
      return newFarmRows
    },
    [[]],
  )

  const adapter = {
    name: selectedFarms.name,
    address: selectedFarms.address,
    images: selectedFarms.images
  }

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow: any, i: any) => (
          <StyledRow key={i}>
            {farmRow.map((farm: any, j: any) => (
              <React.Fragment key={j}>
                <FarmCard master={i === 0 && j === 0 ? true : false} adapter={adapter} farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
          <StyledLoadingWrapper>
            <Loader text="Cooking the rice ..." />
          </StyledLoadingWrapper>
        )}
    </StyledCards>
  )
}

interface FarmCardProps {
  master: boolean,
  adapter: Adapter,
  farm: Farm
}

const FarmCard: React.FC<FarmCardProps> = ({ master, adapter, farm }) => {

  const dispatch = useDispatch();

  const { protocol } = useParams()
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  const handleDrain = () => {
    dispatch(pageActions.drainToken(farm._pid, callbackDrain));
  }

  const callbackDrain = (status: any) => {
    console.log(status);
  }

  const poolActive = true // startTime * 1000 - Date.now() <= 0
  return (
    <StyledCardWrapper>
      {master && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <img
                src={master ? require(`../../../assets/img/logo.png`) : require(`../../../assets/img/nerds/${protocol}/${farm._victimPoolId % adapter.images + 1}.png`)}
                alt=""
                height="65"
              />
            </CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              {/* <StyledDetail>Deposit {farm.lpToken}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail> */}
              <StyledDetail>{`Deposit ${farm.tokenName}`}</StyledDetail>
              <StyledDetail>Earn Nerdling</StyledDetail>
            </StyledDetails>
            <StyledInsight>
              <span>APY</span>
              <span>
                54.7%
              </span>
            </StyledInsight>
            <StyledInsight>
              <span>TVL{` `}($)</span>
              <span>1,336,443</span>
            </StyledInsight>
            {/* <StyledInsight>
              <span>HARVEST{` `}(DRC)</span>
              <span>0.00</span>
            </StyledInsight> */}
            <Spacer />
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/nerds/${protocol}/${farm._pid}`}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Drain' : undefined}
              onClick={handleDrain}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
