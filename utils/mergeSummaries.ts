interface TickerSummary {
  name: string;
  ticker: string;
  amount: number;
  total: number;
}

export const mergeSummaries = (
  arr1: TickerSummary[],
  arr2: TickerSummary[]
): TickerSummary[] => {
  const summaryMap: Record<string, TickerSummary> = {};

  const addToMap = (arr: TickerSummary[]) => {
    arr?.forEach((item) => {
      if (summaryMap[item.ticker]) {
        summaryMap[item.ticker].amount =
          parseFloat(summaryMap[item.ticker].amount.toString()) +
          parseFloat(item.amount.toString());
        summaryMap[item.ticker].total =
          parseFloat(summaryMap[item.ticker].total.toString()) +
          parseFloat(item.total.toString());
      } else {
        summaryMap[item.ticker] = { ...item };
      }
    });
  };

  addToMap(arr1);
  addToMap(arr2);

  return Object.values(summaryMap);
};
