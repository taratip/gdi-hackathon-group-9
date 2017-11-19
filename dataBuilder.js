// var cities = [];
//
// var City = function(name,
//               pop_asian,
//               pop_black,
//               pop_hawaiian,
//               pop_latino,
//               pop_native,
//               pop_other,
//               pop_white,
//               population,
//               median_income,
//               median_age,
//               avg_male_salary,
//               avg_female_salary) {
//     this.name = name;
//     this.pop_asian = pop_asian;
//     this.pop_black = pop_black;
//     this.pop_hawaiian = pop_hawaiian;
//     this.pop_latino = pop_latino;
//     this.pop_native = pop_native;
//     this.pop_other = pop_other;
//     this.pop_white = pop_white;
//     this.population = population;
//     this.median_income = median_income;
//     this.median_age = median_age;
//     this.avg_male_salary = avg_male_salary;
//     this.avg_female_salary = avg_female_salary;
//     cities.push(this);
// };
//
// var city1 = new City();
// city1.name = "Boston";
// city1.avg_male_salary = 6500;
// city1.avg_female_salary = 7000;
//
// var formattedMaleData = HTMLgenderData.replace("%data%", city1.avg_male_salary);
// var formattedFemaleData = HTMLgenderData.replace("%data%", city1.avg_female_salary);
// $("#male").append(formattedMaleData);
// $("#female").append(formattedFemaleData);
//
// var formattedCityName = HTMLcityName.replace("%data%", city1.name);
// //$("#menu").append(formattedCityName);
//
//
// City.prototype.display = function() {
//     //show graph
// };


$(document).ready(function() {
  var city = {};
  var location = "16000US2507000";
  var name = "Boston";

  var raceDataUrl = "https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=latest&geo=" + location;
  var popDataUrl = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Cpop%2Cpop_rank%2Cincome%2Cincome_moe%2Cincome_rank%2Cage%2Cage_rank%2Cowner_occupied_housing_units%2Cus_citizens%2Cnon_eng_speakers_pct&sumlevel=all&limit=2&year=latest&geo=";
    popDataUrl += location;
    popDataUrl += "&order=geo&col=pop&rank=1&dataset=False";
  var maleWageUrl = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Csex%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sex=1&sumlevel=all&limit=2&year=latest&geo="+ location + "&order=year&col=avg_wage_ft&rank=1&dataset=False";
  var femaleWageUrl = "https://api.datausa.io/api/?sort=desc&show=geo&required=year%2Csex%2Cavg_wage%2Cavg_wage_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sex=2&sumlevel=all&limit=2&year=latest&geo=" + location + "&order=year&col=avg_wage_ft&rank=1&dataset=False";

  console.log("Starting");
  var promise1 = $.getJSON(raceDataUrl, function(response) {
    return response;
  });
  var promise2 = $.getJSON(popDataUrl, function(response) {
    return response;
  });
  var promise3 = $.getJSON(maleWageUrl, function(response) {
    return response;
  });
  var promise4 = $.getJSON(femaleWageUrl, function(response) {
    return response;
  });

  $.when(promise1, promise2, promise3, promise4).then(
    function(result1, result2, result3, result4) {
      // race data
       city.name = name;
       city.pop_asian = result1[0]['data'][0][4];
       city.pop_black = result1[0]['data'][0][6];
       city.pop_hawaiian = result1[0]['data'][0][8];
       city.pop_latino = result1[0]['data'][0][10];
       city.pop_native = result1[0]['data'][0][12];
       city.pop_other = result1[0]['data'][0][14];
       city.pop_white = result1[0]['data'][0][16];
      // median
       city.population = result2[0]['data'][0][2];
       city.median_income = result2[0]['data'][0][4];
       city.median_age = result2[0]['data'][0][7];
       // male wage
       city.avg_male_salary = result3[0]['data'][0][5];
       // female wage
       city.avg_female_salary = result4[0]['data'][0][5];

       console.log(city.avg_male_salary);
       console.log(city.avg_female_salary);

       var formattedMaleData = HTMLgenderData.replace("%data%", city.avg_male_salary);
       var formattedFemaleData = HTMLgenderData.replace("%data%", city.avg_female_salary);
       console.log(formattedMaleData);
       console.log(formattedFemaleData);

       $("#male").append($(formattedMaleData));
       $("#female").append($(formattedFemaleData));

       var formattedCityName = HTMLcityName.replace("%data%", city.name);
    },
    function(error) {
      console.log("Error getting data");
    }
  );

});
