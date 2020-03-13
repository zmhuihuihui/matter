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

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById('pic'),
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
                }
            }
        });
        ctx.clearRect(0,0,1400,800);

    });


});

