export const useCurrency = (amount: any) => {
  const currency = computed(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(isRef(amount) ? amount.value : amount);
  });

  return { currency };
};
