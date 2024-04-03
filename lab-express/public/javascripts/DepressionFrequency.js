am5.ready(function () {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv_DepressionFrequency");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    var data = [{
        "Genre": "Classical",
        "high": 22,
        "low": 22,
        "medium": 20,
    }, {
        "Genre": "Country",
        "high": 5,
        "low": 9,
        "medium": 7,
    }, {
        "Genre": "Electronic",
        "high": 14,
        "low": 11,
        "medium": 10,
    }, {
        "Genre": "Hip hop",
        "high": 19,
        "low": 6,
        "medium": 7,
    }, {
        "Genre": "Jazz",
        "high": 8,
        "low": 8,
        "medium": 3,
    }, {
        "Genre": "Latin",
        "low": 1,
        "medium": 1,
    }, {
        "Genre": "Metal",
        "high": 28,
        "low": 23,
        "medium": 25,
    }, {
        "Genre": "Pop",
        "high": 35,
        "low": 59,
        "medium": 45,
    }, {
        "Genre": "R&B",
        "high": 7,
        "low": 13,
        "medium": 9,
    }, {
        "Genre": "Rock",
        "high": 63,
        "low": 47,
        "medium": 39,
    }]


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true
    });
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "Genre",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    xRenderer.grid.template.setAll({
        location: 1
    })

    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            valueYShow: "valueYTotalPercent",
            categoryXField: "Genre"
        }));

        series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
            tooltipY: am5.percent(10)
        });
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                    text: "{valueYTotalPercent.formatNumber('#.#')}%",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: am5.p50,
                    centerX: am5.p50,
                    populateText: true
                })
            });
        });

        legend.data.push(series);
    }

    makeSeries("High", "high");
    makeSeries("Low", "low");
    makeSeries("Medium", "medium");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

}); // end am5.ready()