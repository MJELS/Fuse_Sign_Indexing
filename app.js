//attempting to figure out how to take the two index tables and add together.
//may need major re-organization

//table with first 1000 items
// const indexTable1 =
//   "https://services3.arcgis.com/sNauqkn10AAheH0G/ArcGIS/rest/services/SignIndex_for_arcOnline/FeatureServer/0/query?where=OBJECTID+%3C1000&objectIds=&time=&resultType=none&outFields=SignIndex%2C+Arrow%2C+CompleteText&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";
//table with second 1000 items
// const indexTable2 =
//   "https://services3.arcgis.com/sNauqkn10AAheH0G/ArcGIS/rest/services/SignIndex_for_arcOnline/FeatureServer/0/query?where=OBJECTID+%3E+999&objectIds=&time=&resultType=none&outFields=SignIndex%2C+Arrow%2C+CompleteText&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";
//const sourceList = (indexTable1, indexTable2);

//init
const signTable = getTables();

//Event Listener
document.getElementById("searchText").addEventListener("keyup", function () {
  createFuse("searchText");
});

// Fetch the JSON File and write it to an object
async function getTables() {
  const table1Request = await fetch(
    "https://services3.arcgis.com/sNauqkn10AAheH0G/ArcGIS/rest/services/SignIndex_for_arcOnline/FeatureServer/0/query?where=OBJECTID+%3C1000&objectIds=&time=&resultType=none&outFields=SignIndex%2C+Arrow%2C+CompleteText&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token="
  );
  const table1Json = await table1Request.json();
  const indexArrayNested1 = table1Json.features;
  const indexArray = indexArrayNested1.map((x) => x.attributes);

  const table2Request = await fetch(
    "https://services3.arcgis.com/sNauqkn10AAheH0G/ArcGIS/rest/services/SignIndex_for_arcOnline/FeatureServer/0/query?where=OBJECTID+%3E+999&objectIds=&time=&resultType=none&outFields=SignIndex%2C+Arrow%2C+CompleteText&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token="
  );
  const table2Json = await table2Request.json();
  const indexArrayNested2 = table2Json.features;
  const indexArray2 = indexArrayNested2.map((x) => x.attributes);

  const allSigns = indexArray.concat(indexArray2);
  return allSigns;
}
// create fuse instance
async function createFuse(elementId) {
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
  const data = await signTable;
  const fuse = new Fuse(data, options);
  const pattern = document.getElementById(elementId).value;
  console.log(fuse);
  console.log(pattern);
  const results = fuse.search(pattern);
  console.log(results);
  //const list = document.createElement("ul");    try starting with it already created
  const galleryDiv = document.querySelector("#results-gallery");
  results.forEach(function (element) {
    const cardDiv = document.createElement("result-card");
    cardDiv.innerHTML = ```
    <div id="result-card">
      <div id="card-attributes">
        <h4 id="sign-index">Sign Index: ${element.item.SignIndex}</h4>
        <h4 id="complete-text">
          Complete Text: ${element.item.CompleteText}
        </h4>
        <h4 id="arrow-direction">Arrow Direction: ${element.item.Arrow}</h4>
      </div>
      <div id="card-image">
        <img
          src="https://3d.idacq.com/projects/2018/Alb/Sign_Images/${element.item.SignIndex}.jpg"
          alt=""
          maxwidth="50"
        />
      </div>
    </div>
```;
    galleryDiv.appendChild(cardDiv);
  });
  //TO_DO galleryDiv.innerHTML= String of html of all cards together
  //results.forEach();
}
