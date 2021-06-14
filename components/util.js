const colorOptions = {
  1: "red",
  2: "green",
  3: "blue",
  4: "gold",
  5: "purple",
  6: "deeppink",
  7: "orange",
};

export function makeColor(ann) {
  var annToColor = {};
  var pieceToColor = [];
  for (var i = 1; i < 8; i++) {
    const color = annToColor[ann[i]];
    if (color) {
      // annotation exists
      pieceToColor[i - 1] = color;
    } else {
      // unique annotation
      const newColor = colorOptions[i];
      annToColor[ann[i]] = newColor;
      pieceToColor[i - 1] = newColor;
    }
  }
  return { colors: pieceToColor, annToColor: annToColor };
}
