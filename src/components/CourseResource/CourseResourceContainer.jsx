import { CloudUpload } from '@styled-icons/heroicons-outline'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseContentRequest, CourseContentRequestIcon } from 'components/CoursePage'
import { ButtonSquare, LoaderAnimation, toast, Tabs } from 'components/shared'
import { API } from 'config/api'
import { useResponsive } from 'hooks'

import { CourseResourceGrid } from './CourseResourceItem'

const CourseResourceContainer = () => {
  const allowedTags = ["Slides", "Books", "PYQs", "Endsem", "Midsem", "Quizzes", "Tutorials", "Assignments"]
  
  const { code } = useParams()
  const navigate = useNavigate()
  const { isMobileS } = useResponsive()
  const [loading, setLoading] = useState(false)    // have the resources loaded or not?
  const [resPerFilter, setResPerFilter] = useState({})   // number of resources per filter
  const [resources, setResources] = useState([])     // resources - currently available resources - store as dictionary
  const [currentTab, setCurrentTab] = useState("All")   // current chosen Tab(filter)
  const [filteredResources, setFilteredResources] = useState([])   // all the filtered resources - store as list
  const [, setProfs] = useState([])
  const [selectedProf, setSelectedProf] = useState("All")
  const [modules, setModules] = useState([])
  const [currentModule, setCurrentModule] = useState("null")    // take care of spurious "null"s that might come mistakenly
  const [allResCount, setAllResCount] = useState(0)
  const [profPerModule, setProfPerModule] = useState({})
  const [years, setYears] = useState([])
  const [yearPerProf, setYearPerProf] = useState({})
  const [currentYear, setCurrentYear] = useState("0")

  const FrontendTag = (tag) => {
    if(!(allowedTags.includes(tag))){
      return "Misc"
    }
    return tag
  }

  useEffect(() => {         
    const fetchResources = async () => {
      try {
        setLoading(true)
        const response = await API.courses.listResources({ code })
        setResources(response)
        setFilteredResources(response)
        const filterSet = []
        const profSet = ["All"]
        const moduleSet = []
        const numRes = {}
        const moduleProfs = {}
        const yearSet = []
        const profYears = {}
        let resCount = 0;
        response.forEach((resource) => {
          resCount += 1;
          
          if(!profSet.includes(resource.author)){
            profSet.push(resource.author)
          }
          if(!moduleSet.includes(resource.modules)){
            moduleSet.push(resource.modules)
          }
          if(!yearSet.includes(resource.year.toString()) && resource.year !== 0){
            yearSet.push(resource.year.toString())
          }
          if(!Object.keys(moduleProfs).includes(resource.modules)){
            moduleProfs[resource.modules] = [resource.author]
          }
          else if(!moduleProfs[resource.modules].includes(resource.author)){            
            moduleProfs[resource.modules].push(resource.author)            
          }
          if(resource.year !== 0){
            const yearString = resource.year.toString()
            if(!Object.keys(profYears).includes(resource.author)){
              profYears[resource.author] = [yearString]
            }
            else if(!profYears[resource.author].includes(yearString)){            
              profYears[resource.author].push(yearString)            
            }  
          }
          resource.tags.forEach((tag) => {
            const frontendTag = FrontendTag(tag)             
            
            if (!filterSet.includes(frontendTag)) {
              filterSet.push(frontendTag)
            }
            if(!(Object.keys(numRes).includes(frontendTag))){
              numRes[frontendTag] = 1
            }
            else{
              numRes[frontendTag] += 1
            }
          })
        })
        if(!(moduleSet.length === 1 && moduleSet[0] === "null")){
          setModules(["All"].concat(moduleSet))
          setCurrentModule("All")         
          const dumString = "All"
          moduleProfs[dumString] = profSet
          setProfPerModule(moduleProfs)
        } 
        else{
          setProfPerModule({"null" : profSet})
        }      
        if(yearSet.length !== 0){
          setYears(["All"].concat(yearSet))
          setCurrentYear("All")
          const dumString = "All"
          profYears[dumString] = ["All"].concat(yearSet)
          setYearPerProf(profYears)
        }
        setSelectedProf("All")
        setAllResCount(resCount)
        setResPerFilter(numRes)
        setProfs(profSet)
      }
      catch (error) {
        toast({ status: 'error', content: error })
      }
      finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [code])

  

  const redirectContribute = () => navigate(`/contribute?course=${code}`)

  const updateFilteredResources = (prof, tab, module_, year) => {
    
    try{
      const numRes = {}
      let resCount = 0;
      Object.keys(resPerFilter).forEach((key) => {numRes[key] = 0})
      const filtered = resources.filter((resource) => {
        if((prof === "All" || resource.author === prof) && (module_ === "All" || module_ === "null" || module_ === resource.modules) && (year === "0" || year === "All" || year === resource.year.toString())){
          resCount += 1;
          let hasValidTag = false;
          for (let i = 0; i < resource.tags.length; i += 1) {              
            const frontendTag = FrontendTag(resource.tags[i])
            if(!(Object.keys(numRes).includes(frontendTag))){
              numRes[frontendTag] = 1
            }
            else{
              numRes[frontendTag] += 1
            }
            if (frontendTag === tab || tab === "All"){              
                hasValidTag = true;                           
            }                    
          }
          if(hasValidTag === true){
            return true;
          }
        }
        return false
      })
      setAllResCount(resCount)
      setResPerFilter(numRes)
      setFilteredResources(filtered)
    }
    catch{
      setFilteredResources([])
    }

  }

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
    updateFilteredResources(selectedProf, tab, currentModule, currentYear)
    
  }

  const handleProfChange = (prof) => {
    setSelectedProf(prof)
    updateFilteredResources(prof, currentTab, currentModule, currentYear)
  }

  const handleModuleChange = (module) => {
    setCurrentModule(module)
    updateFilteredResources(selectedProf, currentTab, module, currentYear)
  }

  const handleYearChange = (year) => {
    setCurrentYear(year)
    updateFilteredResources(selectedProf, currentTab, currentModule, year)    
  }

  const renderResources = (resList) => {
    return(
      <div>
      {resList.length ? (
      <CourseResourceGrid items={resList} />
      ) : (
        <span style={{ fontSize: '0.875rem' }}>No resources found</span>
      )}
      </div>
    )
  }

  const renderModuleDropdown = (modulesList) => {
    if(modulesList.length !== 0){
      return(
        <Select            
            placeholder="Select Module"
            showArrow
            onChange={handleModuleChange}
            >
            {modulesList.map((module_) =>{
              return <Select.Option key={module_}>{module_}</Select.Option>
            })}
        </Select> 
      )
    }
    return(
      null
    )
  }

  const renderYearDropDown = (yearsList) => {
    if(yearsList.length !== 0){
      return(
        <Select  
            style={{
              marginLeft: 'auto',
              alignSelf: 'center',
              paddingLeft: '12%'
            }}          
            placeholder="Select Year"
            showArrow
            onChange={handleYearChange}
            >
            {yearPerProf[selectedProf].map((year_) =>{
              return <Select.Option key={year_}>{year_}</Select.Option>
            })}
        </Select> 
      )
    }
    return null
  }

  

  if (loading) return <LoaderAnimation />

  return (
    <>
      <Header>
        <h1 style={{ fontSize: '1.25rem' }}>Resources</h1>

        <ButtonContainer>
          {isMobileS ? (
            <CourseContentRequestIcon
              code={code}
              type="resources"
              style={{ marginRight: '0.75rem' , marginLeft: '0.75rem'}}
            />
          ) : (
            <CourseContentRequest
              code={code}
              type="resources"
              style={{ marginRight: '0.75rem' , marginLeft: '0.75rem'}}
            />
          )}

          <ButtonSquare
            type="primary"
            onClick={redirectContribute}
            icon={<CloudUpload size="16" />}
          >
            Upload
          </ButtonSquare>
        </ButtonContainer>
      </Header>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {renderModuleDropdown(modules)}  
        {renderYearDropDown(years)}
        <Select    
            style={{
              marginLeft: 'auto',
              alignSelf: 'flex-end'
            }}
            placeholder="Select Prof"
            showArrow
            onChange={handleProfChange}
            >
            {profPerModule[currentModule]?.map((prof) =>{            
              return <Select.Option key={prof}>{prof}</Select.Option>
            })}
        </Select>       
      </Header>
      <Container>        
        <Tabs
          tabheight="2.25rem"
          tabwidth="7.5rem"
          animated
          onChange={handleTabChange}
        >
          <Tabs.TabPane
            key="All"
            tab={
              allResCount
                ? `All (${allResCount})`
                : `All`
            }
          >
           {renderResources(filteredResources)} 
          </Tabs.TabPane>
          {Object.keys(resPerFilter).map((filter) => {            
              return (
              <Tabs.TabPane
                key={filter}
                tab={
                  resPerFilter[filter]     
                    ? `${filter} (${resPerFilter[filter]})`
                    : `${filter}`
                }
              >              
              {renderResources(filteredResources)}
              </Tabs.TabPane>)
            })}

        </Tabs>
      </Container>

      
    </>
  )
}

export default CourseResourceContainer

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 1rem 0;
`

