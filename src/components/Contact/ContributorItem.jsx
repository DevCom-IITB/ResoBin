import { Avatar, Card } from 'antd'
import styled from 'styled-components'

import { HEX2RGBA } from 'helpers'

const StyledCard = styled(Card)`
  .ant-card-body {
    margin: 0.75rem 0;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => HEX2RGBA(theme.darksecondary, 30)};
  }

  &.ant-card-hoverable {
    transition: 100ms;

    &:hover {
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  &.ant-card-bordered {
    border: 0;
    background-color: transparent;
  }

  .ant-card-meta {
    display: flex;
    align-items: center;

    .ant-card-meta-title {
      font-size: 1rem;
      color: ${({ theme }) => theme.textColor};
    }

    &-description {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }) => theme.placeholder};

      b {
        font-weight: 600;
        color: ${({ theme }) => theme.logo};
      }
    }
  }
`

const ContributorItem = ({ name, avatar, url, contributions }) => {
  return (
    <a key={name} href={url} target="_blank" rel="noreferrer">
      <StyledCard hoverable>
        <Card.Meta
          avatar={<Avatar src={avatar} />}
          title={name}
          description={
            <>
              <b>{contributions}</b> commit
              {contributions > 1 ? 's' : ''}
            </>
          }
        />
      </StyledCard>
    </a>
  )
}

export default ContributorItem
