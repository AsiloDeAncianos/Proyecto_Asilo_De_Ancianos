import {Layout} from "../components/Layout";
import Link from "next/link";


function CampaniaMenu({instAsilos, campanias}) {
  return (
    <div>
      <div>
        <Layout>
            <Link href="/campaniaCrear">
              <div className="border border-gray-200 shadow-md p-6 m-12">
                <h1 className="text-gray-700"><b>Crear</b></h1>
                <p className="text-gray-700">Espacio para crear campañas</p>
              </div>
              
            </Link>
            <Link href="/campaniaListaVigentes">
                <div className="border border-gray-200 shadow-md p-6 m-12">
                    <h1 className="text-gray-700"><b>Campañas Vigentes</b></h1>
                    <p className="text-gray-700">Listar solo las campañas vigentes hasta el momento (Ver/Actualizar/Cerrar)</p>
                </div>
            </Link>
            <Link href="/campaniaListaCerradas">
                <div className="border border-gray-200 shadow-md p-6 m-12">
                    <h1 className="text-gray-700"><b>Campañas Cerradas</b></h1>
                    <p className="text-gray-700">Listar solo las campañas cerradas (Confirmacioón de Donaciones/Benefactores registrados)</p>
                </div>
            </Link>
        </Layout>
      </div>
    </div>
  );
}

export default CampaniaMenu