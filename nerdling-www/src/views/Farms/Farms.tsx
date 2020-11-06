import React from 'react'
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import chef from '../../assets/img/chef.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { protocol } = useParams()

  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  
  return (
    <Switch>
        {!!account ? (
          <>
            <Route exact path={path}>
              <FarmCards />
            </Route>
            {/* <Route path={`${path}/:farmId`}>
              <Farm />
            </Route> */}
          </>
        ) : (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={onPresentWalletProviderModal}
                text="🔓 Unlock Wallet"
              />
            </div>
          )}
    </Switch>
  )
}

export default Farms
