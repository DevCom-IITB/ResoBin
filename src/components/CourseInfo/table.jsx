
import React from 'react';
import styled from 'styled-components/macro';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: bold;
  }
`;

const StyledButton = styled.button`
  border: none;
  padding: 8px;
  text-align: left;
  background-color: transparent;
  cursor: pointer;
`;

const CustomTable = ({ data, columns }) => {
  const handleClick = (code) => {
    const modCode = code.replace(/\s/g, '')
    const url = `https://resobin.gymkhana.iitb.ac.in/courses/${modCode}`
    window.location.href = url;
  };
  
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column}>
                <StyledButton onClick={() => handleClick(row[column])} onKeyDown={handleKeyDown} type="button">
                   {row[column]}
                </StyledButton>

              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
