import React, { Component } from 'react'

import Quote from '../quote/Quote'
import { MainDiv } from './styled';

export default class QuotesList extends Component {
  
  render() {
    return (
      <MainDiv>
        {this.props.quotes.map( quote => {
          return (
            <div key={quote.id}>
              <Quote quote={quote} />
            </div>
          )
        })}
      </MainDiv>
    )
  }
}
