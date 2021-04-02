import { Box, Grid, Stack, Text, Input, Select } from '@chakra-ui/core';
import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import BoxTarget from '../components/BoxTarget';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import NoSSR from 'react-no-ssr';

import { useRecoilState, useRecoilValue } from 'recoil';
import { columnOrder, columnsState } from '../store/Columns/columnsState';
import { taskListState, styleTaskState } from '../store/Tasks/taskState';




const Tasks = () => {

	const [taskState, setTaskState] = useRecoilState(taskListState);

	const [styleTask, setStyleTask] = useRecoilState(styleTaskState);

	console.log(styleTask);
	const columnsOder = useRecoilValue(columnOrder);
	const [columns, setColumns] = useRecoilState(columnsState);


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
		const start = columns[source.droppableId]
		const finish = columns[destination.droppableId]

		console.log('đang chạy');
		if (start === finish) {

			const newTaskIds = Array.from(start.taskIds)

			newTaskIds.splice(source.index, 1)
			newTaskIds.splice(destination.index, 0, draggableId)

			const newColumn = {
				...start,
				taskIds: newTaskIds
			}

			const newState = {
				...columns,
				[newColumn.id]: newColumn
			}

			// console.log();

			setColumns(newState)

			return
		}

		// Moving from one list to another
		const startTaskIds = Array.from(start.taskIds)
		startTaskIds.splice(source.index, 1)

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
		setColumns({ ...columns, [newStart.id]: newStart, [newFinish.id]: newFinish })
	}
	const infoComponent = (data) => {

		const dataEdit = {
			status: data.status,
			category: data.category,
			title: data.title,
			details: data.details,
		}
		setStyleTask({ ...styleTask, id: data._id, content: dataEdit, style: data.task.style })

	}

	const onChangeContent = (event) => {
		let component = { ...taskState[styleTask.id] }
		component.title = event.target.value;
		setTaskState({ ...taskState, [styleTask.id]: component });
	};

	const onChangePr = (event) => {
		let component = { ...taskState[styleTask.id] }
		component.style = {
			...component.style,
			pr: event.target.value
		};
		setTaskState({ ...taskState, [styleTask.id]: component });
	};

	const onChangeColor = (event) => {
		let component = { ...taskState[styleTask.id] }
		component.style = {
			...component.style,
			fontColor: event.target.value
		};
		setTaskState({ ...taskState, [styleTask.id]: component });
	};
	const onChangeFontWeight = (event) => {
		let component = { ...taskState[styleTask.id] }
		component.style = {
			...component.style,
			fontWeight: event.target.value
		};
		setTaskState({ ...taskState, [styleTask.id]: component });
	};

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
							<Droppable droppableId={columnsOder[0]} type="TASK">
								{(provided, snapshot) => (
									<TaskList
										ref={provided.innerRef}
										{...provided.droppableProps}
										isDraggingOver={snapshot.isDraggingOver}
									>
										{ columns['column-1'].taskIds.map(
											taskId => {
												console.log(taskId);
												return taskState[taskId]
											}
										)
											.map((task, i) => (
												<TaskCard
													index={i}
													key={task._id.toString()}
													_id={task._id}
													category={task.category}
													title={task.title}
													details={task.details}
													task={task}
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
							<Droppable droppableId={columnsOder[1]} type="TASK">
								{(provided, snapshot) => (
									<TaskList
										ref={provided.innerRef}
										{...provided.droppableProps}
										isDraggingOver={snapshot.isDraggingOver}
									>
										{  columns['column-2'].taskIds.map(
											taskId => taskState[taskId]
										)
											.filter((task, i) => task.status === 'wip')
											.map((task, i) => (
												<TaskCard
													inforComponent={infoComponent}
													index={i}
													key={task._id.toString()}
													_id={task._id}
													category={task.category}
													title={task.title}
													details={task.details}
													task={task}
													pr={task.style.pr}
													styleTask={styleTask}
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
									Edit Title
						</Text>

								<Input key={styleTask.content.title} placeholder="Content" defaultValue={styleTask.content.title} color='black' onChange={onChangeContent} />
								<Text fontSize='2xl' textAlign='center'>
									Padding Right
						</Text>
								<Select onChange={onChangePr} color='black'>
									<option value={styleTask.style.pr}>{styleTask.style.pr}</option>
									<option value="40">40px</option>
									<option value="50">50px</option>
									<option value="100">100px</option>
								</Select>
								<Text fontSize={fontSize} textAlign='left'>
									Text Color
						</Text>
							
						<Select onChange={onChangeColor} color='black'>
									<option value={styleTask.style.fontColor}>{styleTask.style.fontColor}</option>
									<option value="red.300">Red</option>
									<option value="green.300">Green</option>
									<option value="yellow.300">Yellow</option>
								</Select>

								<Text fontSize={fontSize} textAlign='left'>
									Edit Font Weight
						</Text>
						<Select onChange={onChangeFontWeight} color='black'>
									<option value={styleTask.style.fontWeight}>{styleTask.style.fontWeight}</option>
									<option value="extrabold">Extra bold</option>
									<option value="semibold">Semi bold</option>
								
								</Select>

							</BoxTarget>

						</Stack>
					</Box>
				</Grid>

			</DragDropContext>
		</NoSSR>


	);
};

export default Tasks;
