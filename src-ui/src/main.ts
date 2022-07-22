import { invoke } from "@tauri-apps/api";
import { listen, Event as TauriEvent } from "@tauri-apps/api/event";

const $ = document.querySelector.bind(document);

document.addEventListener("DOMContentLoaded", async function () {
  // Get the Elements
  const helloEl = $("div.hello")! as HTMLElement;
  const counterButtonEl = $("counter-button") as HTMLElement;
  const counterResultEl = $("counter-result") as HTMLElement;
  const pingEl = $("backend-ping")! as HTMLElement;

  // Listen backend-ping event (From Tauri Rust App)
  listen("backend-ping", function (evt: TauriEvent<any>) {
    pingEl.classList.add("on");
    setTimeout(function () {
      pingEl.classList.remove("on");
    }, 500);
  });

  // Counter button click
  counterButtonEl.addEventListener("pointerup", async function () {
    const result = (await invoke("add_count", { num: 1 })) as string;
    counterResultEl.textContent = result;
  });

  // Hello click
  helloEl.addEventListener("pointerup", async function () {
    const result = (await invoke("hello_world")) as string;
    helloEl.textContent = result;
    setTimeout(function () {
      helloEl.textContent = "Click again!";
    }, 1000);
  });
});
