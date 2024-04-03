am5.ready(function () {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv_OCDFrequency");


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
        "high": 5,
        "low": 49,
        "medium": 10,
    }, {
        "Genre": "Country",
        "high": 2,
        "low": 13,
        "medium": 6,
    }, {
        "Genre": "Electronic",
        "high": 6,
        "low": 23,
        "medium": 6,
    }, {
        "Genre": "Hip hop",
        "high": 3,
        "low":22,
        "medium": 7,
    }, {
        "Genre": "Jazz",
        "high": 1,
        "low": 11,
        "medium": 7,
    }, {
        "Genre": "Latin",
        "high": 1,
        "low": 1,
    }, {
        "Genre": "Metal",
        "high": 8,
        "low": 57,
        "medium": 11,
    }, {
        "Genre": "Pop",
        "high": 22,
        "low": 88,
        "medium": 29,
    }, {
        "Genre": "R&B",
        "high": 2,
        "low": 19,
        "medium": 8,
    }, {
        "Genre": "Rock",
        "high": 23,
        "low": 104,
        "medium": 22,
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