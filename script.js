const form = document.getElementById("form");
const operation = document.getElementById("operation");
const table = document.getElementById("binaryRelation");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const setA = formData
    .get("a")
    .split(",")
    .map((element) => Number(element));

  const setB = formData
    .get("b")
    .split(",")
    .map((element) => Number(element));

  let theLargestSet = [];
  let theSmallestSet = [];

  if (setA.length >= setB.length) {
    theLargestSet = setA;
    theSmallestSet = setB;
  } else {
    theLargestSet = setB;
    theSmallestSet = setA;
  }

  const valuesMap = new Map();

  theLargestSet.forEach((element) => {
    valuesMap.set(element, true);
  });

  const setC = [];

  theSmallestSet.forEach((element) => {
    if (valuesMap.get(element) === true) setC.push(element);
  });

  operation.textContent = setC.join(", ");

  const binaryRelation = [];

  for (let i = 0; i < setA.length + 1; i++) {
    binaryRelation.push([]);

    for (let j = 0; j < setB.length + 1; j++) {
      if (i === 0 && j === 0) binaryRelation[i].push("A x B");
      else if (i === 0 && j > 0) binaryRelation[i].push(setB[j - 1]);
      else if (i > 0 && j === 0) binaryRelation[i].push(setA[i - 1]);
      else binaryRelation[i].push(setA[i - 1] < setB[j - 1] ? "1" : "0");
    }
  }

  table.innerHTML = `
  <tbody>
${binaryRelation
  .map(
    (setAelement) => `
  <tr>
  ${setAelement
    .map(
      (setBelement) => `
    <td>
    ${setBelement}
    </td>
    `,
    )
    .join("")}
  </tr>
  `,
  )
  .join("")}
  </tbody>
  `;
});
