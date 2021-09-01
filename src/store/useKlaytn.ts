import shallow from 'zustand/shallow';
import { useStore } from './store';

const useKlaytn = () => {
  return useStore(
    (store) => ({
      network: store.networkVersion,
      setNetwork: store.setNetworkVersion,
    }),
    shallow,
  );
};

export default useKlaytn;
