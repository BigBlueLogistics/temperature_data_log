type ValueOne = string;
type ValueTwo = {
  name: string;
  temperature: { celsius: number; humidity: number; created_at: Date } | null;
};

export type TGaugeItem = {
  data: [ValueOne, ValueTwo];
};
