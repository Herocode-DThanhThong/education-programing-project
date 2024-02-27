export const modifyCharacterContainsSpecialCharacter = (data: string) => {
  let result = data;
  result = result.replaceAll("#", "%23");
  result = result.replaceAll("+", "%2B");

  return result;
};
