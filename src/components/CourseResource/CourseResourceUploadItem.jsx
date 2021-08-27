// import { Input } from 'antd'
import { Button } from 'antd'
import styled from 'styled-components/macro'
import { X } from 'styled-icons/heroicons-outline'

// acceptable file types
const fileTypes = [
  { type: 'pdf', icon: 'https://image.flaticon.com/icons/svg/179/179483.svg' },
  { type: 'docx', icon: 'https://image.flaticon.com/icons/svg/281/281760.svg' },
  { type: 'rtf', icon: 'https://image.flaticon.com/icons/svg/136/136539.svg' },
  { type: 'png', icon: 'https://image.flaticon.com/icons/svg/136/136523.svg' },
  { type: 'jpg', icon: 'https://image.flaticon.com/icons/svg/136/136524.svg' },
  { type: 'jpeg', icon: 'https://image.flaticon.com/icons/svg/136/136524.svg' },
  { type: 'txt', icon: 'https://image.flaticon.com/icons/svg/136/136538.svg' },
  { type: '*', icon: 'https://image.flaticon.com/icons/svg/136/136549.svg' },
]

const readURL = (input) => {
  console.log(input)
}

const CourseResourceUploadItem = () => {
  return (
    <>
      {/* <Input placeholder="Title" />
      <Input.TextArea placeholder="Description" /> */}

      {/* <UploadBox>
        <img
          src="https://image.flaticon.com/icons/svg/136/136549.svg"
          className="icon"
          alt="icon"
          width="30px"
        />
        <span className="upl" id="upload">
          Upload document
        </span>
        <input
          type="file"
          className="upload up"
          id="up"
          // onChange={readURL(this)}
        />
      </UploadBox> */}

      <ItemContainer>
        <UploadBox>
          {/* <div className="docErr">Please upload valid file</div> */}
          <img
            src="https://image.flaticon.com/icons/svg/136/136549.svg"
            className="icon"
            alt="icon"
          />

          <span className="upl" id="upload">
            Upload document
          </span>
          <input
            type="file"
            className="upload up"
            id="up"
            onChange="readURL(this);"
          />
        </UploadBox>

        <Input
          type="text"
          className="form-control"
          name=""
          placeholder="Title"
        />

        <Button
          shape="circle"
          type="text"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '1rem',
          }}
          icon={<X size="30" />}
          size="large"
        />
      </ItemContainer>
    </>
  )
}

export default CourseResourceUploadItem

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  margin-bottom: 1rem;
`

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0;
  margin-left: 1rem;
  border: none;
  border-bottom: 1px solid #dddddd;
  border-radius: 0;
  font-size: 0.875rem;
  box-shadow: none;

  &:focus {
    border-color: ${({ theme }) => theme.logo};
    outline: none;
    box-shadow: none;
  }
`

const UploadBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 0.75rem;
  border: 1px solid #777777;
  border-radius: 0.5rem;
  white-space: nowrap;
  color: #777777;
  background-color: transparent;
  cursor: pointer;
  gap: 0.5rem;

  img {
    width: 1.5rem;
  }

  span {
    font-size: 0.75rem;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  /* .docErr {
    position: absolute;
    top: -56px;
    right: auto;
    left: 10px;
    display: none;
    padding: 10px;
    font-size: 15px;
    color: red;
    background-color: #ffffff;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.2);

    &::after {
      content: '\f0d7';
      position: absolute;
      bottom: -40px;
      left: 30px;
      display: inline-block;
      font-size: 50px;
      font-family: FontAwesome, sans-serif;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      color: #ffffff;
    }
  } */
`
