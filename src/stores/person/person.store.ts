import { type StateCreator, create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

interface PersonState {
  firstName: string;
  lastName: string;

  computed:{
    fullname:string
  }
}

interface Action {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

// Creamos un storage personalizado
const sessionStorage: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        console.log('getItem',name);

        return null;
    },

    setItem: function (name: string, value: string): void | Promise<void> {
        console.log('setItem', {name,value});
    },

    removeItem: function (name: string): void | Promise<void> {
         console.log("removeItem", name);
    }
}

// Extraemos el store para que sea mas legible incluirlo en el persist
const storeApi:StateCreator<PersonState & Action> = (set,get) => ({

  firstName: "",
  lastName: "",
  
  computed:{
      get fullname(){
          return get().firstName + ' ' + get().lastName;
        }
    },
    
    setFirstName: (value: string) => set(() => ({ firstName: value })),
    setLastName: (value: string) => set(() => ({ lastName: value })),
});

export const usePersonStore = create<PersonState & Action>()(
  persist(storeApi, { name: "person-store", storage: createJSONStorage(()=>sessionStorage) })
);
