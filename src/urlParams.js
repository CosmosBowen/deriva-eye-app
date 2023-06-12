//queryString: ?dataset_rid=1234
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//dataset_rid: 1234
const dataset_rid = urlParams.get('dataset_rid')
console.log("dataset_rid:", dataset_rid);




function UrlParamsComponent() {

    const newQueryParams = new URLSearchParams({ dataset_rid });
    const newURL = `https://eye-ai.org/app/annotate?${newQueryParams.toString()}`;

    // ...

    return (
        <div>
            <h1>New URL: {newURL}</h1>
            {/* rest of your component */}
        </div>
    );
}

export default UrlParamsComponent;