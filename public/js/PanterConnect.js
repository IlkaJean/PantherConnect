
fetch("/api/v1/hello").then(r => {console.log("here");r.text()}).then(data => console.log(data));