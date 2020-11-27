declare global {
  interface Number {
    formatBrlMoneyWithoutPrefix(): string,
    formatBrlMoney(): string
  }
}

Number.prototype.formatBrlMoneyWithoutPrefix = function () {
  return this.toFixed(2).replace('.', ',');
}

Number.prototype.formatBrlMoney = function () {
  return `R$ ${this.formatBrlMoneyWithoutPrefix()}`;
}

export { }