## Grid block

Presents game state.  Converts DOM events to physical actions.

* Grid() returns the grid block, without tiles
* connect(store) subscribes to selectors and UI events

* pin(tile) causes tile to track mouse position (clamped to grid)
  - unpins any previously pinned tile

## DOM event listeners

* on window resize 
  - set top/left of each remaining tile to CSS calc expression

* on mousedown or touchstart
  - if on tile: dispatch Lift
* on mousemove
  - if any source tile is pinned: move tile, and dispatch Peek
* on mouseup or touchend
  - if on tile: dispatch Move
  - else: unpin tile, and dispatch Unpeek
* on touchcancel:
  - unpin tile, and dispatch Unpeek

## selectors (subscribed)

on next -> Option<Peek>

* if None:
  - clear all highlights
  - animate pinned tile (if any) into logical place
* if Some(Peek::From(source)):
  - pin source
  - clear all highlights
* if Some(Peek::Move(..)):
  - pin source
  - highlight target according to isValid

on move -> (Board, Move)

* copy the board and the move to local state
* set a timeout to place all tiles, in case transitions are interrupted
  - set the top/left of each remaining tile to CSS calc expression
* spawn an async callback chain of animations, proceeding on 'transitioned' events
  - transition source to target
  - annihilate source and target
  - move remaining tiles, per board
  - spawn new tiles, per board

on phase -> Phase

* If phase is phase.Over, add Game Over overlay
