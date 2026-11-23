// NextFloor-Plugin: zeigt alle Szenen und Skripte des Raum-Bereichs dauerhaft im Raum-Popup.
const bereichVon = (hass, id) => {
  const e = hass.entities?.[id];
  return e?.area_id ?? (e?.device_id ? hass.devices?.[e.device_id]?.area_id : undefined);
};

// Sprache: Deutsch, wenn Home Assistant oder der Browser auf Deutsch steht, sonst Englisch
const DE = String(document.querySelector("home-assistant")?.hass?.language ?? navigator.language ?? "")
  .toLowerCase().startsWith("de");

const plugin = {
  id: "raum-szenen",
  name: DE ? "Szenen & Skripte" : "Scenes & scripts",
  version: "1.1.0",
  apiVersion: 1,
  roomSections: [{
    id: "raum-szenen",
    render: ({ hass, room }) => {
      if (!room?.area_id) return null;
      const ids = Object.keys(hass.states)
        .filter((id) => /^(scene|script)\./.test(id) && bereichVon(hass, id) === room.area_id)
        .sort((a, b) => (hass.states[a].attributes.friendly_name ?? a)
          .localeCompare(hass.states[b].attributes.friendly_name ?? b, hass.language ?? "en"));
      if (!ids.length) return null;
      const box = document.createElement("div");
      box.style.cssText = "display:flex;flex-wrap:wrap;gap:6px";
      // Abschnitt im Raum-Popup (CSS-Grid) ganz nach oben schieben
      const css = document.createElement("style");
      css.textContent = '.nf-rp-plugin[data-plugin="raum-szenen/raum-szenen"]{order:-1}';
      box.appendChild(css);
      for (const id of ids) {
        const b = document.createElement("button");
        b.className = "nf-btn";
        b.textContent = hass.states[id].attributes.friendly_name ?? id;
        b.addEventListener("click", () =>
          hass.callService(id.split(".")[0], "turn_on", { entity_id: id }));
        box.appendChild(b);
      }
      // eingebauten Szenen-Abschnitt (erscheint sonst erst nach "weitere") ausblenden
      setTimeout(() => {
        const root = box.getRootNode();
        if (root instanceof ShadowRoot && !root.querySelector("style[data-raum-szenen]")) {
          const st = document.createElement("style");
          st.dataset.raumSzenen = "1";
          st.textContent = ".nf-rp-sec:not(.nf-rp-plugin):has(.nf-rp-scenes){display:none!important}";
          root.appendChild(st);
        }
      }, 0);
      return box;
    },
  }],
};

if (window.NextFloor) window.NextFloor.register(plugin);
else (window.__nextfloorPlugins ??= []).push(plugin);
