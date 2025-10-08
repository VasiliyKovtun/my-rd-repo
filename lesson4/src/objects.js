
const fruit = {};
fruit.name = 'orange';
fruit.sort = 'gala';
fruit['origin country'] = 'New Zealand';
fruit.key4 = {
    diameter: 150,
    weight: '100g',
    color: ['red', 'green', 'yellow']
};

fruit.name == 'orange' ? fruit.name = 'apple' : fruit.name = 'peach';

fruit.showFruit = function () {
    console.log(`
        Fruit: ${fruit.name} 
        Sort: ${fruit.sort}
        Country: ${fruit['origin country']}
        Diameter: ${fruit.key4.diameter}
        Weight: ${fruit.key4.weight}
        Colors: ${fruit.key4.color.join(', ')}`);
};

fruit.showFruit();
