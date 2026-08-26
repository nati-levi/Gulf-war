function escapeCsvField(value) {
  const str = value === undefined || value === null ? '' : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function transactionsToCsv(transactions) {
  const columns = [
    'date',
    'processedDate',
    'description',
    'memo',
    'originalAmount',
    'originalCurrency',
    'chargedAmount',
    'chargedCurrency',
    'status',
    'type',
    'category',
    'identifier',
  ];

  const lines = [columns.join(',')];
  for (const txn of transactions) {
    const row = columns.map((col) => escapeCsvField(txn[col]));
    lines.push(row.join(','));
  }
  return lines.join('\n');
}
