async function getData() {
    return fetch("data.json")
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    .catch(function (error) {
        console.log("There's a problem with the fetch request... :( " + error.message);
});
} 

export {getData}