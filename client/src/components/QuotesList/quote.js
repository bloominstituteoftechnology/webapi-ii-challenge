import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';



const Quote = (props) => {
    return (
        <div>
            <h4>{props.post.title}</h4>
            <p> - {props.post.contents} ({props.post.updated_at})</p>
        </div>
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
