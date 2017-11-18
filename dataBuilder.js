var cities = [];

var City = function(name,
              pop_asian,
              pop_black,
              pop_hawaiian,
              pop_latino,
              pop_native,
              pop_other,
              pop_white,
              population,
              median_income,
              median_age,
              avg_male_salary,
              avg_female_salary) {
    this.name = name;
    this.pop_asian = pop_asian;
    this.pop_black = pop_black;
    this.pop_hawaiian = pop_hawaiian;
    this.pop_latino = pop_latino;
    this.pop_native = pop_native;
    this.pop_other = pop_other;
    this.pop_white = pop_white;
    this.population = population;
    this.median_income = median_income;
    this.median_age = median_age;
    this.avg_male_salary = avg_male_salary;
    this.avg_female_salary = avg_female_salary;
    cities.push(this);
};

var city1 = new City();
city1.name = "Boston";
city1.avg_male_salary = 6500;
city1.avg_female_salary = 7000;

// var formattedMaleData = HTMLgenderData.replace("%data%", city1.avg_male_salary);
// var formattedFemaleData = HTMLgenderData.replace("%data%", city1.avg_female_salary);
// $("#male").append(formattedMaleData);
// $("#female").append(formattedFemaleData);

// var formattedCityName = HTMLcityName.replace("%data%", city1.name);


$(document).ready(function() {
  var city = new City();
  city.name="Boston";

  var data =  getRacedata("16000US2507000", city);

  console.log(JSON.stringify(data));

  function getRacedata(location, data, callback) {
    var urlRace = "https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=latest&geo=" + location;
    $.getJSON(urlRace, function(response) {
      $.each( response.data, function( key, val ) {
       data.pop_asian = val[4];
       data.pop_black = val[6];
       data.pop_hawaiian = val[8];
       data.pop_latino = val[10];
       data.pop_native = val[12];
       data.pop_other = val[14];
       data.pop_white = val[16];
      });
    });
    getCitydata("16000US2507000", data);
    console.log(JSON.stringify(data));
    return data;
  }

  function getCitydata(location, data, callback) {
    var urlCity = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Cpop%2Cpop_rank%2Cincome%2Cincome_moe%2Cincome_rank%2Cage%2Cage_rank%2Cowner_occupied_housing_units%2Cus_citizens%2Cnon_eng_speakers_pct&sumlevel=all&limit=2&year=latest&geo=";
    urlCity += location;
    urlCity += "&order=geo&col=pop&rank=1&dataset=False";

    $.getJSON(urlCity, function(response) {
      $.each(response.data, function(key, val) {
        data.population = val[2];
        data.median_income = val[4];
        data.median_age = val[7];
      });

    });
      getMaleWagedata("16000US2507000", data);

  }

  function getMaleWagedata(location, data, callback) {
    var urlWage = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Csex%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sex=1&sumlevel=all&limit=2&year=latest&geo="+ location + "&order=year&col=avg_wage_ft&rank=1&dataset=False";

    $.getJSON(urlWage, function(response) {
      $.each(response.data, function(key, val) {
        data.avg_male_salary = val[5];
      });

    });
    getFemaleWagedata("16000US2507000", data);
  }

  function getFemaleWagedata(location, data, callback) {
    var urlWage = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Csex%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sex=2&sumlevel=all&limit=2&year=latest&geo=" + location + "&order=year&col=avg_wage_ft&rank=1&dataset=False";

    $.getJSON(urlWage, function(response) {
      $.each(response.data, function(key, val) {
        data.avg_female_salary = val[5];
      });
      callback(data);
    });

  }

});
