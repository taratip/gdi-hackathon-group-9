var city = {
    "name": "name",
    "population": "number",
    "medianWage": "amount",
    "popGender": "number",
    "popRace": "race/ethnicity",
    "genderChart": "url",
    "raceChart": "url"
};

city.display = function() {
    $("#id").prepend(formattedName);
    var formattedName = HTMLname.replace("%data%", city.name);
};

city.display();