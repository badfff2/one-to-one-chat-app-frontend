import type { Client, IMessage, StompSubscription } from "@stomp/stompjs"

export type MessageHandler = (payload: IMessage) => void

export function subscribeToDestination(
  stompClient: Client,
  destination: string,
  handler: MessageHandler,
): StompSubscription {
  if (!stompClient.connected) {
    throw new Error(
      `Cannot subscribe before STOMP is connected: ${destination}`,
    )
  }

  return stompClient.subscribe(destination, handler)
}

export function subscribeToUserMessages(
  stompClient: Client,
  publicId: string,
  handler: MessageHandler,
): StompSubscription {
  return subscribeToDestination(
    stompClient,
    `/user/${publicId}/queue/messages`,
    handler,
  )
}
