import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink to="/nerds">
        Nerds
      </StyledLink>
      {/* <StyledLink exact to="/staking">
        Candy
      </StyledLink> */}
      {/* <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink>
      <StyledAbsoluteLink
        href="https://exchange.sushiswapclassic.org"
        target="_blank"
      >
        Exchange
      </StyledAbsoluteLink>*/}
      <StyledAbsoluteLink
        href="#"
        target="_blank"
      >
        About
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: #fecd3e;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[3]}px;
  margin-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #fe833e;
    border-bottom: 3px solid #fe833e;
  }
  &.active {
    color: #fe833e;
    border-bottom: 3px solid #fe833e;
  }
  @media (max-width: 400px) {
    margin-left: ${(props) => props.theme.spacing[2]}px;
    margin-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: #fecd3e;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[3]}px;
  margin-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #fe833e;
    border-bottom: 3px solid #fe833e;
  }
  &.active {
    color: #fe833e;
    border-bottom: 3px solid #fe833e;
  }
  @media (max-width: 400px) {
    margin-left: ${(props) => props.theme.spacing[2]}px;
    margin-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
