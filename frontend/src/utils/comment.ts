import { IComment } from 'types';

export const getRootComments = (data: Array<IComment>) => {
  return data.filter((c) => !c.parent);
};

export const getChildComment = (id: string, data: Array<IComment>) => {
  return data.filter((c) => c.parent?.id === id);
};
