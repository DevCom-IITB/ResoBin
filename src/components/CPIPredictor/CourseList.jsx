import React from 'react';
import styled from 'styled-components/macro';


// Styled components
const CourseListContainer = styled.div`
margin-bottom: 1rem;
padding: 1.5rem 1rem;
color: ${({ theme }) => theme.textColor};
background: ${({ theme }) => theme.secondary};
border-radius: ${({ theme }) => theme.borderRadius}
`;

// const Title = styled.h2`
//   color: #ecf0f1;
//   border-bottom: 1px solid #34495e;
//   padding-bottom: 10px;
//   margin-bottom: 20px;
// `;

const CourseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  color: #ecf0f1;
  font-family: 'Noto Sans', sans-serif; /* Specify the Noto Sans font */
  font-weight: 600; /* 600 for semi-bold */
  font-size : 1rem;
  margin : 0.7rem;
`;


const TableRow = styled.tr`
  color: #585280;
`;

const TableCell = styled.td`
  padding: 8px 16px; // Adjust padding to match the image
  color: #ecf0f1; // Text color from the image
  &:last-child {
    text-align: right; // Align the last cell's text to the right
  }
`;

const SelectContainer = styled.div`
  // Add styles if necessary, or use this container as-is
`;

const CustomSelect = styled.select`
  background-color: #585280; // Select background color from the image
  border: none; // Remove default border
  color: #ecf0f1; // Text color from the image
  padding: 5px 10px; // Padding to make the select box taller
  margin-right: 40px; // Space to the right of the select
  border-radius: 4px; // Optional: if you want rounded corners

  &:focus {
    outline: none; // Remove the default focus outline
    border: 1px solid #2980b9; // Focus border color, adjust as necessary
  }
`;

const Button = styled.button`
  background-color: #585280;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin : 5px;

`;


const TableBody = styled.tbody`
  background: #585280; /* A dark blue background as seen in the image */
  color: #ecf0f1; /* A light grayish color for the text as seen in the image */
  border-radius: 10px; /* Apply 5px border-radius */
  margin: 10px; /* Add margin around the table body */
  overflow: hidden; /* Ensures the inner content respects the border-radius */
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #ecf0f1; // Text color
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; // Adjust gap as necessary
`;
const TableHead = styled.thead`
  color: #ecf0f1; /* Light text color for contrast */
  border-radius: 5px; /* Apply 5px border-radius */
  margin-bottom: 10px; /* Add margin below the table head */
  overflow: hidden; /* Ensures the border-radius is applied */
`;


// const IndexContainer = styled.div`
//   display: flex;
//   gap: 10px; // Adjust gap as necessary
//   align-items: center;
// `;

const IndexInputWrapper = styled.div`
background: #585280;
  display: flex;
  align-items: right;
  margin : 5px 5px 0px 0px;
  border-radius: 5px;
`;

// Adjust the StyledInput to better match the design in the screenshot
const StyledInput = styled.input`
  background-color: #585280;
  color: #ecf0f1;
  border: 1px solid #585280;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.5rem;
  width: 80px; // Adjust the width as needed to match the image
  text-align: center;
  margin: 0 5px; // Add some margin for spacing

`;

const TopTableRow = styled.tr`
  margin : 10px
  &:first-child {
    th {
      &:first-child {
        border-top-left-radius: 5px; /* Round the top-left corner */
      }
      &:last-child {
        border-top-right-radius: 5px; /* Round the top-right corner */
      }
    }
  }
`;

// Adjust the IndexLabel to better match the design in the screenshot
const IndexLabel = styled.label`
  color: #ecf0f1;
  margin: 0.5rem;

`;

// React component
const CourseListComponent = ({ courseDetails }) => {
  // Function to render the table rows
  const renderTableRows = (details) => {
    return details.map(innerArray => (
      innerArray.map(course => (
        <TableRow key={course.code}>
          <TableCell> {course.code} {course.title} </TableCell>
          <TableCell>{course.tags.join(', ')}</TableCell> {/* Assuming you want to display all tags */}
          <TableCell>{course.credits}</TableCell>
          <TableCell>
            <SelectContainer>
              <CustomSelect id={`grade-select-${course.code}`}>
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </CustomSelect>
            </SelectContainer>
          </TableCell>
        </TableRow>
      ))
    ));    
  };

  return (
    <CourseListContainer>
      <CourseTable>
        <TableHead>
          <TopTableRow>
            <TableHeader>Courses Undertaken</TableHeader>
            <TableHeader>Tag</TableHeader>
            <TableHeader>Credits</TableHeader>
            <TableHeader>Expected Grade</TableHeader>
          </TopTableRow>
        </TableHead>
        <TableBody>
          {renderTableRows(courseDetails)}
        </TableBody>
      </CourseTable>
      <Footer>
  <ButtonGroup>
    <Button>Add a course +</Button>
    <Button>Save</Button>
  </ButtonGroup>
  <IndexInputWrapper>
    <IndexLabel htmlFor="predicted-cpi">Predicted cpi:</IndexLabel>
    <StyledInput type="number" id="predicted-cpi" placeholder="0.00" min="0" step="0.01" />
  </IndexInputWrapper>
  <IndexInputWrapper>
    <IndexLabel htmlFor="predicted-spi">Predicted spi:</IndexLabel>
    <StyledInput type="number" id="predicted-spi" placeholder="0.00" min="0" step="0.01" />
  </IndexInputWrapper>
</Footer>
    </CourseListContainer>
  );
};

export default CourseListComponent;
