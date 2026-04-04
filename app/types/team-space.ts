export interface Member {
  id: number;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  avatar: string;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export interface TeamFile {
  n: string;
  t: string;
  s: string;
  bg: string;
}

export interface TeamFolder {
  name: string;
  items: number;
  size: string;
}
