type ValueOne = string;
type ValueTwo = {
  name: string;
  temperature: { celsius: number; created_at: Date };
};

export type TGaugeItem = {
  data: [ValueOne, ValueTwo];
};
