import { JiraTasks } from '../../components';
import { useTaksStore } from '../../stores/task/task.storage';

export const JiraPage = () => {

  const task = useTaksStore(state => state.tasks);
  const taskDone = useTaksStore(state => state.getTaskbyStatus('done'));
  const taskInProgress = useTaksStore(state => state.getTaskbyStatus('in-progres'));
  const taskOpen = useTaksStore(state => state.getTaskbyStatus('open'));
  console.log(taskDone);
  console.log(taskInProgress);
  console.log(taskOpen);
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' value='pending' />
          
          <JiraTasks title='Avanzando' value='in-progress' />
          
          <JiraTasks title='Terminadas' value='done' />

      </div>

      



    </>
  );
};