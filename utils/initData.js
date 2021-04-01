const initialData = {
    tasks: {
      'task-1': {
        _id: 'task-1',
        status: 'wip',
        category: 'Chores',
        title: 'Buy dog food',
        details: 'Gotta make my woof woof happy 🐕',
    },
      'task-2': 	{
        _id:'task-2',
        status: 'wip',
        category: 'Shopping',
        title: 'Buy Milk',
        details: 'Remember, remember the lactose free aisle... 🥛',
    },
      'task-3': 	{
        _id: 'task-3',
        status: 'wip',
        category: 'Chores',
        title: 'Renew Gym Membership',
        details: 'Gotta keep the muscles happy! 💪🏻',
    },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3']
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: []
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2']
  }
  
  export default initialData
  