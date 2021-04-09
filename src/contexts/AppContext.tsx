import { createContext } from 'react';

const AppContext = createContext<{
  modalContainer?: string;
}>({
  modalContainer: null,
});

export default AppContext;
