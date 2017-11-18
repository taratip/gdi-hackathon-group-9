var City = {
    this.name = "name";
    this.population = "number";
    this.median = "amount";
    this.popGender = "number";
    this.popRace = "number";
    this.genderChart = "url";
    this.raceChart = "url";
};

var Occupation = {
  this.year = year;
  this.geo = geo;
  this.soc = soc;
  this.race = race;
  this.num_ppl = num_ppl;
  this.num_ppl_moe = num_ppl_moe;
  this.avg_wage = ave_wage;
  this.avg_wage_moe = avg_wage_moe;
}

City.prototype.display = function() {
    $("#id").prepend(formattedCityName);
    var formattedCityName = HTMLcityName.replace("%data%", city.name);
};

$("#menu").change(city.display());

$(document).ready(function() {
  getdata();

  function getdata(){
    $.getJSON("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2014&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=16000US2507000", function(response) {
     var items = [];
      $.each( response.data, function( key, val ) {
       var occupation = {
         year = val[0],
         geo = val[1],
         soc = val[2],
         race = val[3],
         num_ppl = val[4],
         num_ppl_moe = val[5],
         avg_wage = val[6],
         avg_wage_moe = val[7]
       }

       items.push(occupation);
      });

      console.log(items);
    });
  }
});
