import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

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
