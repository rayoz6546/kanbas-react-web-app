import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { useSelector, UseSelector } from "react-redux";
export default function TodoItem({todo,}:{todo:{id:string, title:string};}){
//     { todo, deleteTodo, setTodo }: {
//     todo: { id: string; title: string };
//     deleteTodo: (id: string) => void;
//     setTodo: (todo: { id: string; title: string }) => void;
//   }
  {
    const dispatch = useDispatch();
    const {todos} = useSelector((state:any) => state.todosReducer)
    return (
        <li key={todo.id} className="list-group-item">
          <button onClick={() => dispatch(deleteTodo(todo.id))}
                  id="wd-delete-todo-click"> Delete </button>
          <button onClick={() => dispatch(setTodo(todo))}
                  id="wd-set-todo-click"> Edit </button>
          {todo.title}
        </li>
    );}
}
    