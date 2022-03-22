import { useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';
import '../styles/tasklist.scss';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    
    if(newTaskTitle){
      const newtask={
        id:Math.floor(Math.random() * 10000)?? 0,
        title :newTaskTitle?? 'title',
        isComplete: false
      }
      setTasks([newtask,...tasks]);
      
    }
   

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number) {
    let newTaskList:Task[];

    newTaskList = tasks.map(item=>{
      if(item.id === id){
        item.isComplete = true;
      }
      return item
    })



    setTasks(task => newTaskList);
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    let newTaskList = new Array<Task>();

    tasks.forEach(item=>{
      if(item && item.id !== id){
        newTaskList.push(item);
      }
    })

    setTasks(tasks => newTaskList);
    // Remova uma task da listagem pelo ID
  }
  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}

export default TaskList;