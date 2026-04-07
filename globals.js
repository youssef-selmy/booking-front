

export const domain = "https://admin.partners-checkin.com/api/v1";
export const FOLIO_HISTORY_ACCESS_KEY = "folioHistoryUnlocked";
export const FOLIO_HISTORY_ACCESS_EVENT = "folio-history-access-changed";

export const canAccessFolioHistory = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(FOLIO_HISTORY_ACCESS_KEY) === "true";
};

export const setFolioHistoryAccess = (allowed) => {
  if (typeof window === "undefined") return;

  if (allowed) {
    localStorage.setItem(FOLIO_HISTORY_ACCESS_KEY, "true");
  } else {
    localStorage.removeItem(FOLIO_HISTORY_ACCESS_KEY);
  }

  window.dispatchEvent(new Event(FOLIO_HISTORY_ACCESS_EVENT));
};
//
// export const domain = "http://localhost:8000/api/v1";
