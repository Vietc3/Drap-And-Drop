import { atom } from "recoil";
export const taskListState = atom({
  key: 'taskList',
  default: {
    'task-1': {
      _id: 'task-1',
      status: 'wip',
      category: 'Chores',
      title: 'Buy dog food',
      details: 'Gotta make my woof woof happy 🐕',
      style: {
        fontColor: 'bule.300',
        pr: '1',
        fontWeight: 'semibold'
      }
    },
    'task-2': {
      _id: 'task-2',
      status: 'wip',
      category: 'Shopping',
      title: 'Buy Milk',
      details: 'Remember, remember the lactose free aisle... 🥛',
      style: {
        fontColor: '#F6E05E',
        pr: '1',
        fontWeight: 'semibold'
      }
    },
    'task-3': {
      _id: 'task-3',
      status: 'wip',
      category: 'Chores',
      title: 'Renew Gym Membership',
      details: 'Gotta keep the muscles happy! 💪🏻',
      style: {
        fontColor: '#F687B3',
        pr: '1',
        fontWeight: 'semibold'
      }
    },
  },
});

export const styleTaskState = atom({
  key: 'styleTaskState',
  default: {
    id: '',
    content: {
      status: '',
      category: '',
      title: '',
      details: '',
    },
    style: {
      fontWeight: 'semibold',
      pr: '',
      fontColor: 'black'
    }
  },
});
