import React, { useState } from 'react'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

const CourseInfoTopics = () => {
  const headings = ['Topic1', 'Topic2', 'Topic3', 'Topic4', 'Topic5']
  const content = [
    'Content for Topic1',
    'Content for Topic2',
    'Content for Topic3',
    'Content for Topic4',
    'Content for Topic5',
  ]

  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  return (
    <div>
      {headings.map((heading, index) => (
        <Dropdown key={heading}>
          <DropdownButton
            type="button"
            onClick={() => handleDropdownClick(index)}
          >
            {heading}
          </DropdownButton>
          {activeDropdown === index && (
            <DropdownContent>{content[index]}</DropdownContent>
          )}
        </Dropdown>
      ))}
    </div>
  )
}

export default CourseInfoTopics

const Dropdown = styled.div`
  margin-bottom: 1.5rem; // Increase the space between the cards
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15),
    // Increase the spread and blur radius
    0px 3px 6px 0px rgba(0, 0, 0, 0.1),
    0px 4px 12px -2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.secondary};
  padding: 1rem; // Add some padding to the card
`

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: ${fontSize.responsive.xl};
  font-weight: 600;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

const DropdownContent = styled.p`
  background: ${({ theme }) => theme.cardColor};
  padding: 1rem;
  color: ${({ theme }) => theme.textColor};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`
