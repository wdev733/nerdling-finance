import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useSushi from '../../hooks/useSushi'
import { getMasterChefContract } from '../../sushi/utils'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

import { getNerdsByAdapter } from '../../helper/adapters';
import { NERDLING_POOL } from "../../helper/constants";

const Farm: React.FC = () => {
  const { farmId, protocol } = useParams()

  const selectedFarms = getNerdsByAdapter(protocol)

  const farm = farmId == 0 ? NERDLING_POOL : selectedFarms.pools.filter((p: any) => p._pid == farmId)[0];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <PageHeader
        icon={farmId == 0 ? <img src={require(`../../assets/img/logo.png`)} alt="" height="100" /> : <img src={require(`../../assets/img/nerds/${protocol}/${farm._victimPoolId % selectedFarms.images + 1}.png`)} alt="" height="100" />}
        subtitle={`Deposit ${farm.name}`}
        title={farm.name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={farm._pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake farm={{ ...farm }} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake LP tokens, the contract will
          automagically harvest NERDLING rewards for you!
        </StyledInfo>
        <Spacer size="md" />
        <StyledLink
          target="__blank"
          href={`https://sushiswap.vision/pair/${farm.tokenAddress}`}
        >
          {/* {lpTokenName} Info */}Info
        </StyledLink>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Farm
