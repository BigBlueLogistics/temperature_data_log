export type Props = {
  initialTemp: {
    [key: string]: {
      name: string;
      temperature: { celsius: number; created_at: Date };
    };
  };
};

export type TStreamData = {
  _id: string;
  celsius: number;
  humidity: number;
  heatindex: number;
  created_at: Date;
  room_id: number;
};
