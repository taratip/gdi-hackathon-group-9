var City = {
    this.name = "name";
    this.population = "number";
    this.median = "amount";
    this.popGender = "number";
    this.popRace = "number";
    this.genderChart = "url";
    this.raceChart = "url";
};

City.prototype.display = function() {
    $("#id").prepend(formattedCityName);
    var formattedCityName = HTMLcityName.replace("%data%", city.name);
};

$("#menu").change(city.display());