import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    max-width: 880px;
    margin: 100px auto;
`;

function Home(props) {
    return (
        <Wrapper>
            <h1>Node Express Lab</h1>
        </Wrapper>
    )
};

export default Home;