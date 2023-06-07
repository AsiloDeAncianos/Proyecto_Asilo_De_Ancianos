import {Layout} from "../components/Layout";
import Link from "next/link";


function InstAsiloMenu({instAsilos, campanias}) {
  return (
    <div>
      <div>
        <Layout>
            <Link href="/institucionAsiloCrear">
              <div className="border border-gray-200 shadow-md p-6 m-12">
                <h1 className="text-gray-700"><b>Crear</b></h1>
                <p className="text-gray-700">Espacio para crear instituciones/asilos</p>
              </div>
              
            </Link>
            <Link href="/institucionAsiloLista">
                <div className="border border-gray-200 shadow-md p-6 m-12">
                    <h1 className="text-gray-700"><b>Listar</b></h1>
                    <p className="text-gray-700">Listar instituciones/asilos existentes (editar/eliminar)</p>
                </div>
            </Link>
        </Layout>
      </div>
    </div>
  );
}

export default InstAsiloMenu