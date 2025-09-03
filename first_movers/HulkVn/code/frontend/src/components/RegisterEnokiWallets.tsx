import { useEffect } from 'react';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';

export function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext();

  useEffect(() => {
    if (!isEnokiNetwork(network)) return;

    const { unregister } = registerEnokiWallets({
      client: client as any,
      network,
      apiKey: import.meta.env.VITE_ENOKI_API_KEY as string,
      providers: {
        google: import.meta.env.VITE_ENOKI_GOOGLE_CLIENT_ID
          ? { clientId: import.meta.env.VITE_ENOKI_GOOGLE_CLIENT_ID }
          : undefined,
        facebook: import.meta.env.VITE_ENOKI_FACEBOOK_CLIENT_ID
          ? { clientId: import.meta.env.VITE_ENOKI_FACEBOOK_CLIENT_ID }
          : undefined,
        twitch: import.meta.env.VITE_ENOKI_TWITCH_CLIENT_ID
          ? { clientId: import.meta.env.VITE_ENOKI_TWITCH_CLIENT_ID }
          : undefined,
      },
    });

    return unregister;
  }, [client, network]);

  return null;
}
