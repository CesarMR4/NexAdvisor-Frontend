export class Estudiante{
    id: number = 0;
    nombre: String = "";
    email: String = "";
    password: String = "";
    direccion: String = "";
    telefono: String = "";
    curriculum: any = null;
    carrera: String = "";
    fechaRegistro: Date = new Date();
    rol: String = "estudiante";
}