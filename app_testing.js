//using this version to test re-organizing the array.

//query with first 1000 items
const indexTable1 =
  "https://services3.arcgis.com/sNauqkn10AAheH0G/ArcGIS/rest/services/SignIndex_for_arcOnline/FeatureServer/0/query?where=OBJECTID+%3C1000&objectIds=&time=&resultType=none&outFields=SignIndex%2C+Arrow%2C+CompleteText&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// Fetch the JSON File and write it to an object
async function getText(file) {
  const response = await fetch(file);
  const myText = await response.json();
  console.log(myText);
  const indexArray = myText.features.map((x) => x);
  //const indexArray = myText.features.flat();
  console.log(indexArray);
  console.log(indexArray[0].attributes)
        // const newArray = []
        // indexArray.forEach(sign => {
        //   let newSign = {indexarray.}
        // }
  //const indexArray2 = indexArray.attributes.map((x) => x);
  //console.log(indexArray2);
  console.log(222);
  return indexArray;
}

// create fuse instanceS
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
  //console.log(fuse);
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
  createFuse(indexTable1, "searchText");
});
