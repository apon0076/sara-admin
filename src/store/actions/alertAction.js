export const SUCCESS = "ALERT_SUCCESS";
export const ERROR = "ALERT_ERROR";
export const CLEAR = "ALERT_CLEAR";

export function success(message) {
  return { type: SUCCESS, message };
}

export function error(message) {
  return { type: ERROR, message };
}

export function clear() {
  return { type: CLEAR };
}
