import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin-bottom:10px;
  text-align: start;
  margin: 2rem;
  appearance: none;
  background-color:  #e6ecff;
  color:#0d001a;
  font-family: Muslin;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
`

const Label = styled.label`
  width:100%;
  margin-top:10px;
  margin-bottom:10px;
`
const StyledTextarea = styled.label`
  margin: 2rem;
  appearance: none;
  background-color:  #e6ecff;
  color:#0d001a;
  font-family: Muslin;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
`

const SelectElement = styled.select`
  flex: 100%;
  padding :10px 10px;
  color : grey;
  background-color:white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    outline:none;
    border: 1px solid #bbbbbb;}
  &:focus{
    border: 1px solid #bbbbbb;
  }
  &:active{
    border: 1px solid #ffffff;
  }
`
const SelectElement1 = styled.select`
  flex: 48%;
  padding :10px 10px;
  margin-right:10px;
  color : grey;
  background-color:white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    outline:none;
    border: 1px solid #bbbbbb;}
  &:focus{
    border: 1px solid #bbbbbb;
  }
  &:active{
    border: 1px solid #ffffff;
  }
`
const InputElement = styled.input`
  flex:100%;
  padding :10px 10px;
  color : grey;
  background-color:white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    outline:none;
    border: 1px solid #bbbbbb;}
  &:focus{
    border: 1px solid #bbbbbb;
  }
  &:active{
    border: 1px solid #ffffff;
  }
`
const TextareaElement = styled.textarea`
  flex:100%;
  height : 150px;
  color : grey;
  background-color:white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    outline:none;
    border: 1px solid #bbbbbb;}
  &:focus{
    border: 1px solid #bbbbbb;
  }
  &:active{
    border: 1px solid #ffffff;
  }
`
const FormElement = styled.div`
  display:flex;
  flex-wrap:wrap;
  width:48%;
  padding-left:15px;
  margin-right:20px;
`
const FormElement1 = styled.div`
  display:flex;
  flex-wrap:wrap;
  width:98%;
  padding-left:15px;
  `



const FileDetailsForm = (props) =>{
    const  [resourcetype, setResourcetype] = useState("");
    const [renamefile, setRenamefile] = useState("");
    const [description, setDescription] = useState("");
    const [coursecode, setCoursecode] = useState("");
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");
    const [professor, setProfessor] = useState("");
    
    return(<Form onChange={() =>{props.handleParentFun({
      resourcetype : resourcetype,
      renamefile : renamefile,
      description : description,
      coursecode : coursecode,
      semester : semester,
      year : year,
      professor : professor
    })}}>
        <FormElement>
        <Label>Resources type*</Label>
          <SelectElement name="resourcetype"  required value={resourcetype} onChange={(e) => setResourcetype(e.target.value)}>
          <option disabled selected>Quiz 1 paper,Notes,etc.</option>
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
          <InputElement type="text" name="rename" placeholder="Eg:CL202_autumn_2019_quiz_1.pdf" value={renamefile} onChange={(e) => setRenamefile(e.target.value)}/>
          </FormElement>
          <FormElement>
            <Label>Resource Description</Label>
            <TextareaElement value={description} onChange={(e) => setDescription(e.target.value)}>Input Body</TextareaElement>
          </FormElement>
          <FormElement1>
            <Label>Course</Label>
            <SelectElement name="coursecode" required value={coursecode} onChange={(e) => setCoursecode(e.target.value)}>
        <option disabled selected>Select courses</option>
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
          <SelectElement1 name="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option disabled selected>Semester</option>
            <option value="sem1">SEMESTER 1</option>
            <option value="sem2">SEMESTER 2</option>
          </SelectElement1>
          <SelectElement1 name="year" value={year} onChange={(e) => setYear(e.target.value)}>
          <option disabled selected>Year</option>
          <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </SelectElement1>
          </FormElement>
         <FormElement>
           <Label>Professor</Label>
           <InputElement type="text" name="professor" placeholder="John Doe" value={professor} onChange={(e) => setProfessor(e.target.value)}/>
         </FormElement>
      </Form>
    )
}


export default FileDetailsForm;