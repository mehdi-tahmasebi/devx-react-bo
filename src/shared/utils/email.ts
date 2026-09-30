const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAlertEmails(emails: string[]): string | undefined {
  if (emails.length === 0) {
    return undefined;
  }

  const invalid = emails.find((email) => !EMAIL_REGEX.test(email));
  if (invalid) {
    return `Indirizzo email non valido: ${invalid}`;
  }

  return undefined;
}
