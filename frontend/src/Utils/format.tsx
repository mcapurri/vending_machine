const formatPrice = (priceInCents: number): string => {
  return (priceInCents / 100).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
};

export { formatPrice };
