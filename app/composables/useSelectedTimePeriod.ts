import dayjs, { Dayjs } from "dayjs";

export interface TimePeriod {
  from: Dayjs;
  to: Dayjs;
}

export const useSelectedTimePeriod = (
  period: Ref<string>
): {
  current: Ref<TimePeriod>;
  previous: Ref<TimePeriod>;
} => {
  const current = computed(() => {
    switch (period.value) {
      case "Yearly":
        return {
          from: dayjs().startOf("year"),
          to: dayjs().endOf("year"),
        };
      case "Monthly":
        return {
          from: dayjs().startOf("month"),
          to: dayjs().endOf("month"),
        };
      default:
        return {
          from: dayjs().startOf("day"),
          to: dayjs().endOf("day"),
        };
    }
  });
  const previous = computed<TimePeriod>(() => {
    switch (period.value) {
      case "Yearly":
        return {
          from: dayjs().subtract(1, "year").startOf("year"),
          to: dayjs().subtract(1, "year").endOf("year"),
        };
      case "Monthly":
        return {
          from: dayjs().subtract(1, "month").startOf("month"),
          to: dayjs().subtract(1, "month").endOf("month"),
        };
      default:
        return {
          from: dayjs().subtract(1, "day").startOf("day"),
          to: dayjs().subtract(1, "day").endOf("day"),
        };
    }
  });
  return { current, previous };
};
