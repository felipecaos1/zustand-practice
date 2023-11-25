import { Task } from "../../interfaces";
import { IoReorderTwoOutline } from "react-icons/io5";
import { useTaksStore } from "../../stores/task/task.storage";



interface props {
  task: Task;
}

export const SingleTask = ({ task }: props) => {

  const setDraggaId = useTaksStore( state => state.setDraggaId);
  const removeDraggaId = useTaksStore( state => state.removeDraggaId);

  return (
    <div 
    draggable={true} 
    onDragStart={ ()=>{ setDraggaId(task.id) } }
    onDragEnd={ ()=>{ removeDraggaId() } }
    className="mt-5 flex items-center justify-between p-2">
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};
