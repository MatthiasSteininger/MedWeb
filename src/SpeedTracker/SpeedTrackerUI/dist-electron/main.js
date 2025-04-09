import { app as n, BrowserWindow as i, ipcMain as a } from "electron";
import { createRequire as m } from "node:module";
import { fileURLToPath as f } from "node:url";
import e from "node:path";
import { promises as s } from "node:fs";
m(import.meta.url);
const c = e.dirname(f(import.meta.url));
process.env.APP_ROOT = e.join(c, "..");
const r = process.env.VITE_DEV_SERVER_URL, j = e.join(process.env.APP_ROOT, "dist-electron"), l = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = r ? e.join(process.env.APP_ROOT, "public") : l;
let o;
function d() {
  o = new i({
    icon: e.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: e.join(c, "preload.mjs")
      //was preload.mjs for some reason
      // devTools: false
    }
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), r ? o.loadURL(r) : o.loadFile(e.join(l, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), o = null);
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && d();
});
a.handle("read-file", async (p) => {
  try {
    const t = e.join(n.getAppPath(), "data", "richtigeData.json");
    return await s.readFile(t, "utf-8");
  } catch (t) {
    throw new Error("Failed to read file: " + t.message);
  }
});
a.handle("rm-file", async (p) => {
  try {
    const t = e.join(n.getAppPath(), "data", "richtigeData.json");
    await s.rm(t);
  } catch (t) {
    throw new Error("Failed to read file: " + t.message);
  }
});
n.whenReady().then(d);
export {
  j as MAIN_DIST,
  l as RENDERER_DIST,
  r as VITE_DEV_SERVER_URL
};
