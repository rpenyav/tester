// src/helpers/validationHelpers.ts

/**
 * Validación de URL con protocolo http o https.
 */
export const isValidHttpUrl = (string: string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

/**
 * Validación de campos de texto requeridos.
 */
export const isRequired = (string: string) => string.trim().length > 0;

/**
 * Validación de la longitud mínima de un texto.
 */
export const minLength = (string: string, length: number) =>
  string.trim().length >= length;
