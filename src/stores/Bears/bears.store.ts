import { create } from 'zustand'


interface Bear {
  id: number, 
  name: string
}
interface BearState {
    blackBears:number;
    polarBears:number;
    pandaBears:number;

    bears: Bear[];

    computed:{
      totalOsos:number;
    },

    increaseBlackBears: (by:number)=>void;
    increasePolarBear: (by:number)=>void;
    increasePandaBears: (by:number)=>void;

    addBear:()=>void;
    clearBear:()=>void;
}

export const useBearsStore = create<BearState>()((set,get) => ({
  blackBears:10,
  polarBears:0,
  pandaBears:0,

  bears:[ { id:1, name: 'Pandita' }, {id:2, name:'Poo'}],

  computed:{
    get totalOsos(){
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    },
  },

  increaseBlackBears: (by:number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBear: (by:number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by:number) => set((state) => ({ pandaBears: state.pandaBears + by })),
  
  addBear: () => set((state) => ({ bears:[...state.bears, {id: state.bears.length+1 , name:`Osos ${state.bears.length + 1}`}]})),
  clearBear: () => set(() => ({ bears:[]})),


}))