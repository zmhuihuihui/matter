//以下代码用于处理表格


// 初始化对象，获取表格对象，获取表格选项对象
function  initTable(){
    let myChart=echarts.init(document.getElementById("table"));
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
            boundaryGap: false,
            data: [],
            nameLocation: 'end',
            name: '时间-秒',
        },
        yAxis: {
            type: 'value',
            boundaryGap: ['0%', '10%'],
            name: '速度-米/秒'
        },
        dataZoom: [{
            type: 'inside',
            start: 50,
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
    window.onresize=function () {
        myChart.resize();
    }
    return {myChart,option};
}

function startDrawTable(drawBodies,time,myChart,option){

    let timeOut1 = setInterval(function () {
        option.xAxis.data.push(((time++)*0.01).toFixed(2));
        // console.log(drawBodies);
        count=drawBodies.length;
        // console.log(count);
        for (let i=1;i<=count;i++){
            if (option.series[i-1]==null){
                option.series[i-1]={
                    name: '',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'average',
                    data: [],
                }
            }
            option.series[i-1].data.push(drawBodies[i-1].speed);
        }
        myChart.setOption(option);
    }, 10);
    return timeOut1;
}


