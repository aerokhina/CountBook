export interface Dashboard {
income: SummaryModel,
  expense: SummaryModel,
  balance: SummaryModel
}

export interface SummaryModel{
  today: number,
  month: number,
  year: number
}
