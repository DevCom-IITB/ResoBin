import styled from 'styled-components/macro'

const LectureItem = ({ title, subtitle, img }) => {
  return (
    <Container>
      <h4>{title}</h4>
      <AuthorWrapper>
        <picture>
          <img src={img} alt="" />
        </picture>
        <figcaption>{subtitle}</figcaption>
      </AuthorWrapper>
    </Container>
  )
}

export default LectureItem

const Container = styled.div`
  padding: 1.6rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  border-radius: 0.8rem;
  font-size: 1.4rem;
  background: hsl(0, 0%, 4%);
  cursor: pointer;

  &:hover {
    border-color: hsl(0, 0%, 70%);
  }

  & > h4 {
    margin-right: 5rem;
    font-size: 1.4rem;
    color: #ffffff;
  }
`
const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  & > picture {
    display: inline-block;
    overflow: hidden;
    margin-right: 1rem;
    border: 1px solid var(--border);
    border-radius: 50%;
    block-size: 2.6rem;
    inline-size: 2.6rem;

    & > img {
      object-fit: cover;
      block-size: 100%;
      inline-size: 100%;
    }
  }
`
