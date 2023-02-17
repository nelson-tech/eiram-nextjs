const formatCurrencyString = (amount: string) => {
  if (amount) {
    return (Number.parseInt(amount) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    })
  }
}

export default formatCurrencyString
