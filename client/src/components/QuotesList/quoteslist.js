import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import Quote from './quote';

const FlexDiv = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

class QuotesList extends Component {
    state = {
        qlist: []
    };

    componentDidMount = () => {
        Axios
            .get('http://localhost:9001/api/posts')
            .then((response) => {
                this.setState(() => ({ qlist: response.data }));
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };

    render() {
        return (
            <FlexDiv>
                {this.state.qlist.map( (post) => <Quote post={post} key={post.id} />)}
            </FlexDiv>
        );
    }
};

QuotesList.propTypes = {
    qlist: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        contents: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        id: PropTypes.number.isRequired
    }).isRequired)
};

export default QuotesList;
