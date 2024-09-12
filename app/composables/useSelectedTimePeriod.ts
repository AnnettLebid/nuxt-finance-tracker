import dayjs from "dayjs";

export const useSelectedTimePeriod = (period: Ref<string>) => {
  const current = computed(() => {
    switch (period.value) {
      case "Yearly":
        return {
          from: dayjs().startOf("year"),
          to: new Date(),
        };
      case "Monthly":
        return {
          from: dayjs().startOf("month"),
          to: new Date(),
        };
      case "Daily":
        return {
          from: dayjs().startOf("day"),
          to: new Date(),
        };
    }
  });
  const previous = computed(() => {
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
      case "Daily":
        return {
          from: dayjs().subtract(1, "day").startOf("day"),
          to: dayjs().subtract(1, "day").endOf("day"),
        };
    }
  });
  return { current, previous };
};
