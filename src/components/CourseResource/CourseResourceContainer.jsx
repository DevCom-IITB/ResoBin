import { CloudUpload } from '@styled-icons/heroicons-outline'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { CourseContentRequest, CourseContentRequestIcon } from 'components/CoursePage'
import { ButtonSquare, LoaderAnimation, toast, Tabs, NotFoundSearch } from 'components/shared'
import { API } from 'config/api'
import { useResponsive } from 'hooks'

import { CourseResourceGrid } from './CourseResourceItem'

const CourseResourceContainer = () => {
  const allowedTags = ["Slides", "Textbooks", "PYQs", "Tutorials", "Assignments", "Labs"]
  
  const defaultYear = "0"
  const [profDropValue, setProfDropValue] = useState("Select Prof")
  const [moduleDropValue, setModuleDropValue] = useState("Select Module")
  const [yearDropValue, setYearDropValue] = useState("Select Year")
  const { code } = useParams()
  const navigate = useNavigate()
  const { isMobileS } = useResponsive()
  const [loading, setLoading] = useState(false)    // have the resources loaded or not?
  const [resPerFilter, setResPerFilter] = useState({})   // number of resources per filter
  const [resources, setResources] = useState([])     // resources - currently available resources - store as dictionary
  const [currentTab, setCurrentTab] = useState("All")   // current chosen Tab(filter)
  const [filteredResources, setFilteredResources] = useState([])   // all the filtered resources - store as list
  const [, setProfs] = useState([])
  const [selectedProf, setSelectedProf] = useState("null")
  const [modules, setModules] = useState([])
  const [currentModule, setCurrentModule] = useState("null")    
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
          if(!profSet.includes(resource.author) && resource.author !== "null"){            
            profSet.push(resource.author)
          }
          if(!moduleSet.includes(resource.modules)){
            moduleSet.push(resource.modules)
          }
          if(resource.year !== 0 && (typeof resource.year === "number") && !yearSet.includes(resource.year.toString())){  // year has to be a number field
            yearSet.push(resource.year.toString())
          }
          // if(!Object.keys(moduleProfs).includes(resource.modules) && resource.author !== "null"){
          if(resource.author !== "null"){
            if(!Object.keys(moduleProfs).includes(resource.modules)){  
              moduleProfs[resource.modules] = [resource.author]
            }
            // else if(!moduleProfs[resource.modules].includes(resource.author) && resource.author !== "null"){            
            else if(!moduleProfs[resource.modules].includes(resource.author)){            
              moduleProfs[resource.modules].push(resource.author)            
            }
          }
          // if(resource.year !== 0 && (typeof resource.year === "number") && resource.author !== "null"){
          if(resource.year !== 0 && (typeof resource.year === "number")){
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
        if(yearSet.length !== 0){
          yearSet.sort()
          yearSet.reverse()
        }
        if(profYears.length !== 0){
          Object.keys(profYears).forEach((prof) => {
            profYears[prof].sort()
            profYears[prof].reverse() 
          })
        }
        if(!(moduleSet.length === 1 && moduleSet[0] === "null")){
          const reducedModuleSet = moduleSet?.filter((module) => {
            if(module === "null"){
              return false
            }
            return true
          })
          setModules(["All"].concat(reducedModuleSet))
          setCurrentModule("All")         
          const dumString = "All"
          moduleProfs[dumString] = profSet
          setProfPerModule(moduleProfs)
        } 
        else{
          setProfPerModule({"null" : profSet})
        }      
        if(!(profSet.length === 2 && profSet[1] === "null")){
          const reducedProfSet = profSet?.filter((prof) => {
            if(prof === "null"){
              return false
            }
            return true
          })
          setProfs(reducedProfSet)
          setSelectedProf("All")
          const dumString = "All"
          profYears[dumString] = ["All"].concat(yearSet)
          setYearPerProf(profYears)
        }
        else{
          setYearPerProf({"null" : ["All"].concat(yearSet)})
        }
        if(yearSet.length !== 0){
          setYears(["All"].concat(yearSet))
          setCurrentYear("All")
          // const dumString = "All"
          // profYears[dumString] = ["All"].concat(yearSet)
          // setYearPerProf(profYears)
        }
        // setSelectedProf("All")
        // setProfs(profSet)     
        setAllResCount(resCount)
        setResPerFilter(numRes)
        
        
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
    
    const numRes = {}  
    Object.keys(resPerFilter).forEach((key) => {numRes[key] = 0})
    try{
      
      let resCount = 0;      
      
      const filtered = resources.filter((resource) => {
        if((prof === "All" || prof === "null" || resource.author === prof) && (module_ === "All" || module_ === "null" || module_ === resource.modules) && (year === "0" || year === "All" || year === resource.year.toString())){
          
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
      setResPerFilter(numRes)
      setAllResCount(0)
    }

  }

  const handleTabChange = (tab) => {
    setCurrentTab(tab)    
    updateFilteredResources(selectedProf, tab, currentModule, currentYear)    
  }

  const handleProfChange = (prof) => {
    setSelectedProf(prof)
    setProfDropValue(prof)
    setCurrentYear(defaultYear)
    setYearDropValue("Select Year")
    updateFilteredResources(prof, currentTab, currentModule, defaultYear)
  }

  const handleModuleChange = (module) => {
    setCurrentModule(module)
    setModuleDropValue(module)
    setCurrentYear(defaultYear)
    setYearDropValue("Select Year")
    setSelectedProf("All")
    setProfDropValue("Select Prof")
    updateFilteredResources("All", currentTab, module, defaultYear)
  }

  const handleYearChange = (year) => {
    setCurrentYear(year)
    setYearDropValue(year)
    updateFilteredResources(selectedProf, currentTab, currentModule, year)    
  }

  const renderResources = (resList) => {
    return(
      <div>
      {resList.length ? (
      <CourseResourceGrid items={resList} />
      ) : (
        <NotFoundSearch active/>
      )}
      </div>
    )
  }

  const renderModuleDropdown = (modulesList) => {
    if(modulesList.length !== 0){
      return(
        <ResourcesCustomSelect            
            style={{
            //   marginLeft: 'auto',
            //   alignSelf: 'end',
              marginRight: '2rem'
            }}
            placeholder="Select Module"            
            showArrow            
            onChange={handleModuleChange}
            value={moduleDropValue}
            >
            {modulesList?.map((module_) => {
              return <Select.Option key={module_}>{module_}</Select.Option>
            })}
        </ResourcesCustomSelect> 
      )
    }
    return(
      null
    )
  }

  const renderProfDropDown = () => {
    return(
      <ResourcesCustomSelect    
            style={{
              // marginLeft: 'auto',
              // alignSelf: 'end'
              marginRight: '2rem',
              width: '8rem'
            }}
            placeholder="Select Prof"
            showArrow
            onChange={handleProfChange}
            value={profDropValue}
            >
            {profPerModule[currentModule]?.map((prof) =>{            
              return <Select.Option key={prof}>{prof}</Select.Option>
            })}
        </ResourcesCustomSelect> 
    )
  }

  const renderYearDropDown = (yearsList) => {
    if(yearsList.length !== 0){
      return(
        <ResourcesCustomSelect 
            style={{
              // alignSelf: 'end',
              width: '8rem',
            }}     
            dropdownClassName='custom-dropdown'     
            placeholder="Select Year"
            showArrow
            onChange={handleYearChange}
            
            value={yearDropValue}
            >
            {yearPerProf[selectedProf]?.map((year_) =>{
              return <Select.Option key={year_}>{year_}</Select.Option>
            })}
        </ResourcesCustomSelect> 
      )
    }
    return null
  }
  

  if (loading) return <LoaderAnimation />

  return (
    <>
      <Header
      style={{
        justifyContent: 'space-between'
        // alignContent: 'end'
      }}
      >
        <h1 style={{ fontSize: '1.25rem' }}>Resources</h1>

        <ButtonContainer>
          <ButtonSquare
            type="primary"
            onClick={redirectContribute}
            icon={<CloudUpload size="16" />}
          >
            Upload
          </ButtonSquare>

          {isMobileS ? (
            <CourseContentRequestIcon
              code={code}
              type="resources"
              style={{ marginRight: '0rem' , marginLeft: '0.75rem'}}
            />
          ) : (
            <CourseContentRequest
              code={code}
              type="resources"
              style={{ marginRight: '0rem' , marginLeft: '0.75rem'}}
            />
          )}

        </ButtonContainer>
      </Header>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          // alignContent: 'end'
        }}
      >
        {renderModuleDropdown(modules)} 
        {renderProfDropDown()}
        {renderYearDropDown(years)}
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
          {Object.keys(resPerFilter)?.map((filter) => {            
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

const ResourcesCustomSelect = styled(Select)`
  && {
  

    .ant-select-selector {
      background-color: ${({ theme }) => theme.darksecondary};
      color: ${({ theme }) => theme.textColor};
      border-radius: 7px;
      border: none;
      align-items: center;
      height: 35px; 
    }
    .ant-select-arrow{
      color: ${({ theme }) => theme.textColor};
    }
    
    .custom-dropdown .ant-select-dropdown.ant-select-dropdown-placement-bottomLeft {
      background-color: green !important;
      padding: 0;
      margin: 0;
      border-radius: 30px;
    }
    
  }
`