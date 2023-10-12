export type TResponse<Data, Message extends unknown = string> = {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: Array<Data>;
  message: Message;
};
