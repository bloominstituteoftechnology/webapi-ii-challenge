import React from 'react'
import { MainDiv, Content, Title } from './styled';


export default function Quote(props) {
  return (
    <MainDiv>
      <Content>{props.quote.contents}</Content>
      <Title>{props.quote.title}</Title>
    </MainDiv>
  )
}
