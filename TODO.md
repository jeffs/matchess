## P1

### Code

* User input with real-time indicators
  - keyboard: rank/file => source, rank/file => target
  - drag and drop
* Basic gameplay: Drag, drop, annihilate

### Design

* Gameplay!  Rules, goals, achievements, play testing
* UX: transitions, focus indicators (borders, bouncing, highlights)
* Level system
* Extended theme system: art, music, sounds, particles, haptics

## Documentation

* Flesh out doc/help.txt
* Internals: Explain blocks, components, and ducks

## P2

* Splash screen
* Chess board details
  - alternating rectangles
  - rank and file labels
  - rank/file/tile selection
* Control panel
  - responsive layout
  - current source/target indicator
  - valid/invalid move indicator
  - theme chooser
  - online [help](./doc/help.md) link
* NPC AI; use as quick & dirty play-test
  - e.g., how many moves does it take to clear a typical board?

## P3

### Code

* Level and theme design tools
* Reusable RGBA compositing function
* Dependency mapping tool; spiritually `grep 'import'`
* More controls
  - level chooser; number/description: “Level 1: Queens Only”
  - about/credits crawl
  - undo/redo, reset (with confirmation)
  - current/max score

### Design

* Levels
* Themes
* NPCs; non-confrontational: play is purely collaborative

## P4

### Code

* Fortune chyron/snackbar
  - [fortunes]( http://fortunes.cat-v.org/ )
  - [QOTD]( https://en.wikiquote.org/wiki/Main_Page )
  - [QI]( https://quoteinvestigator.com/ )
