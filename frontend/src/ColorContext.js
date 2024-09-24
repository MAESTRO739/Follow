import { createContext, useContext } from 'react';

const ColorContext = createContext();

export const useColors = () => {
  return useContext(ColorContext);
};

export default ColorContext;