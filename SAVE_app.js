alert();

// 1. takes the fetched JSON and assigns it to the variable data?  logs in console
async function alert() {
  const data = await getText("signindex.json");
  console.log(data);
}

// 2. Fetch the JSON File and write it to an object
async function getText(file) {
  let myObject = await fetch(file);
  myText = await myObject.json();
  return myText;
}

// 3???? create fuse instance
async function createFuse() {
  const fuse = await new Fuse(myText, options);
  console.log(fuse);
}

// 4?????  pass
async function fuseLookup() {
  const pattern = await document.getElementById("searchText").value;
  return fuse.search(pattern);
}

//Event Listener-  BROKEN somehow
document.getElementById("searchText").addEventListener("keyup", createFuse);

// // THIS ONE WILL GET THE SEARCH RESULTS AND LOOP THROUGH TO DISPLAY CARDS?
// async function searchResults() {
//   const results = await fuse.search(pattern);
//   console.log(pattern);
// }

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.2,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: ["Sign Index", "Arrow", "CompleteText"],
};

//console log testing and examples
console.log(123);
const number = 5;
const resultsText = document.getElementById("results");
resultsText.innerText = `${number} testing`;
console.log(number);
