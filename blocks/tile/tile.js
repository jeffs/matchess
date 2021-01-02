// Note that each emoji is followed by the Unicode text presentation selector
// (U+FE0E).  Without such a selector, mobile Firefox and Safari present the
// black pawn as an emoji, but all other chessmen as text.  See also:
// http://www.unicode.org/reports/tr51/tr51-14.html#Emoji_Variation_Sequences
const chessmen = ['♔︎', '♕︎', '♖︎', '♗︎', '♘︎', '♙︎', '♚︎', '♛︎', '♜︎', '♝︎', '♞︎', '♟︎'];

export default function Tile() {
  const span = document.createElement('span');
  span.classList.add('tile');

  const chessman = chessmen[Math.floor(chessmen.length * Math.random())];
  span.append(chessman);

  return {
    node() {
      return span;
    },
  }
}
