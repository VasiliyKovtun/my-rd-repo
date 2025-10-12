function getData() {
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Bad response: ${response.status}`);
            }
            console.log(response.ok, response.status);
            return response.json();
        })
        .then((json) => processData(json))
        .catch((e) => console.log(e));
}

function processData(json) {
    console.log('trying to process JSON');
    console.log(json);
}

getData().then();
