import { Select } from 'antd'
import { useEffect, useState } from 'react'

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
    <Select
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
      dropdownAlign={{
        overflow: { adjustY: 0 },
      }}
      getPopupContainer={(trigger) => trigger.parentNode}
    >
      {remainingDept.map((item) => (
        <Select.Option key={item.key} value={item.key}>
          {item.value}
        </Select.Option>
      ))}
    </Select>
  )
}

export default MultiSelect
