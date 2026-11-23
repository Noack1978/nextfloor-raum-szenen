# NextFloor Raum-Szenen

[![Open your Home Assistant instance and open this repository in HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Noack1978&repository=nextfloor-raum-szenen&category=plugin)

Plugin für [NextFloor](https://github.com/therealMRBK/NextFloor), die 3D-Grundriss-Karte für Home Assistant.

Szenen und Skripte, die in Home Assistant dem Bereich eines Raums zugeordnet sind, stehen im Raum-Popup normalerweise erst hinter „weitere Geräte". Dieses Plugin zeigt sie **dauerhaft als Buttons ganz oben im Raum-Popup**. Ein Tipp auf einen Button startet die Szene oder das Skript.

## Installation

**Über den NextFloor-Store:** *Erweiterungen → Plugins → Plugin-Store öffnen* und **Installieren** drücken.

**Von Hand:**
1. `nextfloor-raum-szenen.js` nach `/config/www/nextfloor/` kopieren.
2. In NextFloor unter *Erweiterungen → Plugins* den Pfad `/local/nextfloor/nextfloor-raum-szenen.js` eintragen und **Hinzufügen** drücken.
3. Dashboard neu laden.

**Über HACS:** Repository als Kategorie *Dashboard* hinzufügen, danach in NextFloor unter *Erweiterungen → Plugins* aufnehmen.

## Verwendung

Keine Einstellungen nötig. Name und Texte folgen der Sprache von Home Assistant (Deutsch oder Englisch). Alle `scene.*` und `script.*` mit der Bereichszuordnung des Raums erscheinen automatisch, alphabetisch sortiert. Neue Szenen oder Skripte tauchen auf, sobald du sie dem Bereich zuweist.

## Hinweise

- Das Plugin ruft den Dienst `scene.turn_on` bzw. `script.turn_on` auf, und zwar nur, wenn du einen Button antippst.
- Die Position ganz oben wird über CSS (`order`) erreicht. Ändert NextFloor sein Popup-Layout, steht der Abschnitt wieder unten, funktioniert aber weiter.
- Die Zuordnung läuft über die Entität oder deren Gerät (`area_id`).

## Lizenz

MIT
