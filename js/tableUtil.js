function  initTable(){
    console.log("initTable is invoked");
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
            padding:[5,0,400,0],
        },
        grid:{
            top:85,
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
        legend:{
            data:[],
            left:30,
            top: 30,

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

function startDrawTable(drawBodies,startTime,myChart,option,historyBody,historyCount){
    //处理历史数据，
    //let historyCount=historyBody.length;
    //将新物块的属性保存在历史记录中
    for (let i=historyCount;i<drawBodies.length;i++){
        historyBody[i]={
            color:'',
            speed:[]
        };
        historyBody[i].color=drawBodies[i].render.fillStyle;
    }

    console.log("startDrawTalbe is invoked");

    //如果起始时间为0说明是新的开始，那么把表格里之前存储的数据全部清空掉
    if (startTime.time==0){
        option.xAxis.data=[];
        option.series=[];
        option.legend.data=[];
    }

    let timeOut1 = setInterval(function () {
        option.xAxis.data.push(((startTime.time++)*0.01).toFixed(2));
        // console.log(drawBodies);
        count=drawBodies.length;
        // console.log(count);
        for (let i=1;i<=count;i++){
            if (option.series[i-1]==null){
                option.series[i-1]={
                    name: '物块'+i,
                    type: 'line',
                    symbol: 'none',
                    sampling: 'average',
                    data: [],
                    cursor:'pointer',
                    //color:drawBodies[i-1].render.fillStyle,
                    color: historyBody[i-1].color
                }
                option.legend.data.push('物块'+i);
            }
            //如果是之前的物块，速度从historyBody中取出来
            if (i<=historyCount){
                if (historyBody[i-1].speed[startTime.time-1]!=null){
                    option.series[i-1].data.push(historyBody[i-1].speed[startTime.time-1]);
                }else{
                    //option.series[i-1].data.push(0);
                }
            }else {
                //新物块从引擎获取速度
                option.series[i-1].data.push(drawBodies[i-1].speed);
                historyBody[i-1].speed=option.series[i-1].data;//将新物块的速度保存在历史记录中
            }
            //console.log("body color:"+drawBodies[i-1].render.fillStyle);
        }
        myChart.setOption(option);
    }, 10);
    return timeOut1;
}


