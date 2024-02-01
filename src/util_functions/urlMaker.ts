export const urlMaker = (str: string) => {
  return str.replaceAll(" ", "-").replaceAll("%", "").replaceAll("/", "");
};
