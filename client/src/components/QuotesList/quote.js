import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const WrapperDiv = Styled.div`
    width: 400px;
    border-radius: 5px;
    background-color: lightgrey;
    padding: 5px;
    margin: 10px;

`;

const Quote = (props) => {
    return (
        <WrapperDiv>
            <h4>{props.post.title}</h4>
            <p>{` - ${props.post.contents} (${props.post.updated_at})`}</p>
        </WrapperDiv>
    );
};

Quote.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        contents: PropTypes.string.isRequired,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        id: PropTypes.number
    }).isRequired
};

export default Quote;
