import styled from 'styled-components';

export default styled.div`    
    width: 300px;
    height: 300px;
    border: thick solid #E4B363 ;
    background: #313638;
    margin: 10px;
    border-radius: 5%;
    color: #E4B363 ;


    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background: #E4B363 ;
        border: thick solid #313638;
        border-width: 13px; 
        color: #313638;
    }

    &:active {
        background: #313638;
        border: thick solid #EF6461 ; 
        color: #EF6461;

        transform: rotateX(180deg);
        transition: 0.4s;
	    transform-style: preserve-3d;
        position: relative;
       
        backface-visibility: hidden;
       
       color: #313638; 
	
    }
`
// don't forget that color in active is making the text disappear later when you're creating the pop-up image