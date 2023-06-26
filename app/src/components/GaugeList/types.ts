export type Props = {
  initialTemp: {
    [key: string]: {
      name: string;
      temperature: {
        celsius: number;
        humidity: number;
        created_at: Date;
      } | null;
    };
  };
};

export type TGaugeData = {
  _id: string;
  celsius: number;
  humidity: number;
  heatindex: number;
  created_at: Date;
  room_id: number;
};
