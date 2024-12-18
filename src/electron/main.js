import { app, BrowserWindow, ipcMain } from "electron";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

sqlite3.verbose();

const db = new sqlite3.Database(path.join(app.getPath("userData"), "myapp.db"));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../../dist-react/index.html"));
};

app.whenReady().then(() => {
  createWindow();

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
    );
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("insert-user", (event, name) => {
  db.run("INSERT INTO users (name) VALUES (?)", [name], function (err) {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
    } else {
      console.log("Usuário inserido com ID:", this.lastID);
    }
  });
});

ipcMain.handle("get-users", async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});
