export const ROUTES = {
  translations: "/translations",
};

export const API_ENDPOINTS = {
  translations: {
    get: "/api/translations",
  },
};

export function formatDateAgo(dateString?: string, item?: any): string {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

  if (seconds < 30) {
    return "just now";
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.round(hours / 24);
  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const months = Math.round(days / 30.44);
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.round(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}
