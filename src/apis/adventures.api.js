import HttpClient from "~/services/HttpClient";

export default class AdventuresApi {
  static getConfig = () => ({
    queryKey: ["adventures", "config"],
    queryFn: () => HttpClient.get("adventures/config"),
  });

  static list = () => ({
    queryKey: ["adventures"],
    queryFn: () => HttpClient.get("adventures"),
  });

  static get = (id, relations = []) => ({
    queryKey: ["adventures", id, relations],
    queryFn: () =>
      HttpClient.get(`adventures/${id}`, {
        with: relations,
      }),
  });

  static create = () => ({
    mutationFn: (body) => HttpClient.post("adventures", null, body),
  });

  static update = (id) => ({
    mutationFn: (body) => HttpClient.patch(`adventures/${id}`, null, body),
  });
}
