import devWordToCleaned from "../assets/frequency/dev_word_to_cleaned.json";

const colorOptions = {
  1: "red",
  2: "green",
  3: "blue",
  4: "gold",
  5: "purple",
  6: "deeppink",
  7: "orange",
};

const colorOptions2 = [
  "black",
  "coral",
  "gold",
  "lightskyblue",
  "lightpink",
  "mediumseagreen",
  "darkgrey",
  "lightgrey",
]; // whole ann concatenated with parts

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

/** Make colored part annotations. */
export function makeAnnotation(annToColor) {
  return (
    <>
      {Object.entries(annToColor).map(([ann, color]) => {
        return <span style={{ color: color, marginRight: "18px" }}>{ann}</span>;
      })}
    </>
  );
}

/** Make colored concatenated annotations (xx#yy#zz). */
export function makeAnnotation2(ann) {
  const arr = ann.split("#");
  const arrlast = arr.length - 1;
  return (
    <>
      {arr.flatMap((a, idx) => {
        return idx === arrlast
          ? [<span style={{ color: colorOptions2[idx] }}>{a}</span>]
          : [
              <span style={{ color: colorOptions2[idx] }}>{a}</span>,
              <span style={{ color: "black" }}>{"#"}</span>,
            ];
      })}
    </>
  );
}

/** Add frequency to colored concatenated annotations. */
function numFormat(num) {
  // return num;
  return (Math.round(num * 100000) / 100000).toFixed(5);
}

function addFreq(phrase, freqDict) {
  //[freqDict]: {"word": [freq, log, rank]}
  var words = phrase.split(" ");
  var rs = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var cleanedWord = devWordToCleaned[word]; //cleaned version of the word
    if (cleanedWord) {
      // if cleaned version exists
      var [freq, logFreq, rank] = freqDict[cleanedWord];
      rs.push(
        word +
          "(" +
          numFormat(freq) +
          "," +
          numFormat(logFreq) +
          "," +
          rank +
          ")"
      );
    } else {
      // clean version doesn't exist
      rs.push(word + "(*)");
    }
  }

  var frq = rs.join(" ");
  return frq;
}

export function makeFrequency(ann, freqDict) {
  //[freqDict]: {"word": [freq, log, rank]}
  const arr = ann.split("#");
  const arrlast = arr.length - 1;

  return (
    <>
      {arr.flatMap((a, idx) => {
        return idx === arrlast
          ? [
              <span style={{ color: colorOptions2[idx] }}>
                {addFreq(a, freqDict)}
              </span>,
            ]
          : [
              <span style={{ color: colorOptions2[idx] }}>
                {addFreq(a, freqDict)}
              </span>,
              <span style={{ color: "black" }}>{"#"}</span>,
            ];
      })}
    </>
  );
}

export const sampled = [
  "page2-34.svg",
  "page9-46.svg",
  "page3-85.svg",
  "page7-107.svg",
  "page8-159.svg",
  "page6-203.svg",
  "page2-112.svg",
  "page1-116.svg",
  "page1-69.svg",
  "page8-234.svg",
  "page8-21.svg",
  "page5-75.svg",
  "page1-0.svg",
  "page5-59.svg",
  "page3-121.svg",
  "page6-164.svg",
  "page4-128.svg",
  "page5-136.svg",
  "page6-99.svg",
  "page7-14.svg",
  "page5-128.svg",
  "page9-27.svg",
  "page7-105.svg",
  "page6-162.svg",
  "page9-13.svg",
  "page1-128.svg",
  "page5-186.svg",
  "page3-72.svg",
  "page4-157.svg",
  "page3-182.svg",
  "page7-197.svg",
  "page7-180.svg",
  "page6-143.svg",
  "page7-81.svg",
  "page3-136.svg",
  "page5-64.svg",
  "page7-218.svg",
  "page3-128.svg",
  "page7-26.svg",
  "page6-78.svg",
  "page4-24.svg",
  "page5-153.svg",
  "page7-248.svg",
  "page5-244.svg",
  "page4-93.svg",
  "page5-28.svg",
  "page8-235.svg",
  "page5-200.svg",
  "page2-131.svg",
  "page8-183.svg",
  "page1-119.svg",
  "page5-232.svg",
  "page1-129.svg",
  "page4-162.svg",
  "page3-41.svg",
  "page6-180.svg",
  "page6-149.svg",
  "page1-105.svg",
  "page4-10.svg",
  "page5-178.svg",
  "page2-137.svg",
  "page3-35.svg",
  "page-A.svg",
  "page-B.svg",
  "page-C.svg",
  "page-D.svg",
  "page-E.svg",
  "page-F.svg",
  "page-G.svg",
  "page-H.svg",
  "page-I.svg",
  "page-J.svg",
  "page-K.svg",
  "page-L.svg",
];
