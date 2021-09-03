import { createContext } from 'react';
import { PubSub } from '@keen.io/Pubsub';

const AppContext = createContext<{
  modalContainer?: string;
  pubSub?: PubSub;
}>({
  modalContainer: null,
  pubSub: null,
});

export default AppContext;
