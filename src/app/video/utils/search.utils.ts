export const getSearchIndex = (...params: string[]): string => {
  return params.map((param) => param.toLowerCase()).join(' ');
};
