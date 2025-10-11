async function getData (resource) {
    const response = await fetch(resource);
    console.log(response.ok, response.status);
    if (!response.ok) {
        throw new Error(`Bad response: ${response.status}`);
    }
    const json = await response.json();
    return json;
}

(async () => {
    let data;

    try {
        console.log('Try get data from https://not-exist.com/todos...');
        data = await getData('https://not-exist.com/todos');
    } catch (e) {
        if (e.message) {
            console.log('First request failed: ', e.message);
            console.log('Try get data from https://jsonplaceholder.typicode.com/todos/1...');
            try {
                data = await getData('https://jsonplaceholder.typicode.com/todos/1');
            } catch (e2) {
                if (e2.message.includes('Bad response')) {
                    console.log('There is still a problem with the response');
                } else {
                    throw new Error('Generated custom ERROR');
                }
            }
        }
    }

    console.log('The data is:', data);
})();
