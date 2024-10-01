import { Schema, model, connect, Types } from 'mongoose';

// interfaces
interface IColeccion1 {
  nombre: string;
  descripcion: string;
}

interface IColeccion2 {
  titulo: string;
  contenido: string;
  coleccion1Id: Types.ObjectId; 
}

//Crear esquemas 
const coleccion1Schema = new Schema<IColeccion1>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});

const coleccion2Schema = new Schema<IColeccion2>({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  coleccion1Id: { type: Schema.Types.ObjectId, ref: 'Coleccion1', required: true },
});

// modelos
const Coleccion1 = model<IColeccion1>('Coleccion1', coleccion1Schema);
const Coleccion2 = model<IColeccion2>('Coleccion2', coleccion2Schema);

// Función principal
async function run() {
  
  await connect('mongodb://127.0.0.1:27017/miDB');

  // Funciones CRUD Colección1
  async function crearColeccion1(data: IColeccion1) {
    const nuevaColeccion1 = new Coleccion1(data);
    await nuevaColeccion1.save();
    console.log('Documento Colección1 creado:', nuevaColeccion1);
  }

  async function verColeccion1(id: string) {
    const documento = await Coleccion1.findById(id);
    console.log('Documento Colección1:', documento);
  }

  async function actualizarColeccion1(id: string, data: Partial<IColeccion1>) {
    const documentoActualizado = await Coleccion1.findByIdAndUpdate(id, data, { new: true });
    console.log('Documento Colección1 actualizado:', documentoActualizado);
  }

  async function borrarColeccion1(id: string) {
    const documentoEliminado = await Coleccion1.findByIdAndDelete(id);
    console.log('Documento Colección1 eliminado:', documentoEliminado);
  }

  async function listarColeccion1() {
    const documentos = await Coleccion1.find();
    console.log('Documentos Colección1:', documentos);
  }

  // Función que utiliza Aggregation Pipeline con lookup entre Colección1 y Colección2
  async function usarAggregationPipeline() {
    const resultados = await Coleccion2.aggregate([
      {
        $lookup: {
          from: 'coleccion1s', 
          localField: 'coleccion1Id',
          foreignField: '_id',
          as: 'detallesColeccion1',
        },
      },
      {
        $unwind: '$detallesColeccion1', 
      },
      {
        $project: {
          titulo: 1,
          contenido: 1,
          'detallesColeccion1.nombre': 1,
          'detallesColeccion1.descripcion': 1,
        },
      },
    ]);

    console.log('Resultados del Aggregation Pipeline:', resultados);
  }

 
}



