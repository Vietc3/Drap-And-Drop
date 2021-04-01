import { Box } from '@chakra-ui/core';

const BoxTarget = props => {
	return (
		<Box
			m={2}
			p={3}
			boxShadow='sm'
			// bg={isOver ? 'green.500' : 'green.200'}
			minH='200px'
			textAlign='center'
			w='100%'
			rounded='md'
			color='white'>
			{props.children}
		</Box>
	);
};

export default BoxTarget;
