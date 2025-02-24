import * as Ably from 'ably';
import { configureAbly } from "@ably-labs/react-hooks";

export const getClientId = () => "user-123"; // This should match the userId in ChatWindow

export const ably = configureAbly({
  authCallback: async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/ably-token');
    return await response.json();
  },
  clientId: getClientId(),
});

export function getChannelName(therapistId: number, userId: string) {
  return `chat:${therapistId}:${userId}`;
} 