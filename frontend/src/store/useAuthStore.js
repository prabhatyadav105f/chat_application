import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "prabhat", _id: 123, age: 23 },
  isLoading:false,
  login:()=>{
    set({isLoading:true});
    
  }
}));
