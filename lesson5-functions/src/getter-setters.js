const fruit = {
    _name: 'orange',
    _sort: 'gala',
    _originCountry: 'New Zealand',
    param: {
        _diameter: 150,
        _weight: 100,
        _color: 'red'
    },

    set name(value) {
        this._name = value.toLocaleLowerCase();
    },
    get name() {
        return this._name;
    },
    set sort(value) {
        this._sort = value.toLocaleLowerCase();
    },
    get sort() {
        return this._sort;
    },
    set originCountry(value) {
        this._originCountry = value.toLocaleLowerCase();
    },
    get originCountry() {
        return this._originCountry;
    },
    set diameter(value) {
        if (typeof value === 'number') {
            this.param._diameter = value;
        } else {
            console.log('error: diameter must be a number');
        }
    },
    get diameter() {
        return this.param._diameter;
    },
    set weight(value) {
        if (typeof value === 'number') {
            this.param._weight = value;
        } else {
            console.log('error: weight must be a number');
        }
    },
    get weight() {
        return this.param._weight;
    },
    set color(value) {
        this.param._color = value.toLocaleLowerCase();
    },
    get color() {
        return this.param._color;
    },
    summaryFruit() {
        console.log(
            `
            Fruit: ${this.name}, 
            sort: ${this.sort}, 
            origin country: ${this.originCountry}, 
            diameter: ${this.diameter} mm, 
            weight: ${this.weight} g, 
            color: ${this.color}`
        );
    }
};

fruit.summaryFruit();

fruit.name = 'APPLe';
fruit.weight = '300';
fruit.weight = 200;

fruit.summaryFruit();
