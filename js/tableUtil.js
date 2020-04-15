function initTable() {
    console.log("initTable is invoked");
    let myChart = echarts.init(document.getElementById("table"));
    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '速度-时间图像',
            padding: [5, 0, 400, 0],
        },
        grid: {
            top: 85,
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: [],
            nameLocation: 'end',
            name: '时间-秒',
            max: 800,
            splitNumber: 8
        },
        yAxis: {
            type: 'value',
            boundaryGap: ['0%', '10%'],
            name: '速度-米/秒',
            max: 6
        },
        legend: {
            data: [],
            left: 30,
            top: 30,

        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name: '',
                type: 'line',
                symbol: 'none',
                sampling: 'average',
                data: [],
            }
        ]
    };
    window.onresize = function () {
        myChart.resize();
    }
    return { myChart, option };
}

function startDrawTable(drawBodies, time, myChart, option) {
    console.log("startDrawTalbe is invoked");
    option.xAxis.data = [];
    option.series = [];
    option.legend.data = [];
    let timeOut1 = setInterval(function () {
        option.xAxis.data.push(((time++) * 0.01).toFixed(2));
        // console.log(drawBodies);
        count = drawBodies.length;
        // console.log(count);
        for (let i = 1; i <= count; i++) {
            if (option.series[i - 1] == null) {
                option.series[i - 1] = {
                    name: '物块' + i,
                    type: 'line',
                    symbol: 'none',
                    sampling: 'average',
                    data: [],
                    cursor: 'pointer',
                    color: drawBodies[i - 1].render.fillStyle,
                }
                option.legend.data.push('物块' + i);
            }
            option.series[i - 1].data.push(drawBodies[i - 1].speed);
            //console.log("body color:"+drawBodies[i-1].render.fillStyle);
        }
        myChart.setOption(option);
    }, 10);
    return timeOut1;
}


