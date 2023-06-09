import axios from "axios";
import {Layout} from "../components/Layout";
import Link from "next/link";
import { format } from "date-fns";
import { getAllDonacion, getAllBenefactor } from "./api/backend";
import { useEffect, useState} from 'react';

function ListaDonaciones() {
  const [donacionAll, setDonacionAll] = useState([]);
  const [benefactorAll, setBenefactorAll] = useState([]);

  useEffect(() => {
      async function loadData(){
        const B_res = await getAllBenefactor();
        const D_res = await getAllDonacion();

        setBenefactorAll(B_res.data);
        setDonacionAll(D_res.data);
      }
      loadData();
  }, [])

  const donacionFiltrada = donacionAll.filter(donacion =>
    benefactorAll.some(benefactor => benefactor.id === donacion.Benefactor)
  );

  const donacionesRecibidas = donacionFiltrada.filter((donacion) => donacion.RecogidaPorAsilo === true);

  const formatearFecha = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <>
        <Layout>

          <h1 className="text-black my-12">Reporte de Donaciones Recibidas</h1>

          <table className="border-collapse border border-gray-700 shadow-md mx-12 my-3 bg-gray-200 text-black">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-700 p-3">Fecha de Recoleccion</th>
                <th className="border border-gray-700 p-3">Benefactor</th>
              </tr>
            </thead>
            <tbody>
            {donacionesRecibidas.map((donacion) => {
              const benefactor = benefactorAll.find((benefactor) => benefactor.id === donacion.Benefactor);
              const nombreBenefactor = benefactor ? benefactor.NombreCompleto : '';

              return (
                <tr key={donacion.ID}>
                  <td className="border border-gray-700 p-3">{formatearFecha(donacion.FechaRecoleccion)}</td>
                  <td className="border border-gray-700 p-3">{nombreBenefactor}</td>
                </tr>
              );
            })}
            </tbody>
          </table>

          <div className="my-5">
            <label htmlFor='lblRango' className='text-gray-700'><b>Rango de fechas:</b></label>
          </div>
          <div className="my-5">
            <label htmlFor='lblCantDonaciones' className='text-gray-700'><b>Cantidad de donaciones:</b></label>
          </div>
          <div className="my-5">
            <label htmlFor='lblBenefactor' className='text-gray-700'><b>Benefactor más frecuente:</b></label>
          </div>

          <button 
                className='bg-gray-500 hover:bg-gray-700 text-white px-3 py-2 rounded my-5'>Opcion 1</button>
        </Layout>
    </>
  );
}

export default ListaDonaciones