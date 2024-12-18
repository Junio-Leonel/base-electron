const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  insertUser: (name) => ipcRenderer.send("insert-user", name),
  getUsers: () => ipcRenderer.invoke("get-users"),
});
