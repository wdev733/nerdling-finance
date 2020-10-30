import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useRouteMatch, useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from '../../components/DisclaimerModal'
import MobileMenu from '../../components/MobileMenu'
import TopBar from '../../components/TopBar'
import FarmsProvider from '../../contexts/Farms'
import ModalsProvider from '../../contexts/Modals'
import TransactionProvider from '../../contexts/Transactions'
import SushiProvider from '../../contexts/SushiProvider'
import useModal from '../../hooks/useModal'
import theme from '../../theme'
import Farms from '../../views/Farms'
import Home from '../../views/Home'
import Staking from "../../views/Staking";
import ProtocolBar from '../../components/ProtocolBar'
import PageHeader from '../../components/PageHeader'
import { PROTOCOLS } from "../../helper/constants";
import Page from '../../components/Page'

import logo from '../../assets/img/logo.png'

const Nerds: React.FC = () => {
  const { path } = useRouteMatch();
  const { protocol } = useParams();

  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])


  if (path === '/nerds' || path === '/nerds/') {
    return (<Redirect to={`/nerds/${PROTOCOLS[0].link}`} />);
  }

  return (
    <>
      <Page>
        <PageHeader
          icon={<img src={logo} height="120" alt="" />}
          subtitle="Earn NERDLING tokens by staking NERD's Tokens."
          title="Select Your Favorite Nerds"
        />
        <ProtocolBar />
        <Farms />
      </Page>
    </>
  )
}

export default Nerds
