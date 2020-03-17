$(function () {

    const width =$("canvas").width();
    const height =$("canvas").height();

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


    var engine = Engine.create(),
        world = engine.world;

    var render = Render.create({
        element: document.getElementById('pic'),
        engine: engine,
        options: {
            width: width,
            height: height-2,
            background:'#ffffff',
            showVelocity: true,
            showPositions: true,
            wireframes: false
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);


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

    //鼠标拖拽
    Events.on(mouseConstraint, "startdrag", function (e) {
        for(var c of constraintList){
            if (e.body == c.bodyB) {
                World.remove(world, c);
                constraintList.delete(c);
            }
        }
    });

    //可视窗口大小
    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: width, y: height}
    });

    //画布边界
    World.add(world, [
        //Bodies.rectangle(700, 0, 1400, 50, {isStatic: true}),
        //Bodies.rectangle(0, 0, width, 50, {isStatic: true}),
        //Bodies.rectangle(width, 0, 50, height, {isStatic: true}),
        Bodies.rectangle(0, height, width*2, 50, {isStatic: true})
    ]);

    //动画速度调节
    $('#rangeMain').bind('input propertychange',function(){
        engine.timing.timeScale = $('#rangeMain').val();
    });

    $("#state").click(function () {
        if ($(this).prop("checked")) {
            document.getElementById("canvas").style.display = 'block';
        } else {
            document.getElementById("canvas").style.display = 'none';
        }
    });

    //开始暂停按钮
    $("#start").click(() => {
        document.getElementById("canvas").style.display = 'block';
    });
    $("#pause").click(() => {
        document.getElementById("canvas").style.display = 'none';
    });


    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d');
    ctx.fillStyle = 'rgba(255,0,0,0)';
    ctx.fillRect(0, 0, width, height);
    var paint = false;
    var xPoint = [];
    var yPoint = [];
    var constraintList = new Set();

    /**
     * 说明
     * 化学组那边的逻辑是 前端页面 鼠标按下-移动-抬起 为一个笔画，每次往后端传笔画 ，后端有个容器 存笔画
     * 等到前端 抬起笔 停留时间 超过阈值 ，触发识别
     *
     * 在前端存笔画  (目前抽象程度不高 考虑为以后 手写识别留的接口)
     *
     */



    function collectStrokes(e){
        xPoint.push(e.pageX - this.offsetLeft);
        yPoint.push(e.pageY - this.offsetTop);
    }

    function recogniseGeometry(){
        if ( paint == false ) {
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
                        console.log("识别成功");

                        var path = String(data.path);
                        var pointVector = Vertices.fromPath(path);
                        var shape = Bodies.fromVertices(data.startX, data.startY, pointVector, {
                            friction: 0.006
                        });
                        var constraint = Constraint.create({
                            pointA: {x: data.startX, y: data.startY},
                            bodyB: shape,
                            length: 0
                        });
                        constraintList.add(constraint);
                        World.add(world, [shape, constraint]);

                    }else {
                        console.log("识别失败");
                    }
                    console.log("成没成功她都得清空");
                    xPoint = [];
                    yPoint = [];
                    ctx.clearRect(0, 0, width, height);
                },
                error:function(){
                    xPoint = [];
                    yPoint = [];
                }
            });


        }
    }

    $('#canvas').mousedown(function (e) {
        paint = true;
        if( handler != null ) clearTimeout(handler);

        // xPoint = [];
        // yPoint = [];
        ctx.beginPath();
        ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    });

    $('#canvas').mousemove(function (e) {
        if (paint == true ) {
            ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

            xPoint.push(e.pageX - this.offsetLeft);
            yPoint.push(e.pageY - this.offsetTop);

            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    });

    $('#canvas').mouseup(function (e) {
        paint = false ;

        if( paint == false ){
            handler = setTimeout(function () {
                if( paint == false ){
                    clearTimeout(handler);

                    console.log("该执行识别了");
                    recogniseGeometry();

                }
            },2500);
        }else {
            if( handler != null ) clearTimeout(handler);
        }

    });

    //kert2020 用于保存创建的所有body,在表格中展示body的speed
    let tablebody=[];

    //kert2020
    //1初始化
        //1.1初始化表格，获取表格对象，获取表格选项对象
    obj=initTable();
    let myChart=obj.myChart;
    let option=obj.option;
        //1.2初始化计时器对象
    let currentTimeOut;

    //2.控制图像绘制的开关
    $(document).ready(function(){
        $("#tableStart").click(function(){
            if($("#tableStart").text()=="开始"){
                $("#tableStart").text("暂停");
                currentTimeOut=startDrawTable(tablebody,0,myChart,option);
            }else{
                $("#tableStart").text("开始");
                clearInterval(currentTimeOut);
            }
        });
    });

    //kert2020
});

