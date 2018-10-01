import styled, { css } from 'styled-components';

export const StatusMessage = styled.h3`
	font-size: 1.6rem;

	${props =>
		props.error &&
		css`
			color: red;
		`};
`;
