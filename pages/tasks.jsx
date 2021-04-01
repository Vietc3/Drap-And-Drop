import { Box, Grid, Stack, Text, Input } from '@chakra-ui/core';
import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import BoxTarget from '../components/BoxTarget';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import NoSSR from 'react-no-ssr';
import initData from '../utils/initData';

const Tasks = () => {
	const [data, setData] = useState(initData)
	const onDragEnd = result => {

		const { source, destination, draggableId } = result;
		if (!destination) {
			return
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}
		const start = data.columns[source.droppableId]
		const finish = data.columns[destination.droppableId]
		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds)

			newTaskIds.splice(source.index, 1)
			newTaskIds.splice(destination.index, 0, draggableId)

			const newColumn = {
				...start,
				taskIds: newTaskIds
			}
			const newState = {
				...data,
				columns: {
					...data.columns,
					[newColumn.id]: newColumn
				}
			}
			setData(newState)
			return
		}

		// Moving from one list to another
		const startTaskIds = Array.from(start.taskIds)
		startTaskIds.splice(source.index, 1, draggableId + 'a')
		data.tasks[draggableId + 'a'] = { ...data.tasks[draggableId], _id: draggableId + 'a' }


		const newStart = {
			...start,
			taskIds: startTaskIds
		}


		const finishTaskIds = Array.from(finish.taskIds)
		finishTaskIds.splice(destination.index, 0, draggableId)
		const newFinish = {
			...finish,
			taskIds: finishTaskIds
		}

		const newState = {
			...data,
			columns: {
				...data.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		}
		setData(newState)
	}
	const TaskList = styled.div`
 	 padding: 8px;
	  transition: background-color 0.2s ease;
	  background-color: ${props =>
			props.isDraggingOver ? 'skyblue' : 'white'}
 	 flex-grow: 1;
	  min-height: 100px;
	`

	const fontSize = '1xl'

	return (
		<NoSSR>
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid
					gap={6}
					templateColumns='1fr 2fr 1fr'
					bg='gray.500'
					w='100vw'
					h='93vh'
					p={3}>
					<Box bg='gray.200' rounded='md' p={3} boxShadow='md' key="componentTask">
						<Stack spacing={3}>
							<Text fontSize='2xl' textAlign='center'>
								Component
						</Text>
							<Droppable droppableId='column-1' type="TASK">
								{(provided, snapshot) => (
									<TaskList
										ref={provided.innerRef}
										{...provided.droppableProps}
										isDraggingOver={snapshot.isDraggingOver}
									>
										{ data.columns['column-1'].taskIds.map(
											taskId => data.tasks[taskId]
										)
											.filter((task, i) => task.status === 'wip')
											.map((task, i) => (
												<TaskCard
													index={i}
													key={task._id.toString()}
													_id={task._id}
													category={task.category}
													title={task.title}
													details={task.details}
												/>
											))}
										{provided.placeholder}
									</TaskList>
								)}
							</Droppable>
						</Stack>
					</Box>
					<Box bg='blue.200' rounded='md' p={3} boxShadow='md' key="componentCanvas">

						<Stack>
							<Text fontSize='2xl' textAlign='center'>
								Canvas
						</Text>


							<Droppable droppableId='column-2' type="TASK">
								{(provided, snapshot) => (
									<TaskList
										ref={provided.innerRef}
										{...provided.droppableProps}
										isDraggingOver={snapshot.isDraggingOver}
									>
										{ data.columns['column-2'].taskIds.map(
											taskId => data.tasks[taskId]
										)
											.filter((task, i) => task.status === 'wip')
											.map((task, i) => (
												<TaskCard
													index={i}
													key={task._id.toString()}
													_id={task._id}
													category={task.category}
													title={task.title}
													details={task.details}
												/>
											))}
										{provided.placeholder}
									</TaskList>
								)}

							</Droppable>


						</Stack>
					</Box>
					<Box bg='green.200' rounded='md' p={3} boxShadow='md' key="componentEditor">
						<Stack>
							<Text fontSize='2xl' textAlign='center'>
								Editor Component
						</Text>
							<BoxTarget>
								<Text fontSize={fontSize} textAlign='left'>
									Edit Content
						</Text>
								<Input placeholder="Content" />
								<Text fontSize={fontSize} textAlign='left'>
									Edit Font
						</Text>
								<Input placeholder="Font" />

								<Text fontSize={fontSize} textAlign='left'>
									Edit Color
						</Text>
								<Input placeholder="Font" />

							</BoxTarget>
						</Stack>
					</Box>

				</Grid>

			</DragDropContext>
		</NoSSR>


	);
};

export default Tasks;
