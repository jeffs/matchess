// Each chessman is a Unicode text presentation sequence: an emoji character
// followed by the text presentation selector (U+FE0E).  Without the selector,
// mobile Firefox and Safari and some terminal emulators would present the
// black pawn as an emoji, but all other chessmen as text.  See also:
// http://www.unicode.org/reports/tr51/tr51-14.html#Emoji_Variation_Sequences


const ranks =[1, 2, 3, 4, 5, 6, 7, 8];
const files =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function rankIndex(rank) {
  return rank - 1;
}

function fileIndex(file) {
  return file.charCodeAt(0) - 'a'.charCodeAt(0);
}

export default {
  ranks,
  files,
  men: ['♔︎', '♕︎', '♖︎', '♗︎', '♘︎', '♙︎', '♚︎', '♛︎', '♜︎', '♝︎', '♞︎', '♟︎'],
  rankIndex,
  fileIndex,
};
