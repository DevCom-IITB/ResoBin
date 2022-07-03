import axios from 'axios'
import { useState, useEffect } from 'react'

import { Aside, toast } from 'components/shared'
import { API } from 'config/api'

import DepartmentList from './DepartmentList'


const DepartmentsContainer = () => {
  const [loading, setLoading] = useState(true)
  const [departmentData, setDepartmentData] = useState([])
  
  const fetchDepartments = async () => {
    setLoading(true)
    try {
      const response = await API.honors.list()
      setDepartmentData(response)
    } catch (error) {
      if (axios.isCancel(error)) return
      toast({ status: 'error', content: error })
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchDepartments()
  },[])

  return (
    <>
      <DepartmentList
        title="Honors Departments"
        count={departmentData.length}
        departments={departmentData}
        loading={loading}
        setLoading={setLoading}
      />
      <Aside
        loading={loading}
      />
    </>
  )
}

export default DepartmentsContainer
