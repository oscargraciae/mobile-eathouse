export function thousandSpace(value) {
  let numStr = 0;
  const regex = /(\d+)(\d{3})/;

  if (typeof value === 'number') {
    numStr = String(value);
  } else {
    numStr = value;
  }

  return numStr.replace(/^\d+/, w => {
    while (regex.test(w)) {
      w = w.replace(regex, '$1,$2');
    }

    return w;
  })
}

export function toMoney(value) {
  let num = 0;

  if (typeof value === 'number') {
    num = value;
  } else if (typeof value === 'string') {
    num = parseFloat(value);
  } else {
    throw new Error('Cannot parse number');
  }

  return num.toFixed(2);
}

export function moneyThousand(value) {

  const _money = toMoney(value);

  return thousandSpace(_money);
}
