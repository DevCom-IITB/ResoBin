import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import quotes from 'data/quotes'
import { getDailyQuote } from 'helpers'
import { selectUserProfile } from 'store/userSlice'

const DailyQuote = () => {
  const profile = useSelector(selectUserProfile)

  // Seeded by the user's id, so the quote is user-centric and rotates daily.
  const quote = useMemo(
    () => getDailyQuote(quotes, profile?.id ?? profile?.ldapId ?? 'guest'),
    [profile?.id, profile?.ldapId]
  )

  if (!quote) return null

  return (
    <QuoteCard>
      <QuoteMark aria-hidden="true">&ldquo;</QuoteMark>
      <QuoteBody>
        <QuoteText>{quote.text}</QuoteText>
        <QuoteAuthor>&mdash; {quote.author}</QuoteAuthor>
      </QuoteBody>
    </QuoteCard>
  )
}

export default DailyQuote

const QuoteCard = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0.5rem 1rem 0 1rem;
  padding: 0.9rem 1.1rem;
  background: linear-gradient(90deg, #2b273b 0%, #231f31 100%);
  border-left: 3px solid #6d5dfc;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin: 0.5rem 1rem 0 1rem;
    padding: 0.75rem 0.9rem;
  }
`

const QuoteMark = styled.span`
  color: #6d5dfc;
  font-size: 2rem;
  line-height: 1;
  font-family: Georgia, 'Times New Roman', serif;
  opacity: 0.7;
`

const QuoteBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`

const QuoteText = styled.p`
  color: #e8e4f5;
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  font-style: italic;
  line-height: 1.5;
  margin: 0;
`

const QuoteAuthor = styled.span`
  color: #9b7bff;
  font-size: 0.8rem;
  font-weight: 600;
  align-self: flex-end;
`
