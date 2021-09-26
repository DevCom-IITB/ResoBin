import { Select } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import filterData from './__mock__/filterData.json'

const OPTIONS = filterData[3].Options.map((data) => ({
  key: data.id,
  value: data.Label,
}))

const MultiSelect = () => {
  const [selectedDept, setSelectedDept] = useState([])
  const [remainingDept, setRemainingDept] = useState(OPTIONS)

  const handleDepartmentSelect = (selectedItems) =>
    setSelectedDept(selectedItems)

  useEffect(() => {
    setRemainingDept(
      OPTIONS.filter((item) => {
        // console.log(item.value)
        return !selectedDept.includes(item.key)
      })
    )
  }, [selectedDept])

  return (
    <StyledSelect
      mode="multiple"
      placeholder="Select departments to filter"
      onChange={handleDepartmentSelect}
      // value={selectedDept}
      // options={remainingDept}
      showArrow
      allowClear
      // loading
      // maxTagCount={1}
      // listHeight="6rem"
      getPopupContainer={(trigger) => trigger.parentNode}
    >
      {remainingDept.map((item) => (
        <Select.Option key={item.key} value={item.key}>
          {item.value}
        </Select.Option>
      ))}
    </StyledSelect>
  )
}

export default MultiSelect

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selection-placeholder {
    font-size: 0.75rem;
    color: #807da0;
  }

  .ant-select-selection-multiple {
    overflow: auto;
    height: 2rem;
    white-space: nowrap;
  }

  .ant-select-selection-item {
    font-size: 0.75rem;
  }

  .ant-select-selector {
    display: flex;
    align-items: center;
    min-height: 2rem;
  }
`
