import {
  IoCheckmarkCircleOutline,
  IoAddOutline,
  
} from "react-icons/io5";
import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./singleTask";
import { useTaksStore } from '../../stores/task/task.storage';
import Swal from "sweetalert2";
import classNames from "classnames";
import { useState } from "react";

interface Props {
  title: string;
  task: Task[];
  value: TaskStatus;
}

export const JiraTasks = ({ title, value, task }: Props) => {

  const dragingTaskId = useTaksStore( state => state.draggaId); 
  const changeProgress = useTaksStore((state) => state.changeProgress); 
  const removeDraggaId = useTaksStore((state) => state.removeDraggaId); 
  const addTask = useTaksStore((state) => state.addTask); 

  const [OnDragOver,setOnDragOver] = useState(false);

  const handleOnDragOver = (event:any) =>{
      event.preventDefault();
      setOnDragOver(true);
    } 
  const handleOnDragLeave = (event: any) => {
     event.preventDefault();
    setOnDragOver(false);
  };
  const handleOnDrop = (event: any) => {
    event.preventDefault();
    setOnDragOver(false);
    changeProgress(dragingTaskId!, value);
    removeDraggaId();
  };

  const handleAddTask = async(status:TaskStatus) =>{
      
    const rep = await Swal.fire({
      title:'Nueva Tarea',
      input:'text',
      inputLabel:'Nombre de la tarea',
      inputPlaceholder:'Ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) =>{
        if(!value){
          return 'Debe ingresar un nombre para la tare'
        }
      }
    });

    console.log(rep, status);

    if(rep.isConfirmed){
      addTask(rep.value, status);
    }
  } 

  return (
    <div
      onDragOver={(e) => handleOnDragOver(e)}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      className={classNames(
        "!text-black relative border-4  flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": !!dragingTaskId,
          "border-green-500": !!dragingTaskId && OnDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick = {() =>handleAddTask(value)}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {task.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
