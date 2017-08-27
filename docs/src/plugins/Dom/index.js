import Wrapper from './Wrapper';

export default (listenerMap) => ({
  Name: 'Dom',
  Wrapper: Wrapper(listenerMap)
});