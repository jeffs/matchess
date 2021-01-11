## State

```rust
struct Tile { id: Number, label: String } // label is any of "♙♘♗♖♕♔♚♛♜♝♞♟"
struct Place { rank: Number, file: String } // 1..=8, 'a'..='h'
struct TilePlace { tile: Tile, place: Place }
struct Move { source: TilePlace, target: TilePlace }
struct Board(Vec<TilePlace>);

enum Phase { Ready, Over }

enum Peek {
    From { source: TilePlace },
    Move { source: TilePlace, target: TilePlace, is_valid: bool },
}

struct Game {
    tiles: Board,
    phase: Phase,
    #move: Option<Move>,
    next: Option<Peek>,
}
```

## actions (received)

* Lift(TilePlace)
* Peek(Move)
* Move(Move)
* Unpeek

## reducer

* on Lift: update game.next
* on Peek: validate; update game.next
* on Move: clear game.next; if valid:
  - update game.move
  - update game.tiles
  - update game.phase; if not Over, back-fill empty spaces in game.tiles
* on Unpeek: clear game.next

## selectors

* tiles -> { tiles: Board, move: Option<Move> }
* phase -> Phase
* next -> Option<Peek>
