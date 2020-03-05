window.onload=function () {

    // 初始化对象
    let myChart=echarts.init(document.getElementById("main1"));
    // 图表的配置项和数据
    let option={
        //设置图表标题
        title:{
            test:"echarts 入门实例",
        },
        // 图例，
        legend:{
            data:['销量','成本'],
        },
        //x轴数据
        xAxis:{
            data:["衬衫","羊毛衫","裤子","高跟鞋","袜子"],
        },
        yAxis:{
        },
        //根据相应系列进行配置
        series:[
            {
                name:'销量',
                type:'bar',
                data:[20,36,10,10,20],
            },
            {
                name:'成本',
                type:'bar',
                data:[2,3,1,1,2],
            },
        ]
    };


    //定时器
    var res=[
        [20,36,10,10,20],
        [30,26,10,11,20],
        [30,31,10,30,20],
        [20,76,10,10,30]
        ];

    setInterval(getList,2000);
    function getList(){
        var i=parseInt(Math.random()*res.length);
        option.series[0].data=res[i];
        // 渲染图表
        myChart.setOption(option);
    }

    window.onresize=function () {
        myChart.resize();
    }

}