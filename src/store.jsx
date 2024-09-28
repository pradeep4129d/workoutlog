import React, { createContext, useContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider component
const MyProvider = ({ children }) => {
  const [muscle, setMuscle] = useState({name:'',img:''});

  return (
    <MyContext.Provider value={{ muscle, setMuscle }}>
      {children}
    </MyContext.Provider>
  );
};
const useStore=()=>{
    return useContext(MyContext)
}
export { useStore, MyProvider };
