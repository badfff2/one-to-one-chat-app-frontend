import type { ChatMessage } from "../interface/interface"

export function formatMessageTimestamp(timestamp: ChatMessage["timestamp"]) {
  if (!timestamp) {
    return ""
  }

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function getMessageDateTime(timestamp: ChatMessage["timestamp"]) {
  if (!timestamp) {
    return undefined
  }

  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}
