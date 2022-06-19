import { CloudUpload } from '@styled-icons/heroicons-outline'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import {
  CourseContentRequest,
  CourseContentRequestIcon,
} from 'components/CoursePage'
import { ButtonSquare, LoaderAnimation, toast } from 'components/shared'
import { API } from 'config/api'
import { useResponsive } from 'hooks'

import { CourseResourceGrid } from './CourseResourceItem'

const CourseResourceContainer = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const { isMobileS } = useResponsive()

  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [resourceFilters, setResourceFilters] = useState(['Endsems'])
  const [appliedResourceFilters, setAppliedResourceFilters] = useState([])
  const [filteredResources, setFilteredResources] = useState([])
  const [allChecked, setAllChecked] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        const response = await API.courses.listResources({ code })
        setResources(response)
        setFilteredResources(response)

        const filterSet = []
        response.forEach((resource) => {
          // console.log(resource.tags)
          resource.tags.forEach((tag) => {
            if (!filterSet.includes(tag)) {
              filterSet.push(tag)
            }
          })
        })
        // console.log(allResourcesFilter)
        setResourceFilters(filterSet)
        setAppliedResourceFilters(filterSet)
      } catch (error) {
        toast({ status: 'error', content: error })
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [code])

  const redirectContribute = () => navigate(`/contribute?course=${code}`)

  const applyCourseResourceFilter = (filterSet) => {
    setAppliedResourceFilters(filterSet)
    const filtered = resources.filter((resource) => {
      for (let i = 0; i < resource.tags.length; i += 1) {
        if (filterSet.includes(resource.tags[i])) return true
      }
      return false
    })
    setFilteredResources(filtered)
  }

  const handleResourceFilterChange = (event) => {
    if (event.target.checked) {
      const filterSet = appliedResourceFilters
      filterSet.push(event.target.value)
      applyCourseResourceFilter(filterSet)
    } else {
      const filterSet = appliedResourceFilters.filter(
        (filterTag) => event.target.value !== filterTag
      )
      setAllChecked(false)
      applyCourseResourceFilter(filterSet)
    }
  }

  const handleToggleAll = (event) => {
    if (event.target.checked) {
      const filterSet = resourceFilters
      applyCourseResourceFilter(filterSet)
      setAllChecked(true)
    } else {
      applyCourseResourceFilter([])
      setAllChecked(false)
    }
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
              style={{ marginRight: '0.75rem' }}
            />
          ) : (
            <CourseContentRequest
              code={code}
              type="resources"
              style={{ marginRight: '0.75rem' }}
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
      <Header>
        <h1 style={{ fontSize: '1rem' }}>Filter</h1>
        <CourseResourceFilter>
          <FormCheck>
            <FormCheckAllLabel htmlFor="SelectAll">
              <input
                style={{ marginRight: '0.1rem' }}
                type="checkbox"
                onChange={handleToggleAll}
                id="SelectAll"
                value="SelectAll"
                name="SelectAll"
                checked={allChecked}
              />
              Select All
            </FormCheckAllLabel>
          </FormCheck>
          {resourceFilters.map((content) => (
            <FormCheck key={content}>
              <input
                type="checkbox"
                onChange={handleResourceFilterChange}
                id={content}
                name={content}
                value={content}
                checked={appliedResourceFilters.includes(content)}
              />
              <label style={{ marginLeft: '0.1rem' }} htmlFor={content}>
                {content}
              </label>
            </FormCheck>
          ))}
        </CourseResourceFilter>
      </Header>

      {filteredResources.length ? (
        <CourseResourceGrid items={filteredResources} />
      ) : (
        <span style={{ fontSize: '0.875rem' }}>No resources found</span>
      )}
    </>
  )
}

export default CourseResourceContainer

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
const CourseResourceFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 1rem;
  flex-wrap: wrap;
`
const FormCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
`

const FormCheckAllLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`
