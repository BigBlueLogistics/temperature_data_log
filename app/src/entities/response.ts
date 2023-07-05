export type TResponse<Data> = {
  status: "succeeded" | "failed";
  data: Array<Data>;
};
