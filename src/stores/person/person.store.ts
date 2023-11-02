import { type StateCreator, create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// import { customeSessionStorage } from "../Storages/sesion-storage.storage"
import { firebaseStorage } from "../Storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";
interface PersonState {
  firstName: string;
  lastName: string;

  fullname: () => string;
}

interface Action {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

// Extraemos el store para que sea mas legible incluirlo en el persist
const storeApi: StateCreator<
  PersonState & Action,
  [["zustand/devtools", never]]
> = (set, get) => ({
  firstName: "",
  lastName: "",

  fullname: () => {
    return get().firstName + " " + get().lastName;
  },

  setFirstName: (value: string) =>
    set((state) => ({ firstName: value }), false, "setnombre"),
  setLastName: (value: string) =>
    set(() => ({ lastName: value }), false, "setapellido"),
});

export const usePersonStore = create<PersonState & Action>()(
  logger(
    devtools(
      persist(storeApi, {
        name: "person-store",
        // storage: createJSONStorage(() => customeSessionStorage),
        storage: createJSONStorage(() => firebaseStorage),
      })
    )
  )
);
