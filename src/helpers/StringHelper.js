export default class StringHelper {
  static isNullOrEmpty = (text) =>
    !text || typeof text !== "string" || text.trim() === "";
}
