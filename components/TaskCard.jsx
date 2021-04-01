import { Box, Badge, Text, Flex } from '@chakra-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
		props.isDragDisabled
			? 'lightgrey'
			: props.isDragging
				? 'lightgreen'
				: 'white'};
`

const TaskCard = props => {
	
	return (
		<Draggable
			draggableId={props._id}
			index={props.index}
		
		>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				
				>
					<Box
						my='4'
						p={3}
						bg='gray.500'
						boxShadow='sm'
						w='100%'
						rounded='md'
						color='white'>
						<Flex justify='space-between' my='2'>
							<Text fontSize='lg' fontWeight='semibold'>
								{props.title}
							</Text>
							<Badge
								variantColor={props.category === 'Chores' ? 'green' : 'red'}
								h='100%'>
								{props.category}
							</Badge>
						</Flex>
						<Text textAlign='center' fontSize='md'>
							{props.details}
						</Text>
					</Box>
				</Container>
			)}

		</Draggable>
	);
};

export default TaskCard;
