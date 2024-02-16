const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" })
    .format(value)
    .replace(/\D00$/, "");
};

export default formatCurrency;
