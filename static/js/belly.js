// Store URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// D3 to read in the JSON file from URL and console to log data
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize function and use D3 to make dropdown menu  
function init() {
    let dropdownMenu = d3.select("#selDataset");

    // Obtain sample names and add to drop-down menu
    d3.json(url).then((data) => {
        
        // Set variables 
        let names = data.names;

        // Dropdown menu samples and console to log changes
        names.forEach((id) => {

            console.log(id);

            dropdownMenu.append("option").text(id).property("value",id);
        });

        // Pull first sample and console to log changes
        let sample_one = names[0];

        console.log(sample_one);

        // Plots
        Metadata(sample_one);
        Bar(sample_one);
        Bubble(sample_one);
        });
};

// Metadata and use D3 to retrieve all data
function Metadata(sample) {
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter value of sample id and console to log changes
        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        // Pull first index from the array
        let firstData = value[0];

        // Select metadata content for every input
        d3.select("#sample-metadata").html("");

        // Object.entries to update info to the panel, console to log changes, and D3 to select data
        Object.entries(firstData).forEach(([key,value]) => {

            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

// Bar chart and use D3 to retrieve all of the data
function Bar(sample) {
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter by value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let firstData = value[0];

        // Retrieve otu_ids, otu_lables, sample_values and console to log changes
        let otu_ids = firstData.otu_ids;
        let otu_labels = firstData.otu_labels;
        let sample_values = firstData.sample_values;

        console.log(otu_ids,otu_labels,sample_values);

        // Top ten OTUs reverse order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Bar chart trace and layout
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: 'bar',
            orientation: 'h',
        };

        let layout = {
            title: "Top 10 OTUs",
            xaxis: {title: "Bacteria count"},
            yaxis: {title: "OTU ID"}
        };

        // Plotly to view bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Bubble chart and use D3 to retrieve all of the data
function Bubble(sample) {
    d3.json(url).then((data) => {
        
        // Retrieve data samples
        let sampleInfo = data.samples;

        // Filter samples from ID
        let value = sampleInfo.filter(result => result.id == sample);

        // Obtain initial index from array
        let firstData = value[0];

        // Retrieve otu_ids, otu_lables, sample_values and console to log changes
        let otu_ids = firstData.otu_ids;
        let otu_labels = firstData.otu_labels;
        let sample_values = firstData.sample_values;

        console.log(otu_ids,otu_labels,sample_values);
        
        // Bubble chart trace and layout
        let bubbletrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Layout arrangement
        let layout = {
            title: "Bacteria Per Subject ID",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Bacteria count"}
        };

        // Plotly to view bubble chart
        Plotly.newPlot("bubble", [bubbletrace], layout)
    });
};

// Updates dashboard for each new sample and console to log changes
function optionChanged(value) { 
    console.log(value); 

    // Update functions 
    Metadata(value);
    Bar(value);
    Bubble(value);
};
// Initialize 
init();