import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, toggleAll, limpiarTodos } from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salva al mundo'),
  new Todo('Iron man')
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),

  on( limpiarTodos, state =>  state.filter( todo => !todo.completado )  ),

  on ( borrar, ( state, { id } ) =>  state.filter( todo => todo.id !== id ) ),

  on ( toggleAll, ( state, { completado } ) => state.map( todo => {

    return {
      ...todo,
      completado: completado
    }

  }) ),

  on(toggle, (state, { id }) => {

    return state.map( todo => {

      if ( todo.id === id  ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }

    });
  }),
  on(editar, (state, { id, texto }) => {

    return state.map( todo => {
      if ( todo.id === id  ) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    });
  })





);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
