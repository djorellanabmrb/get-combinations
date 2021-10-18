let allVariants = [
  {
    combination: { A: 2 },
    variant: "b24459be-9968-45fb-8e6b-226be7077416",
  },
  {
    combination: { A: 1, B: 1 },
    variant: "d10c2c1d-b2a0-4b0b-962e-a157a881cfab",
  },
  {
    combination: { A: 1, C: 1 },
    variant: "454c7b47-3520-43f0-a355-567b4329234d",
  },
  {
    combination: { A: 1, D: 1 },
    variant: "767f3ee9-dadc-4d74-a452-8bc6d6072154",
  },
  {
    combination: { B: 2 },
    variant: "828919c8-7ff5-40ac-a476-036b903748de",
  },
  {
    combination: { B: 1, C: 1 },
    variant: "e740648f-0cdb-413e-a877-c17403b63242",
  },
  {
    combination: { B: 1, D: 1 },
    variant: "420af2da-51dd-4dc4-a5d0-114224455716",
  },
  {
    combination: { C: 2 },
    variant: "ab6db028-65c1-40ab-b1c1-d6c370557dda",
  },
  {
    combination: { C: 1, D: 1 },
    variant: "1a2317ab-d742-4332-8bcc-0fab0fdd3ba0",
  },
  {
    combination: { D: 2 },
    variant: "a05a5791-5a6f-41f9-be95-525a23110df2",
  },
];

const find = (variants, variantToFind) => {
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    let isFound = false;
    try {
      for (const variantKey in variant.combination) {
        if (variant.combination[variantKey] != variantToFind[variantKey]) {
          throw new Error("next variant");
        }
      }
      isFound = true;
    } catch (error) {
      isFound = false;
    }
    if (isFound) {
      return variant;
    }
  }
  throw new Error("Combination of the variant incorrect");
};

const transform = (metafields) => {
  let dictionaryTransform = {};
  for (let i = 0; i < metafields.length; i++) {
    const meta = metafields[i];
    let parse = JSON.parse(meta.value);
    dictionaryTransform[parse._id] = parse.quantity;
  }
  return dictionaryTransform;
};

const main = () => {
  const metaFieldsItem = [
    {
      key: "0",
      value: '{"quantity":3,"_id":"A"}',
    },
  ];
  const transformMeta = transform(metaFieldsItem);
  let variantToFind = find(allVariants, transformMeta);
  console.log(variantToFind);
};

main();
