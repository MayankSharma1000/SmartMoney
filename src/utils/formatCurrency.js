const currencyLocales = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
  AED: "en-AE",
  SGD: "en-SG",
  CAD: "en-CA",
  AUD: "en-AU",
  JPY: "ja-JP",
};

export function formatCurrency(
  value = 0,
  currency = "INR"
) {
  const safeCurrency =
    currencyLocales[currency]
      ? currency
      : "INR";

  const locale =
    currencyLocales[safeCurrency];

  const amount =
    Number(value) || 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: safeCurrency,
    maximumFractionDigits:
      safeCurrency === "JPY" ? 0 : 0,
  }).format(amount);
}

export default formatCurrency;
