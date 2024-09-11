import dayjs from "dayjs";

export const useSelectedTimePeriod = (period: Ref<string>) => {
  const dates = computed(() => {
    switch (period.value) {
      case "Yearly":
        return {
          current: {
            from: dayjs().startOf("year"),
            to: new Date(),
          },
          previous: {
            from: dayjs().subtract(1, "year").startOf("year"),
            to: dayjs().subtract(1, "year").endOf("year"),
          },
        };
      case "Monthly":
        return {
          current: {
            from: dayjs().startOf("month"),
            to: new Date(),
          },
          previous: {
            from: dayjs().subtract(1, "month").startOf("month"),
            to: dayjs().subtract(1, "month").endOf("month"),
          },
        };
      case "Daily":
        return {
          current: {
            from: dayjs().startOf("day"),
            to: new Date(),
          },
          previous: {
            from: dayjs().subtract(1, "day").startOf("day"),
            to: dayjs().subtract(1, "day").endOf("day"),
          },
        };
    }
  });
  return dates;
};
