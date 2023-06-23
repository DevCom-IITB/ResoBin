import React, { useState } from 'react'
import styled from 'styled-components/macro'

import { fontSize } from 'styles/responsive'

import topics from './data'
import CustomTable from './table'

const headingStyle = {
  fontSize: '1rem',
}

const CourseInfoTopics = () => {
  const [activeDropdown, setActiveDropdown] = useState(0)
  const [activeTableDropdown, setActiveTableDropdown] = useState(
    Array(topics.length).fill(null)
  )

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleTableDropdownClick = (index) => {
    const updatedDropdown = activeTableDropdown.map((value, i) => {
      if (i === index) {
        return value === null ? index : null
      }
      return null
    })
    setActiveTableDropdown(updatedDropdown)
  }

  return (
    <div>
      {topics.map((topic, index) => (
        <Dropdown key={topic.id}>
          <DropdownButton
            type="button"
            onClick={() => handleDropdownClick(index)}
          >
            {topic.headings}
          </DropdownButton>
          {index === 0 || activeDropdown === index ? (
            <DropdownContent>
              {topic.contents.map((content, contentIndex) => (
                <div key={content.id}>
                  <h2 style={headingStyle}>{content.subheading}</h2>
                  <p>
                    {content.description}
                    {content.link ? (
                      <a href={content.link} target="_blank" rel="noreferrer">
                        {content.linktext}
                      </a>
                    ) : null}
                  </p>
                  {content.tbody ? (
                    <TableWrapper>
                      <CustomTableStyled
                        data={content.tbody}
                        columns={content.tcols}
                      />
                    </TableWrapper>
                  ) : null}
                  {content.dropdownheading ? (
                    <Dropdown key={content.id}>
                      <DropdownButton
                        type="button"
                        onClick={() => handleTableDropdownClick(contentIndex)}
                      >
                        {content.dropdownheading}
                      </DropdownButton>
                      {activeTableDropdown[contentIndex] !== null ? (
                        <DropdownContent>
                          {content.dropdowntcols ? (
                            <TableWrapper>
                              <CustomTableStyled
                                data={content.dropdowntbody}
                                columns={content.dropdowntcols}
                              />
                            </TableWrapper>
                          ) : null}
                        </DropdownContent>
                      ) : null}
                    </Dropdown>
                  ) : null}
                </div>
              ))}
            </DropdownContent>
          ) : null}
        </Dropdown>
      ))}
    </div>
  )
}

export default CourseInfoTopics

const Dropdown = styled.div`
  margin-bottom: 1.5rem;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15),
    0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 4px 12px -2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.secondary};
  padding: 0rem;
`

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: ${fontSize.responsive.md};
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
  font-size: ${fontSize.responsive.sm};
  font-family: Montserrat, sans-serif;
`

const TableWrapper = styled.div`
  margin-top: 1rem;
  max-height: 300px; /* Set the maximum height for the table */
  overflow: auto; /* Enable scrolling when the content exceeds the height */
`

const CustomTableStyled = styled(CustomTable)`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
    background-color: #f2f2f2;
  }
`
