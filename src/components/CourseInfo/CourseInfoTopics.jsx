import React, { useState } from 'react'
import styled from 'styled-components/macro'


import { fontSize } from 'styles/responsive'

import  topics  from './data'
import CustomTable from './table'



 
const CourseInfoTopics = () => {

  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeTableDropdown, setActiveTableDropdown] = useState(null)

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleTableDropdownClick = (index) => {
    setActiveTableDropdown(activeTableDropdown === index ? null : index)
  }

  return (
    <div>
      {topics.map((topic, index) => (
        <Dropdown key = {topic.id}>
          <DropdownButton
            type="button"
            onClick={() => handleDropdownClick(index)}
          >
            {topic.headings}
          </DropdownButton>
          {activeDropdown === index ? (
            <DropdownContent>
             {topic.contents.map((content) =>(
              <div>
              <h2>{content.subheading}</h2>
              <p>{content.description}
              {content.link ? (
                      <a href={content.link} target="_blank" rel="noreferrer" >
                        {content.linktext}
                        </a>
                      
                    ):null}
              </p>
              {content.tbody ? (
                  <TableWrapper>
                    <CustomTableStyled data={content.tbody} columns={content.tcols} />
                  </TableWrapper>
              ) : null}
              <Dropdown key={content.id}>
                  <DropdownButton
                    type="button"
                    onClick={() =>handleTableDropdownClick(index)}
                  >
                    {content.dropdownheading}
                  </DropdownButton>
                  {activeTableDropdown === index ? (
                    <DropdownContent>
                      {content.dropdowntcols ? (
                  <TableWrapper>
                    <CustomTableStyled data={content.dropdowntbody} columns={content.dropdowntcols} />
                  </TableWrapper>
              ) : null}
                    </DropdownContent>

                  ): null}
                  </Dropdown>

              
              </div>
           
             ))}
            </DropdownContent>
          ): null}
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
  font-family: 'Source Sans Pro'
`
const TableWrapper = styled.div`
  margin-top: 1rem;
`;

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
`;