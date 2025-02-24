"use client"

import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import { PropsWithChildren, useEffect, useState } from "react";

const getAblyClient = () => {
  return new Ably.Realtime({
    authUrl: `${window.location.origin}/api/ably-token`,
    clientId: 'user-123',
    echoMessages: false,
  });
};

export function AblyClientProvider({ children }: PropsWithChildren) {
  const [client, setClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    const ablyClient = getAblyClient();
    setClient(ablyClient);

    return () => {
      ablyClient.close();
    };
  }, []);

  if (!client) {
    return null;
  }

  return (
    <AblyProvider client={client}>
      {children}
    </AblyProvider>
  );
} 