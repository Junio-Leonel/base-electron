declare global {
  interface Window {
    electron: {
      insertUser: (name: string) => void;
      getUsers: () => Promise<{ id: number; name: string }[]>;
    };
  }
}

export {};
