function City(name,
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
    this.median_income = income;
    this.median_age = age;
    this.avg_male_salary = avg_male_salary;
    this.avg_female_salary = avg_female_salary;
};

City.prototype.display = function() {
    $("#id").prepend(formattedCityName);
    var formattedCityName = HTMLcityName.replace("%data%", city.name);
};

$("#menu").change(city.display());

$(document).ready(function() {
  var city = new City();
  city.name="Boston";

  getRacedata("16000US2507000");
  getCitydata("16000US2507000");
  getMaleWagedata("16000US2507000");
  getFemaleWagedata("16000US2507000");

  function getRacedata(location) {
    var urlRace = "https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=latest&geo=" + location;
    $.getJSON(urlRace, function(response) {
      $.each( response.data, function( key, val ) {
       city.pop_asian = val[4];
       city.pop_black = val[6];
       city.pop_hawaiian = val[8];
       city.pop_latino = val[10]
       city.pop_native = val[12];
       city.pop_other = val[14];
       city.pop_white = val[16];
      });

      console.log(city);
    });
  }

  function getCitydata(location) {
    var urlCity = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Cpop%2Cpop_rank%2Cincome%2Cincome_moe%2Cincome_rank%2Cage%2Cage_rank%2Cowner_occupied_housing_units%2Cus_citizens%2Cnon_eng_speakers_pct&sumlevel=all&limit=2&year=latest&geo=";
    urlCity += location;
    urlCity += "&order=geo&col=pop&rank=1&dataset=False";

    $.getJSON(urlCity, function(response) {
      $.each(response.data, function(key, val) {
        city.population = val[2];
        city.median_income = val[4];
        city.median_age = val[7];
      });

      console.log(city);
    })
  }

  function getMaleWagedata(location) {
    var urlWage = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Csex%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sex=1&sumlevel=all&limit=2&year=latest&geo="+ location + "&order=year&col=avg_wage_ft&rank=1&dataset=False";

    $.getJSON(urlWage, function(response) {
      $.each(response.data, function(key, val) {
        city.avg_male_salary = val[5];
      });

      console.log(city);
    })
  }

  function getFemaleWagedata(location) {
    var urlWage = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Csex%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sex=2&sumlevel=all&limit=2&year=latest&geo=" + location + "&order=year&col=avg_wage_ft&rank=1&dataset=False";

    $.getJSON(urlWage, function(response) {
      $.each(response.data, function(key, val) {
        city.avg_female_salary = val[5];
      });

      console.log(city);
    })
  }
});
