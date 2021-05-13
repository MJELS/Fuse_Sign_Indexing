//init
const signTable = getTables();

//Event Listener submit button
function submitSearch() {
  createFuse("searchText");
}

// //clipboard permissions
// navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
//   if (result.state == "granted" || result.state == "prompt") {
//     /* write to the clipboard now */
//   }
// });

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
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    minMatchCharLength: 2,
    // location: 0,
    threshold: 0.6,
    distance: 1000,
    // useExtendedSearch: false,
    ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["CompleteText"],
  };
  const data = await signTable;
  const fuse = new Fuse(data, options);
  const search = document.getElementById(elementId).value;
  const searchSpace = search.replace("-", " ");
  const searchList = searchSpace.split(" ");
  const searchObj = {};
  const searchArray = [];
  searchList.forEach((term) => {
    let obj = { CompleteText: term };
    searchArray.push(obj);
  });
  searchObj.$and = [...searchArray];
  console.log(fuse);
  //console.log(pattern);
  const results = fuse.search(searchObj);
  console.log(results);
  const galleryDiv = document.querySelector("#results-gallery");
  galleryDiv.innerHTML = "";
  results.forEach(function (element) {
    const cardDiv = document.createElement("result-card");
    const card = `
    <div id="result-card${element.item.SignIndex}" class="card">
      <div id="card-attributes">
        <div id="cardsign-index"><strong>Sign Index:</strong> ${element.item.SignIndex}</div>
        <button id= "button-${element.item.SignIndex}" >Copy Index #</button>
        <br />
        <div id="complete-text"><strong>Complete Text:</strong> ${element.item.CompleteText}</div>
        <br />
        <div id="arrow-direction"><strong>Arrow Direction:</strong> ${element.item.Arrow}</div>
      </div>
      <br />
        <img class="image"
          src="https://3d.idacq.com/projects/2018/Alb/Sign_Images/${element.item.SignIndex}.jpg"
          alt=""
        />
    </div>
    `;
    cardDiv.innerHTML = card;
    galleryDiv.appendChild(cardDiv);
    const button = document.getElementById(`button-${element.item.SignIndex}`);
    button.addEventListener("click", function () {
      navigator.clipboard.writeText(element.item.SignIndex);
    });
  });
}
