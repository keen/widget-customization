import { createContext } from 'react';
import { PubSub } from '@keen.io/pubsub';

const AppContext = createContext<{
  modalContainer?: string;
  pubSub?: PubSub;
}>({
  modalContainer: null,
  pubSub: null,
});

export default AppContext;
