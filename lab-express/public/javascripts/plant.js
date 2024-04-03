am5.ready(function () {

    var root = am5.Root.new("chartdiv_plant");
    var chart = root.container.children.push(
        am5percent.SlicedChart.new(root, {})
    );

    var series = chart.series.push(
        am5percent.PictorialStackedSeries.new(root, {
            svgPath: plantPath,
            categoryField: "name",
            valueField: "value",
        })
    );

    series.slices.template.setAll({
        tooltipText: "{name}: {value}%"
    });

    series.data.setAll([{
        name: "Dry",
        value: 33.2
    }, {
        name: "Water",
        value: 66.8
    }]);
});