import HttpClient from "~/services/HttpClient";

export default class AdventureItemsApi {
  static create = (adventureId) => ({
    mutationFn: (body) =>
      HttpClient.post(`adventures/${adventureId}/items`, null, body),
  });

  static update = (adventureId, itemId) => ({
    mutationFn: (body) =>
      HttpClient.patch(`adventures/${adventureId}/items/${itemId}`, null, body),
  });

  static remove = (adventureId) => ({
    mutationFn: (itemId) =>
      HttpClient.delete(`adventures/${adventureId}/items/${itemId}`),
  });
}
