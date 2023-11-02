import { JiraTasks } from '../../components';
import { useTaksStore } from '../../stores/task/task.storage';

export const JiraPage = () => {

  const taskDone = useTaksStore(state => state.getTaskbyStatus('done'));
  const taskInProgress = useTaksStore(state => state.getTaskbyStatus('in-progress'));
  const taskOpen = useTaksStore(state => state.getTaskbyStatus('open'));
  
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' value='open' task={taskOpen} />
          
          <JiraTasks title='Avanzando' value='in-progress' task={taskInProgress} />
          
          <JiraTasks title='Terminadas' value='done' task={taskDone}/>

      </div>

      



    </>
  );
};