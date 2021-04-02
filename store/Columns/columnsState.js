import { atom } from "recoil";
export const columnsState = atom({
  key: 'columnsList',
  default: {
      'column-1': {
        id: 'column-1',
        taskIds: ['task-1', 'task-2', 'task-3']
      },
      'column-2': {
        id: 'column-2',
        taskIds: []
      }
  }
});






export const columnOrder = atom({
  key: 'columnOrder',
  default: ['column-1', 'column-2']
});
