export interface Note {
  _id: string;
  title: string;
  content: string;
  color: string;
  emoji: string;
  pinned: boolean;
  tags: string[];
  text: string;
  createdAt: string;
  updatedAt?: string; 
}

export interface NewNote {
  title: string;
  content: string;
  color: string;
  emoji: string;
  pinned: boolean;
  tags: string[];
  text: string;
}