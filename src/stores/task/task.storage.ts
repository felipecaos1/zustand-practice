import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";



interface TaskState{

    tasks: Record<string, Task>,  //{[key:string]:Task}
}

interface Action {

    draggaId?:string,

    getTaskbyStatus:(status:TaskStatus)=>Task[],
    setDraggaId: (id:string) => void,
    removeDraggaId:()=> void,
}


const storeApi : StateCreator<TaskState & Action> = (set, get) =>({

    draggaId: undefined,

    tasks:{
        'ABC-1':{id: 'ABC-1', title: 'Task 1', status: 'open'},
        'ABC-2':{id: 'ABC-2', title: 'Task 2', status: 'in-progress'},
        'ABC-3':{id: 'ABC-3', title: 'Task 3', status: 'in-progress'},
        'ABC-4':{id: 'ABC-4', title: 'Task 4', status: 'done'},
    },

    getTaskbyStatus:(status:TaskStatus) =>{
        return Object.values(get().tasks).filter( task => task.status == status);
    },

    setDraggaId: (id) => {
        set({draggaId: id})
    },

    removeDraggaId: () => {
        set({draggaId:undefined})
    },
})


export const useTaksStore =  create<TaskState & Action>()(
    devtools(
        storeApi
    )
    );