import { Filter, X } from '@styled-icons/heroicons-outline'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useViewportContext } from 'context/ViewportContext'
import { breakpoints } from 'styles/responsive'

const IconContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  background: ${({ theme }) => theme.logo};
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.6);
  cursor: pointer;
`

const FilterFloatButton = ({ showFilter, setShowFilter }) => {
  // ? responsive layout state
  const { width } = useViewportContext()
  const [Icon, setIcon] = useState(Filter)

  // ? show or hide dropdown filters state
  const toggleFilter = () => setShowFilter(!showFilter)

  // ? dropdown disabled on wide screens
  useEffect(() => {
    if (width > breakpoints.lg) {
      setShowFilter(false)
      setIcon(null)
    } else setIcon(showFilter ? X : Filter)
  }, [showFilter, setShowFilter, width])

  return (
    Icon && (
      <IconContainer onClick={toggleFilter}>
        <Icon size="1.5rem" />
      </IconContainer>
    )
  )
}

export default FilterFloatButton
