import { StateStorage } from "zustand/middleware";

const firebase_url = "https://zustand-f5986-default-rtdb.firebaseio.com/zustand";

export const firebaseStorage : StateStorage={
    getItem: async function (name: string): Promise<string | null>  {
        // recuperar de firebase
        try {
           const data =  await fetch(`${firebase_url}/${name}.json`).then( res=> res.json());
           console.log(data);
           
           return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        // grabar en firebase
           const data = await fetch(`${firebase_url}/${name}.json`,{
            method:'PUT',
            body:value,
           }).then(
             (res) => res.json()
           );


           return

    },
    removeItem: function (name: string): void | Promise<void> {
        // eliminar de firebase
    }
}