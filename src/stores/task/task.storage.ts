import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";



interface TaskState{

    tasks: Record<string, Task>,  //{[key:string]:Task}
}

interface Action {

    getTaskbyStatus:(status:TaskStatus)=>Task[]
}


const storeApi : StateCreator<TaskState & Action> = (set, get) =>({

    tasks:{
        'ABC-1':{id: 'ABC-1', title: 'Task 1', status: 'open'},
        'ABC-2':{id: 'ABC-2', title: 'Task 2', status: 'in-progres'},
        'ABC-3':{id: 'ABC-3', title: 'Task 3', status: 'in-progres'},
    },

    getTaskbyStatus:(status:TaskStatus) =>{
        return Object.values(get().tasks).filter( task => task.status == status);
    },
})


export const useTaksStore =  create<TaskState & Action>()(storeApi);