import { useState } from 'react'
import styled from 'styled-components/macro'

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  margin: 0.75rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  appearance: none;
  gap: 2%;
`

const Label = styled.label`
  width: 100%;
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textColor};
`

// const StyledTextarea = styled.label`
//   margin: 2rem;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 2rem;
//   color: #0d001a;
//   background-color: #e6ecff;
//   appearance: none;
// `

const SelectElement = styled.select`
  flex: 100%;
  padding: 10px 10px;
  border: 1px solid white;
  border-radius: 5px;
  color: grey;
  background-color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
    outline: none;
  }
  &:focus {
    border: 1px solid #bbbbbb;
  }
  &:active {
    border: 1px solid #ffffff;
  }
`
const SelectElement1 = styled.select`
  flex: 48%;
  padding: 10px 10px;
  margin-right: 10px;
  border: 1px solid white;
  border-radius: 5px;
  color: grey;
  background-color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
    outline: none;
  }
  &:focus {
    border: 1px solid #bbbbbb;
  }
  &:active {
    border: 1px solid #ffffff;
  }
`
const InputElement = styled.input`
  flex: 100%;
  padding: 10px 10px;
  border: 1px solid white;
  border-radius: 5px;
  color: grey;
  background-color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
    outline: none;
  }
  &:focus {
    border: 1px solid #bbbbbb;
  }
  &:active {
    border: 1px solid #ffffff;
  }
`
const TextareaElement = styled.textarea`
  flex: 100%;
  height: 150px;
  border: 1px solid white;
  border-radius: 5px;
  color: grey;
  background-color: white;
  cursor: pointer;
  &:hover {
    border: 1px solid #bbbbbb;
    outline: none;
  }
  &:focus {
    border: 1px solid #bbbbbb;
  }
  &:active {
    border: 1px solid #ffffff;
  }
`
const FormElement = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 48%;
`
const FormElement1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 98%;
  padding-left: 15px;
`

const FileDetailsForm = (props) => {
  const [resourcetype, setResourcetype] = useState('')
  const [renamefile, setRenamefile] = useState('')
  const [description, setDescription] = useState('')
  const [coursecode, setCoursecode] = useState('')
  const [semester, setSemester] = useState('')
  const [year, setYear] = useState('')
  const [professor, setProfessor] = useState('')

  return (
    <Form
      onChange={() => {
        props.handleParentFun({
          resourcetype,
          renamefile,
          description,
          coursecode,
          semester,
          year,
          professor,
        })
      }}
    >
      <FormElement>
        <Label>Resources type*</Label>
        <SelectElement
          name="resourcetype"
          required
          value={resourcetype}
          onChange={(e) => setResourcetype(e.target.value)}
        >
          <option disabled selected>
            Quiz 1 paper,Notes,etc.
          </option>
          <option value="quiz1">Quiz 1</option>
          <option value="quiz2">Quiz 2</option>
          <option value="quiz3">Quiz 3</option>
          <option value="quiz4">Quiz 4</option>
          <option value="midsem">Midsem</option>
          <option value="endsem">Endsem</option>
          <option value="notes">Notes</option>
          <option value="books">Books</option>
        </SelectElement>
        <Label>Rename File</Label>
        <InputElement
          type="text"
          name="rename"
          placeholder="Eg:CL202_autumn_2019_quiz_1.pdf"
          value={renamefile}
          onChange={(e) => setRenamefile(e.target.value)}
        />
      </FormElement>

      <FormElement>
        <Label>Resource Description</Label>
        <TextareaElement
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
          Input Body
        </TextareaElement>
      </FormElement>

      <FormElement1>
        <Label>Course</Label>
        <SelectElement
          name="coursecode"
          required
          value={coursecode}
          onChange={(e) => setCoursecode(e.target.value)}
        >
          <option disabled selected>
            Select courses
          </option>
          <option value="ae">AE</option>
          <option value="bb">BB</option>
          <option value="ce">CE</option>
          <option value="ch">CH</option>
          <option value="cl">CL</option>
          <option value="cm">CM</option>
          <option value="cs">CS</option>
          <option value="ds">DS</option>
          <option value="ee">EE</option>
          <option value="en">EN</option>
          <option value="ent">ENT</option>
          <option value="es">ES</option>
          <option value="et">ET</option>
          <option value="gnr">GNR</option>
          <option value="gp">GP</option>
          <option value="hs">HS</option>
          <option value="de">DE</option>
          <option value="ie">IE</option>
          <option value="ma">MA</option>
          <option value="si">SI</option>
          <option value="me">ME</option>
          <option value="mm">MM</option>
          <option value="ph">PH</option>
          <option value="sc">SC</option>
        </SelectElement>
      </FormElement1>

      <FormElement>
        <Label>Offered in*</Label>
        <SelectElement1
          name="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option disabled selected>
            Semester
          </option>
          <option value="sem1">SEMESTER 1</option>
          <option value="sem2">SEMESTER 2</option>
        </SelectElement1>
        <SelectElement1
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option disabled selected>
            Year
          </option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </SelectElement1>
      </FormElement>

      <FormElement>
        <Label>Professor</Label>
        <InputElement
          type="text"
          name="professor"
          placeholder="John Doe"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
        />
      </FormElement>
    </Form>
  )
}

export default FileDetailsForm
