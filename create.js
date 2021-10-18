const { v4: uuidv4 } = require("uuid");
const main = (products, quantity) => {
  const end = quantity - 1;
  const { dictionary, combinations } = getDictionary(products);
  const resultCombination = {};
  for (let i = 0; i < end; i++) {
    const actualCombinations = combinations[i];
    combinations.push([]);
    for (let j = 0; j < actualCombinations.length; j++) {
      const realCombination = actualCombinations[j];
      for (let k = 0; k < combinations[0].length; k++) {
        const keyCombination = combinations[0][k];
        let newCombination = `${realCombination}-${keyCombination}`;
        newCombination = sortNewCombination(newCombination);
        if (!resultCombination[newCombination]) {
          resultCombination[newCombination] = true;
          combinations[i + 1].push(newCombination);
        }
      }
    }
  }
  const last = combinations.length - 1;
  const results = [];
  for (let i = 0; i < combinations[last].length; i++) {
    const possibleCombination = combinations[last][i];
    const realCombination = descryptCombination(
      possibleCombination,
      dictionary
    );
    results.push({ combination: realCombination, variant: uuidv4() });
  }
  console.log("total combinations", results.length);
  console.log("-----");
  console.log(results);
  return results;
};

const descryptCombination = function (possibleCombination, dictionary) {
  let keys = possibleCombination.split("-");
  keys = keys.map((x) => parseInt(x));
  let newKey = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const descryptKey = dictionary[key];
    if (!newKey[descryptKey]) {
      newKey[descryptKey] = 1;
    } else {
      newKey[descryptKey] += 1;
    }
  }
  return newKey;
};
const sortNewCombination = function (newCombination) {
  let arrayCombination = newCombination.split("-");
  arrayCombination = arrayCombination.map((x) => parseInt(x));
  arrayCombination.sort((a, b) => a - b);
  return arrayCombination.join("-");
};

const getDictionary = (products) => {
  const dictionary = {};
  const combination = [];
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    dictionary[i.toString()] = element;
    combination.push(i.toString());
  }
  return { combinations: [combination], dictionary };
};

main(["A", "B", "C", "D"], 2);
