import dayjs from "dayjs";
import "dayjs/locale/it";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.locale("it");

const EMPTY_DATE_PREFIX = "0001-01-01";

function isEmptyDate(value: string | null | undefined) {
  return !value || value.startsWith(EMPTY_DATE_PREFIX);
}

export function formatDateTime(value: string | null | undefined) {
  if (isEmptyDate(value)) {
    return "—";
  }

  const parsed = dayjs(value);
  if (!parsed.isValid()) {
    return "—";
  }

  return parsed.format("DD/MM/YYYY HH:mm");
}

export function formatDate(value: string | null | undefined) {
  if (isEmptyDate(value)) {
    return "—";
  }

  const parsed = dayjs(value);
  if (!parsed.isValid()) {
    return "—";
  }

  return parsed.format("DD/MM/YYYY");
}

export function formatSlotUtcRange(
  slotStart: string | null | undefined,
  slotEnd: string | null | undefined,
) {
  if (isEmptyDate(slotStart) || isEmptyDate(slotEnd)) {
    return "—";
  }

  const start = dayjs.utc(slotStart);
  const end = dayjs.utc(slotEnd);
  if (!start.isValid() || !end.isValid()) {
    return "—";
  }

  return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
}

/**
 * Reservation slots are stored as UTC ISO strings whose clock time is the
 * building wall-clock time (see formatSlotUtcRange). Calendar libraries expect
 * local Date objects, so we map UTC fields onto the local calendar without TZ shift.
 */
export function parseReservationSlotForCalendar(
  value: string | null | undefined,
): Date | null {
  if (isEmptyDate(value)) {
    return null;
  }

  const parsed = dayjs.utc(value);
  if (!parsed.isValid()) {
    return null;
  }

  return new Date(
    parsed.year(),
    parsed.month(),
    parsed.date(),
    parsed.hour(),
    parsed.minute(),
    parsed.second(),
    parsed.millisecond(),
  );
}

export function buildReservationCalendarEventTimes(
  slotStart: string,
  slotEnd: string,
) {
  const start = parseReservationSlotForCalendar(slotStart);
  const end = parseReservationSlotForCalendar(slotEnd);

  if (!start || !end) {
    return null;
  }

  const startUtc = dayjs.utc(slotStart);
  const endUtc = dayjs.utc(slotEnd);
  let calendarEnd = end;

  if (
    endUtc.isSame(startUtc, "day") &&
    endUtc.valueOf() <= startUtc.valueOf()
  ) {
    calendarEnd = dayjs(start)
      .add(1, "day")
      .hour(endUtc.hour())
      .minute(endUtc.minute())
      .second(endUtc.second())
      .millisecond(0)
      .toDate();
  }

  const startDay = dayjs(start).startOf("day");
  if (!dayjs(calendarEnd).startOf("day").isSame(startDay)) {
    calendarEnd = startDay.endOf("day").toDate();
  }

  if (calendarEnd <= start) {
    calendarEnd = dayjs(start).add(30, "minute").toDate();
  }

  return { start, end: calendarEnd };
}
