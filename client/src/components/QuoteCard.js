import React from 'react';
import Update from './Update';

const QuoteCard = (props) => {
	return (
		<div className="quote-card">
			<h3>"{props.info.title}"</h3>
			<p>{props.info.contents}</p>
			<Update changeAnswer={props.changeAnswer} info={props.info} />
			<button
				onClick={(e) => {
					e.preventDefault();
					props.deleteQuote(props.info.id);
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default QuoteCard;
