//This version uses the original json and works

// Fetch the JSON File and write it to an object
async function getText(file) {
  const response = await fetch(file);
  const myText = await response.json(1);
  console.log(myText);
  console.log(222);
  return myText;
}

// create fuse instance
async function createFuse(file, elementId) {
  const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: ["SignIndex", "Arrow", "CompleteText"],
  };
  const data = await getText(file);
  const fuse = new Fuse(data, options);
  const pattern = document.getElementById(elementId).value;
  console.log(fuse);
  console.log(pattern);
  const results = fuse.search(pattern);
  console.log(results);
  //const list = document.createElement("ul");    try starting with it already created
  const testUl = document.querySelector("#testUl");
  testUl.innerHTML = "";
  //list.id = 'ulID';
  results.forEach(function (element) {
    const li = document.createElement("li");
    li.innerText = element.item.Arrow;
    testUl.appendChild(li);
  });
  //testUl.appendChild(list);
  //console.log(list);
  //const testResults = document.querySelector("#testResults");
  //testResults.appendChild(list);
}

//Event Listener
document.getElementById("searchText").addEventListener("keyup", function () {
  createFuse("signindex.json", "searchText");
});
