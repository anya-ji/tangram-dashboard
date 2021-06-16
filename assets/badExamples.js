export const badExamples = [
  {
    whole: "woman in dress",
    piece: {
      1: "woman in dress",
      2: "woman in dress",
      3: "woman in dress",
      4: "woman in dress",
      5: "woman in dress",
      6: "woman in dress",
      7: "woman in dress",
    },
    explanation: "Didn't split into parts (e.g. head, arms, etc.).",
  },
  {
    whole: "woman in dress",
    piece: {
      1: "square",
      2: "parallelogram",
      3: "triangle",
      4: "triangle",
      5: "triangle",
      6: "triangle",
      7: "triangle",
    },
    explanation: "Described the literal shapes of the parts.",
  },

  {
    whole: "woman in dress",
    piece: {
      1: "ice cream",
      2: "table",
      3: "bowl",
      4: "bowl",
      5: "table",
      6: "table",
      7: "table",
    },
    explanation: "The part descriptions are irrelevant to the entire shape.",
  },

  {
    whole: "woman in dress",
    piece: {
      1: "head with hair bun",
      2: "right arm",
      3: "head with hair bun",
      4: "head with hair bun",
      5: "left arm",
      6: "body",
      7: "body",
    },
    explanation:
      "The red part could have been split into two separate parts (head, hair bun).",
  },

  // {
  //   file: "",
  //   whole: "",
  //   piece: {
  //     1: "",
  //     2: "",
  //     3: "",
  //     4: "",
  //     5: "",
  //     6: "",
  //     7: "",
  //   },

  //   explanation: "",
  // },
];
