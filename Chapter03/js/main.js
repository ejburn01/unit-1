// Defining city variables

var cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

//Adding in new cityPop column and its values

function addColumns(cityPop){
    
    //Loop through each row of the table, starting with the header row
    document.querySelectorAll("tr").forEach(function(row, i){

    	if (i == 0){

    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

        // After updating the header row when i = 0, now we update the rows which contain values
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};

			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    	};
    });
};

// Add in hovering and clicking events to the webpage

function addEvents(){

    //Change the text style to a random color when hovering over it
	document.querySelector("table").addEventListener("mouseover", function(){var color = "rgb(";

	for (var i=0; i<3; i++){

		var random = Math.round(Math.random() * 255);

		color += random;

		if (i<2){
			color += ",";
		
		} else {
			color += ")";
	};

	this.style.color = color;
}})

//Pop up a text box when clicking the table
	function clickme(){

		alert('Hey, you clicked me!');
	};

	document.querySelector("table").addEventListener("click", clickme)
}
;

//initialize function called when the script loads
function initialize(){
    cities()
    //Call the addEvents function
	addEvents()
    //Call the addColumns function and pass in the cityPop list
	addColumns(cityPop)
    jsAjax()
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cities = [
        'Madison',
        'Milwaukee',
        'Green Bay',
        'Superior'
    ];
    var population = [
        233209,
        594833,
        104057,
        27244
    ];

    //create the table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement("tr");

    //add the "City" column
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    //add the "Population" column
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

	//add the "City Size" column
    //var citySizeHeader = document.createElement("th");
    //citySizeHeader.innerHTML = "City Size";
    //headerRow.appendChild(citySizeHeader);


    //add the row to the table
    table.appendChild(headerRow);

    //loop to add a new row for each city
    for (var i = 0; i < cities.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cities[i];
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = population[i];
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    //add the table to the div in index.html
    var mydiv = document.getElementById("mydiv");
    mydiv.appendChild(table);
};

//call the initialize function when the window has loaded
window.onload = initialize();

function jsAjax(){
    // use Fetch to retrieve data
    fetch('data/MegaCities.geojson')
    // Get the json code from the response object, making sure to use .then
        .then(function(response){
            return response.json()
        })
        // Again making sure to use .then, display the stringified JSON into the div
        .then(function(response){
            document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(response))
        })
};