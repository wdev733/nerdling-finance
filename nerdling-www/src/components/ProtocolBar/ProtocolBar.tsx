import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import { PROTOCOLS } from '../../helper/constants'

const ProtocolBar: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <StyledNav>
      {PROTOCOLS.map((protocol) => (
        <StyledLink
          key={`protocol_${protocol.link}`}
          exact
          activeClassName="active"
          to={`/nerds/${protocol.link}`}
        >
          {protocol.title}
        </StyledLink>
      ))}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default ProtocolBar
