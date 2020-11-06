import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0xbde001c5700fd7a1c749440e11e9d10fdd3ad7cf"
      >
        NERDLING Contract
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Medium
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
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

export default Nav
