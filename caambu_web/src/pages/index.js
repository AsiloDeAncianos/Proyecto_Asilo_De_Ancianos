import axios from "axios";
import {CampaniaForm} from "../components/CampaniaForm";
import {InstAsiloForm} from "../components/InstAsiloForm";
import {Layout} from "../components/Layout";
import Link from "next/link";


function HomePage({instAsilos, campanias}) {
  return (
    <div>
      <div>
        <CampaniaForm />
      </div>
      <div>
        <InstAsiloForm />
      </div>
      <div>
        <Layout>
          {instAsilos.map((instAsilo) => (
            <Link href={`/institucionAsilo/${instAsilo.ID}`} key={instAsilo.ID}>
              <div className="border border-gray-200 shadow-md p-6">
                <h1>{instAsilo.Nombre}</h1>
                <p>{instAsilo.NIT}</p>
                <p>{instAsilo.NombreRepresentantePrincipal}</p>
              </div>
            </Link>
          ))}
        </Layout>
      </div>
      
      <br/>
      <div>
        {campanias.map(campania => (
          <div key={campania.ID}>
            <h1>{campania.Nombre}</h1>
            <p>{campania.Requerimiento}</p>
            {/* <p>{campania.Estado}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async context => {
  // console.log(context);
  const {data: instAsilos} = await axios.get(
    'http://localhost:3000/api/instAsilos'
  )

  const {data: campanias} = await axios.get(
    'http://localhost:3000/api/campanias'
  )

  //console.log(res.data);

  return {
    props: {
      instAsilos,
      campanias,
    },
  };
};

export default HomePage