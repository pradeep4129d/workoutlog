import React, { createContext, useContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider component
const MyProvider = ({ children }) => {
  const [muscle, setmuscle] = useState('');
  const setMuscle=(data)=>{
    setmuscle(data)
    sessionStorage.setItem('muscle',data)
  }
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
