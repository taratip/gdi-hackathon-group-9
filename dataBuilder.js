var City = function() {
    this.name = "name";
    this.population = "number";
    this.median = "amount";
    this.popGender = "number";
    this.popRace = "number";
    this.genderChart = "url";
    this.raceChart = "url";
};

var cities = [];

cities.each(function() {
    $("#menu").append(this.name)
});

City.prototype.display = function() {
    //graph
};

$("#menu").change(function() {
    if ($(this).val() == cities[i]) {
        cities[i].display();
    }
});