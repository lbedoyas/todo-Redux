export class Todo {
  public id: number;
  public text: string;
  public completado: boolean;

  constructor(texto: string){
    this.id = Math.random();
    this.text = texto;
    this.completado = false;
  }

}
