import { type StateCreator, create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { customeSessionStorage } from "../Storages/sesion-storage.storage"
import { firebaseStorage } from "../Storages/firebase.storage";
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
  persist(storeApi, {
    name: "person-store",
    // storage: createJSONStorage(() => customeSessionStorage),
    storage: createJSONStorage(() => firebaseStorage),
  })
);
