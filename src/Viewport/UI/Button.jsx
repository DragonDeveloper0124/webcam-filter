import React from "react"
import styled from "styled-components"
import { darken } from "polished"

const ButtonEl = styled.button`
  padding: 0.25rem 0.5rem;
  color: #f0f0f0;
  border: 0;
  cursor: pointer;
  transition: 0.2s ease background-color;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.2, theme.mainColor)};
  }
  &:active {
    background-color: ${({ theme }) => theme.mainColor};
  }
  outline: none !important;
  background-color: ${({ active, theme }) =>
    active ? `${theme.mainColor} !important` : "#404040"};
`

const Button = ({ value, active, onClick, children }) => (
  <ButtonEl
    active={active}
    onClick={() => {
      onClick(value)
    }}
  >
    {children || value}
  </ButtonEl>
)

export default Button
