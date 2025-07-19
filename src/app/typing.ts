export type ListItem = {
  id?: string;
  title: string;
  weight?: string;
};

export type ListData = {
  list: ListItem[];
  lastId: number;
};

export type ListElements = {
  titleInput: HTMLInputElement;
  weightsInput: HTMLInputElement;
  listLabel: HTMLLabelElement;
};
