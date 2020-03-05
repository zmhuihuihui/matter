$(function () {

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Vertices = Matter.Vertices,
        Constraint = Matter.Constraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events;
    //kert2020 用于保存创建的所有body,在表格中展示body的speed
    let tablebody=[];
    //kert2020


    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1400,
            height: 800,
            showVelocity: true,
            showPositions: true,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    // add bodies
    World.add(world, [
        // walls
        Bodies.rectangle(700, 0, 1400, 50, {isStatic: true}),
        Bodies.rectangle(700, 800, 1400, 50, {isStatic: true}),
        Bodies.rectangle(1400, 400, 50, 800, {isStatic: true}),
        Bodies.rectangle(0, 400, 50, 800, {isStatic: true})
    ]);


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
    World.add(world, mouseConstraint);
    render.mouse = mouse;



    Events.on(mouseConstraint, "startdrag", function (e) {
        for(var c of constraintList){
            if (e.body == c.bodyB) {
                World.remove(world, c);
                constraintList.delete(c);
            }
        }
    });

    /*
    var paint = false;
    var xPoint = [];
    var yPoint = [];
    var ctx = render.context;

    Events.on(render, 'beforeRender', function() {

        Events.on(mouseConstraint, "mousedown", function (e) {
            paint = !paint;
            xPoint = [];
            yPoint = [];
            ctx.beginPath();
            ctx.moveTo(mouse.position.x, mouse.position.y);
        });

        Events.on(mouseConstraint, "mousemove", function (e) {
            if (paint) {

                ctx.lineTo(mouse.position.x, mouse.position.y);
                xPoint.push(mouse.position.x);
                yPoint.push(mouse.position.y);
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

        });
        Events.on(mouseConstraint, "mouseup", function (e) {
            paint = !paint;
        });
    });

     */


    //可视窗口大小
    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: 1400, y: 800}
    });

    $('.jtoggler').jtoggler();
    $(document).on('jt:toggled', function(event, target) {
        if($(target).prop('checked') == true){
            document.getElementById("canvas").style.display = 'block';
        }else{
            document.getElementById("canvas").style.display = 'none';
        }

    });

    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d');
    ctx.fillStyle = 'rgba(255,0,0,0)';
    ctx.fillRect(0, 0, 1400, 800);
    var paint = false;
    var xPoint = [];
    var yPoint = [];
    var constraintList = new Set();

    $('#canvas').mousedown(function (e) {
        paint = !paint;
        xPoint = [];
        yPoint = [];
        ctx.beginPath();
        ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    });

    $('#canvas').mousemove(function (e) {
        if (paint) {
            ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            xPoint.push(e.pageX - this.offsetLeft);
            yPoint.push(e.pageY - this.offsetTop);
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
    });

    $('#canvas').mouseup(function (e) {
        paint = !paint;
        $.ajax({
            url: "http://127.0.0.1:8080/friction/handle",
            type: "POST",
            data: {
                xPoint: xPoint,
                yPoint: yPoint
            },
            async: false,
            cache: false,
            traditional: true,
            success: function (data) {
                if (data.success) {
                    var path = String(data.path);
                    var pointVector = Vertices.fromPath(path);
                    var shape = Bodies.fromVertices(data.startX,data.startY,pointVector,{
                        friction: 0.006
                    });
                    var constraint = Constraint.create({
                        pointA: { x: data.startX, y: data.startY },
                        bodyB: shape,
                        length: 0
                    });
                    constraintList.add(constraint);
                    World.add(world,[shape,constraint]);
                    tablebody.push(shape);
                }
            }
        });
        ctx.clearRect(0,0,1400,800);

    });


    //以下代码用于处理表格
    // 初始化对象
    let myChart=echarts.init(document.getElementById("table"));
    let tableDate = [];
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
            data: tableDate,
            nameLocation: 'end',
            name: '时间-秒',

        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
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
    function startDrawTable(drawBodies,time){
        let timeOut1 = setInterval(function () {
            tableDate.push(((time++)*0.1).toFixed(2));
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
            //tableData.push(drawBodies[0].speed);
            myChart.setOption(option);
        }, 100);
        return timeOut1;
    }
    window.onresize=function () {
        myChart.resize();
    }
    //该函数用于控制图像绘制的开关
    $(document).ready(function(){
        $("#tableStart").click(function(){
            if($("#tableStart").text()=="开始"){
                $("#tableStart").text("暂停");
                currentTimeOut=startDrawTable(tablebody,0);
            }else{
                $("#tableStart").text("开始");
                clearInterval(currentTimeOut);
            }
        });
    });
    //kert2020
});

