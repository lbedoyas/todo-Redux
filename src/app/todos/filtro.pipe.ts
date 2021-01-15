import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from '../filtro/filtro.actions';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Todo[], filtro: filtrosValidos): Todo[] {
    console.log(value);

    switch (filtro) {
      case 'completados':
          return value.filter(x => x.completado);
        case 'pendientes':
          return value.filter(x => !x.completado);
      default:
        return value;
    }



    return value;
  }

}
