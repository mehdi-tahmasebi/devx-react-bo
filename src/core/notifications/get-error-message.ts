import axios from "axios";
import type { TApiErrorResponse } from "@/core/api/api.type";

const FORBIDDEN_MESSAGE = "Non hai i permessi per questa operazione";

const ERROR_CODE_MESSAGES: Record<string, string> = {
  INVALID_URL: "L'URL della call-to-action non è valido",
  BUILDING_ONBOARDING_UNAUTHORIZED:
    "Non hai i permessi per questa operazione",
  BUILDING_ONBOARDING_DOCUMENT_NOT_FOUND:
    "Documento del capitolato non trovato",
  BUILDING_ONBOARDING_TIMELINE_MEDIA_MUST_BE_IMAGE:
    "Le foto della timeline devono essere immagini (PNG, JPG, WebP)",
  BUILDING_ONBOARDING_TIMELINE_ATTACHMENT_MUST_NOT_BE_IMAGE:
    "Gli allegati della timeline non possono essere immagini; usa il caricamento foto",
  BUILDING_ONBOARDING_CATALOG_UNAUTHORIZED:
    "Non hai i permessi per questa operazione",
  BUILDING_ROOM_TYPE_IN_USE:
    "La tipologia di stanza è usata da una o più tipologie di appartamento e non può essere eliminata",
  MATERIAL_CATEGORY_IN_USE:
    "La categoria materiali è in uso e non può essere eliminata",
  BUILDING_ROOM_TYPE_CODE_EXISTS:
    "Esiste già una tipologia di stanza con questo codice",
  BUILDING_APARTMENT_TYPE_CODE_EXISTS:
    "Esiste già una tipologia di appartamento con questo codice",
  MATERIAL_CATEGORY_CODE_EXISTS:
    "Esiste già una categoria materiali con questo codice",
  BUILDING_ROOM_TYPE_NOT_IN_BUILDING:
    "Una o più tipologie di stanza non appartengono a questo Building",
  BUILDING_CONFIGURATOR_CODE_EXISTS:
    "Esiste già un configuratore con questo codice",
  BUILDING_CONFIGURATOR_CODE_RESERVED:
    "Questo codice è riservato e non può essere usato",
  BUILDING_CONFIGURATOR_IN_USE:
    "Il configuratore è in uso e non può essere eliminato",
  BUILDING_CONFIGURATOR_NOT_IN_BUILDING:
    "Uno o più configuratori non appartengono a questo Building",
  APARTMENT_ACTIVE_CONFIGURATOR_DISABLED:
    "Il configuratore non è abilitato per questo appartamento",
  APARTMENT_ACTIVE_CONFIGURATOR_NOT_ASSIGNED:
    "Il configuratore non è assegnato a questo appartamento",
  APARTMENT_ONBOARDING_UNAUTHORIZED:
    "Non hai i permessi per questa operazione",
  APARTMENT_ONBOARDING_CHOICE_ALREADY_EXISTS:
    "Esiste già una scelta per questa stanza e categoria",
  APARTMENT_ONBOARDING_DOCUMENT_NOT_FOUND:
    "Documento dell'onboarding non trovato",
  APARTMENT_ONBOARDING_TIMELINE_MEDIA_MUST_BE_IMAGE:
    "Le foto della timeline devono essere immagini (PNG, JPG, WebP)",
  APARTMENT_ONBOARDING_TIMELINE_ATTACHMENT_MUST_NOT_BE_IMAGE:
    "Gli allegati della timeline non possono essere immagini; usa il caricamento foto",
  SERVICE_CATEGORY_IN_USE:
    "La categoria è in uso da uno o più servizi e non può essere eliminata",
  SERVICE_COMPOSABLE_OPTIONS_NOT_EDITABLE:
    "Le opzioni componibili non sono modificabili per questo tipo di servizio",
  INVALID_EMAIL: "Uno o più indirizzi email non sono validi",
  INVALID_PHONE_NUMBER: "Il numero di telefono non è valido",
  INVALID_SERVICE_PROVIDER:
    "Il fornitore selezionato non è un ServiceProvider valido",
  USER_NOT_RESIDENT:
    "La vista gruppi è disponibile solo per gli utenti residenti",
  AMENITY_BLOCK_RELEASE_HAS_ACTIVE_RESERVATIONS:
    "Impossibile revocare il rilascio: esiste una prenotazione attiva nell'intervallo. Annulla la prenotazione da Prenotazioni → Spazi, poi riprova.",
};

function isApiErrorResponse(data: unknown): data is TApiErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "errorMessage" in data &&
    typeof data.errorMessage === "string" &&
    data.errorMessage.trim().length > 0
  );
}

function isLegacyErrorResponse(
  data: unknown,
): data is { message: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  );
}

function getApiErrorCode(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null || !("errorCode" in data)) {
    return undefined;
  }

  const code = (data as { errorCode?: unknown }).errorCode;
  return typeof code === "string" && code.trim().length > 0 ? code : undefined;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    const status = error.response?.status;
    const errorCode = getApiErrorCode(data);

    if (errorCode && ERROR_CODE_MESSAGES[errorCode]) {
      return ERROR_CODE_MESSAGES[errorCode];
    }

    if (isApiErrorResponse(data)) {
      return data.errorMessage;
    }

    if (isLegacyErrorResponse(data)) {
      return data.message;
    }

    if (status === 403) {
      return FORBIDDEN_MESSAGE;
    }

    return fallback;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    if (error.message.startsWith("Request failed with status code")) {
      return fallback;
    }

    return error.message;
  }

  return fallback;
}
