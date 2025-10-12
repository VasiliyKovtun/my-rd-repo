async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
        throw new Error(`Bad response: ${response.status}`);
    }
    console.log(response.ok, response.status);
    const json = await response.json();
    console.log(json);
}

await getData();
