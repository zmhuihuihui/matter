$(function () {

    const width = $("canvas").width();
    const height = $("canvas").height();

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
            height: height - 2,
            background: '#ffffff',
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
        for (var con of constraintList) {
            if (e.body == con.bodyB) {
                World.remove(world, con);
                constraintList.delete(con);
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
        Bodies.rectangle(0, 0, 50, height * 2, {isStatic: true}),
        Bodies.rectangle(0, 0, width * 2, 50, {isStatic: true}),
        Bodies.rectangle(width, 0, 50, height * 2, {isStatic: true}),
        Bodies.rectangle(0, height, width * 2, 50, {isStatic: true})
    ]);

    //动画速度调节
    $('#rangeMain').bind('input propertychange', function () {
        engine.timing.timeScale = $('#rangeMain').val();
    });

    //开始/暂停按钮
    $("#start").click(function () {

        //开始
        if ($(this).prop("checked")) {
            $(this).css('background', "url(../static/pic/pause.png) no-repeat").attr("checked", false);
            document.getElementById("canvas").style.display = 'none';
            for (var con of constraintList) {
                World.remove(world, con);
            }
            //TODO 开启引擎，记录滑块初始位置
            //开启图表绘制
            console.log("tablebody: ",tablebody);
            currentTimeOut = startDrawTable(tablebody, 0, myChart, option);
        }
        //暂停
        else {
            $(this).attr("checked", true).css('background', "url(../static/pic/start.png) no-repeat");
            document.getElementById("canvas").style.display = 'block';
            //TODO 暂停引擎以图表
            //结束图表绘制
            clearInterval(currentTimeOut);

        }
    });

    //重制按钮
    $('#restart').click(function () {
        //TODO 回到初始状态
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

    function collectStrokes(e) {
        xPoint.push(e.pageX - this.offsetLeft);
        yPoint.push(e.pageY - this.offsetTop);
    }

    function recogniseGeometry() {
        if (paint == false) {
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
                        /**
                         * TODO 后台还会返回识别type，完成不同type的逻辑
                         * SHAPE : 识别图形
                         * CHAR : 识别字符
                         * DEL : 删除手势
                         * TABLE : 图表手势
                         * DRAW : 切换画图状态手势
                         * CHARACTER : 切换字符状态手势
                         * ...
                         */



                            //TODO 识别为三角形默认固定，计算坐标贴合地面
                            //TODO 识别为长方形，计算坐标贴合斜面
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
                        tablebody.push(shape);

                    } else {
                        console.log("识别失败");
                    }
                    console.log("成没成功她都得清空");
                    xPoint = [];
                    yPoint = [];
                    ctx.clearRect(0, 0, width, height);
                },
                error: function () {
                    xPoint = [];
                    yPoint = [];
                }
            });


        }
    }

    $('#canvas').mousedown(function (e) {
        paint = true;
        if (handler != null) clearTimeout(handler);

        // xPoint = [];
        // yPoint = [];
        ctx.beginPath();
        ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    });

    $('#canvas').mousemove(function (e) {
        if (paint == true) {
            ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

            xPoint.push(e.pageX - this.offsetLeft);
            yPoint.push(e.pageY - this.offsetTop);

            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    });

    $('#canvas').mouseup(function (e) {
        paint = false;

        if (paint == false) {
            handler = setTimeout(function () {
                if (paint == false) {
                    clearTimeout(handler);

                    console.log("该执行识别了");
                    recogniseGeometry();

                }
            }, 1500);   //TODO 时间
        } else {
            if (handler != null) clearTimeout(handler);
        }

    });


    //TODO 获取木块坐标，计算图像
    //TODO 考虑下图像显示的位置大小，以及如何显示在画布之上

    //kert2020 用于保存创建的所有body,在表格中展示body的speed
    let tablebody = [];

    //kert2020
    //1初始化
    //1.1初始化表格，获取表格对象，获取表格选项对象
    obj = initTable();
    let myChart = obj.myChart;
    let option = obj.option;
    //1.2初始化计时器对象
    let currentTimeOut;

    //2.控制图像绘制的开关
    $(document).ready(function () {
        $("#start").click(function () {
            // console.log("checked is clicked?");
            // console.log($("#start").prop("checked"));
            // //开始
            // if ($("#start").prop("checked")) {
            //     console.log("tablebody: ",tablebody);
            //     currentTimeOut = startDrawTable(tablebody, 0, myChart, option);
            // }
            // //暂停
            // else {
            //     clearInterval(currentTimeOut);
            // }



            // if ($("#start").text() == "开始") {
            //     $("#start").text("暂停");
            //     console.log("tablebody: ",tablebody);
            //     currentTimeOut = startDrawTable(tablebody, 0, myChart, option);
            // } else {
            //     $("#start").text("开始");
            //     clearInterval(currentTimeOut);
            // }
        });
    });

});

