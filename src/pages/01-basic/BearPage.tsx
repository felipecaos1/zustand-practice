import { WhiteCard } from "../../components";
import { useBearsStore } from "../../stores/Bears/bears.store";

export const BearPage = () => {
  

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        
        <PolarBears />

        <PandaBears />

         <BearsDusplay />   
      </div>
    </>
  );
};


export const BearsDusplay = () => {

  const bears = useBearsStore( state=> state.bears);

  const addBears = useBearsStore( state => state.addBear);
  const clearBear = useBearsStore( state => state.clearBear);
  return (
    <WhiteCard>

      <button onClick={()=>{addBears()}}>Añadir oso</button>
      <button onClick={()=>{clearBear()}}>Eliminar osos</button>
      <h1>Osos</h1>
      <pre>
        {JSON.stringify(bears, null, 2)}
      </pre>
    </WhiteCard>
  )
}



export const PandaBears = () =>{
  const pandaBears = useBearsStore((state) => state.pandaBears);
  const increasePandaBears = useBearsStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={()=>{increasePandaBears(+1)}}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={()=>{increasePandaBears(-1)}}>-1</button>
      </div>
    </WhiteCard>
  );
}

export const PolarBears = () => {
   const polarBears = useBearsStore((state) => state.polarBears);
   const increasePolarBear = useBearsStore((state) => state.increasePolarBear);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => {
            increasePolarBear(+1);
          }}
        >
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button
          onClick={() => {
            increasePolarBear(-1);
          }}
        >
          -1
        </button>
      </div>
    </WhiteCard>
  );
}


export const BlackBears = () => {
  const blackBears = useBearsStore((state) => state.blackBears);
  const increaseBlackBears = useBearsStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => {
            increaseBlackBears(+1);
          }}
        >
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button
          onClick={() => {
            increaseBlackBears(-1);
          }}
        >
          -1
        </button>
      </div>
    </WhiteCard>
  );
}
