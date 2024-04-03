am5.ready(function () {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv_TempoLevel");


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
        "Genre": "Pop",
        "fast": 1083,
        "medium": 864,
        "slow": 76,
    }, {
        "Genre": "Hip hop",
        "fast": 374,
        "medium": 366,
        "slow": 38,
    }, {
        "Genre": "R&B",
        "fast": 181,
        "medium": 241,
        "slow": 34,
    }, {
        "Genre": "Electronic",
        "fast": 256,
        "medium": 132,
        "slow": 2,
    }, {
        "Genre": "Rock",
        "fast": 139,
        "medium": 89,
        "slow": 6,
    }, {
        "Genre": "Metal",
        "fast": 35,
        "medium": 30,
        "slow": 1,
    }, {
        "Genre": "Latin",
        "fast": 28,
        "medium": 35,
        "slow": 1,
    }, {
        "Genre": "Classical",
        "fast": 9,
        "medium": 21,
        "slow": 1,
    }, {
        "Genre": "Country",
        "fast": 15,
        "medium": 6,
    }, {
        "Genre": "Jazz",
        "fast": 1,
        "medium": 1,
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

    makeSeries("Fast", "fast");
    makeSeries("Medium", "medium");
    makeSeries("Slow", "slow");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

}); // end am5.ready()