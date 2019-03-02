import React from "react"
import styled from "styled-components"

const Button = styled.button`
  position: absolute;
  right: 100%;
  top: 0;
  padding: 0.8rem;
  cursor: pointer;
  outline: none !important;
  background: transparent;
  border: 0;
  opacity: 0.4;
  transition: 0.35s ease opacity;
  &:hover {
    opacity: 0.8;
  }
`

const BarWrap = styled.div`
  width: 32px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`

const Bar = styled.div`
  background-color: ${({ theme }) => theme.fontColor};
  width: 100%;
  height: 4px;
  border-radius: 6rem;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
`

const Bar1 = styled(Bar)`
  transition: 0.5s ease transform;
  transform: ${({ open }) =>
    open ? "translate(0, 10px) rotate(45deg)" : "translate(0, 0) rotate(0)"};
`

const Bar2 = styled(Bar)`
  transition: 0.5s ease opacity;
  opacity: ${({ open }) => (open ? 0 : 1)};
`

const Bar3 = styled(Bar)`
  transition: 0.5s ease transform;
  transform: ${({ open }) =>
    open ? "translate(0, -10px) rotate(-45deg)" : "translate(0, 0) rotate(0)"};
`

const MenuButton = ({ open, onClick }) => (
  <Button onClick={onClick}>
    <BarWrap>
      <Bar1 open={open} />
      <Bar2 open={open} />
      <Bar3 open={open} />
    </BarWrap>
  </Button>
)

export default MenuButton
