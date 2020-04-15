var angle = 0;

function ShapeData(centreX, centreY, path) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.path = path;
}

function Restructure(points, name) {
    let minPreX = points[0].X;
    let minPreY = points[0].Y;
    let maxPreX = points[0].X;
    let maxPreY = points[0].Y;
    for (let i = 0; i < points.length; i++) {
        maxPreX = Math.max(maxPreX, points[i].X);
        maxPreY = Math.max(maxPreY, points[i].Y);
        minPreX = Math.min(minPreX, points[i].X);
        minPreY = Math.min(minPreY, points[i].Y);
    }
    let startPoint = new Point(minPreX, minPreY);
    let firstPoint = new Point(points[0].X, points[0].Y);
    let width = maxPreX - startPoint.X;
    let height = maxPreY - startPoint.Y;
    if (name == "rectangle") {
        let incline = false;
        //倾斜阈值
        if (Math.abs(startPoint.X - firstPoint.X) > 15) incline = true;
        return restructureRectangle(startPoint, firstPoint, width, height, incline);
    }
    else if (name == "triangle") return restructureTriangle(firstPoint, width, height);
}

function restructureTriangle(firstPoint, width, height) {
    //贴合阈值
    if (($("canvas").height() - firstPoint.Y - height) < 50) height = $("canvas").height() - firstPoint.Y;
    let path = firstPoint.X + " " + firstPoint.Y + " ";
    path += firstPoint.X + " " + (firstPoint.Y + height) + " ";
    path += (firstPoint.X + width) + " " + (firstPoint.Y + height);
    let r = parseInt((height + width - Math.sqrt(width * width + height * height)) / 2);
    angle = Math.atan(height / width);
    return new ShapeData(firstPoint.X + r * 1.55, firstPoint.Y + height - r, path);
}

function restructureRectangle(startPoint, firstPoint, width, height, incline) {
    if (incline) {
        let path = "";
        if (angle != 0) {
            let vertices = [];
            vertices[0] = new Point(firstPoint.X, startPoint.Y);
            let leftlen1 = parseInt((firstPoint.X - startPoint.X) / Math.tan(angle));
            vertices[1] = new Point(startPoint.X, (startPoint.Y + leftlen1));
            let bottomlen1 = parseInt((height - leftlen1) / Math.tan(angle));
            vertices[2] = new Point((startPoint.X + bottomlen1), (startPoint.Y + height));
            let rightlen1 = parseInt((width - firstPoint.X + startPoint.X) * Math.tan(angle));
            vertices[3] = new Point((bottomlen1 + firstPoint.X), (startPoint.Y + height - leftlen1));
            console.log(vertices[0]);
            path = vertices[0].X + " " + vertices[0].Y + " ";
            path += vertices[1].X + " " + vertices[1].Y + " ";
            path += vertices[2].X + " " + vertices[2].Y + " ";
            path += vertices[3].X + " " + vertices[3].Y;
            return new ShapeData((vertices[0].X + vertices[2].X) / 2, (vertices[1].Y + vertices[3].Y) / 2, path);
        }
        return new ShapeData(0, 0, path);
    } else {
        let path = firstPoint.X + " " + firstPoint.Y + " ";
        path += firstPoint.X + " " + (firstPoint.Y + height) + " ";
        path += (firstPoint.X + width) + " " + (firstPoint.Y + height) + " ";
        path += (firstPoint.X + width) + " " + firstPoint.Y;
        return new ShapeData(firstPoint.X + parseInt(width / 2), firstPoint.Y + parseInt(height / 2), path);
    }
}
