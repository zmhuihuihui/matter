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
            wireframes: false,
            enabled: false
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

    //图形拖拽
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
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });

    //画布边界
    World.add(world, [
        Bodies.rectangle(-30, 0, 50, height * 2, { isStatic: true }),
        Bodies.rectangle(0, -30, width * 2, 50, { isStatic: true }),
        Bodies.rectangle(width + 30, 0, 50, height * 2, { isStatic: true }),
        Bodies.rectangle(0, height, width * 2, 50, { isStatic: true })
    ]);

    //动画速度调节
    $('#rangeMain').bind('input propertychange', function () {
        engine.timing.timeScale = $('#rangeMain').val();
    });

    //默认状态
    var status = "drawStatus";

    /*******************   图表    *******************/

    let tablebody = [];
    obj = initTable();
    let myChart = obj.myChart;
    let option = obj.option;
    let currentTimeOut;


    /*******************   开始/暂停/重置   *******************/
    $("#start").click(function () {

        //开始
        if ($(this).prop("checked")) {
            $(this).css('background', "url(../pic/pause.png) no-repeat").attr("checked", false);
            document.getElementById("canvas").style.display = 'none';
            //读取动画速度
            engine.timing.timeScale = $('#rangeMain').val();
            //删除所有固定点
            for (var con of constraintList) {
                World.remove(world, con);
            }
            currentTimeOut = startDrawTable(tablebody, 0, myChart, option);
            runner.enabled = true;
        }
        //暂停
        else {
            $(this).attr("checked", true).css('background', "url(../pic/start.png) no-repeat");
            document.getElementById("canvas").style.display = 'block';
            clearInterval(currentTimeOut);
            runner.enabled = false;

        }
    });
    //重置
    $('#restart').click(function () {
        clearInterval(currentTimeOut);
        tablebody=[];
        //移除旧rectangle
        World.remove(world, rectangleShape);
        //添加新rectangle
        let pointVector = Vertices.fromPath(rectangle.path);
        rectangleShape = Bodies.fromVertices(rectangle.centreX, rectangle.centreY, pointVector, {
            friction: 0
        });
        let constraint = Constraint.create({
            pointA: { x: rectangle.centreX, y: rectangle.centreY },
            bodyB: rectangleShape,
            length: 0
        });
        constraintList.add(constraint);
        World.add(world, [rectangleShape, constraint]);
        tablebody.push(rectangleShape);
        rectangle = data;
    });



    /**********************   识别    **********************/
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d');
    ctx.fillStyle = 'rgba(255,0,0,0)';
    ctx.fillRect(0, 0, width, height);
    var paint = false;
    var xPoint = [];
    var yPoint = [];
    var constraintList = new Set();
    var rectangle = null;        //rectangle data
    var rectangleShape = null;   //rectangle body
    var triangle = null;
    var triangleShape = null;

    function collectStrokes(e) {
        xPoint.push(e.pageX - this.offsetLeft);
        yPoint.push(e.pageY - this.offsetTop);
    }

    function recogniseGeometry() {
        let DollarOneRecognizer = new DollarRecognizer(status);
        let points = [];
        //let s =[];
        for (let i = 0; i < xPoint.length; i++) {
            points[i] = new Point(parseInt(xPoint[i]), parseInt(yPoint[i]));
            //s += "new Point("+ parseInt(xPoint[i]) +","+parseInt(yPoint[i])+"),";
        }

        //识别
        let result = DollarOneRecognizer.Recognize(points, true);
        
        if (result.Name.indexOf("Status") != -1) {
            status = result.Name;
        }else if(result.Name.indexOf("angle") != -1){
            let data = Restructure(points, result.Name);
            let pointVector = Vertices.fromPath(data.path);
            //矩形
            if (result.Name == "rectangle" && data.path != "") {
                rectangleShape = Bodies.fromVertices(data.centreX, data.centreY, pointVector, {
                    friction: 0
                });
                let constraint = Constraint.create({
                    pointA: { x: data.centreX, y: data.centreY },
                    bodyB: rectangleShape,
                    length: 0
                });
                constraintList.add(constraint);
                World.add(world, [rectangleShape, constraint]);
                tablebody.push(rectangleShape);
                rectangle = data;
            }
            //三角形
            else if(result.Name == "triangle") {
                triangleShape = Bodies.fromVertices(data.centreX, data.centreY, pointVector, {
                    friction: 0,
                    isStatic: true
                });
                World.add(world, triangleShape);
                triangle = data;
            } 
        }else{
            // TODO
        }

    }

    /*******************   鼠标监听    *******************/
    $('#canvas').mousedown(function (e) {
        paint = true;
        if (handler != null) clearTimeout(handler);
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
                    recogniseGeometry();
                    xPoint = [];
                    yPoint = [];
                    ctx.clearRect(0, 0, width, height);
                }
            }, 500);   //TODO 时间
        } else {
            if (handler != null) clearTimeout(handler);
        }

    });

});

