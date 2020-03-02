package com.demo.matter.Recognize;

import com.demo.matter.Exception.DrawStatusException;
import com.demo.matter.Geo.gPoint;
import com.demo.matter.Util.DrawStatus;

import java.util.List;

public class RecognizeCommon {

    private static DrawStatus drawStatus = DrawStatus.SHAPE;

    public static DrawStatus getCurrentDrawStatus() {
        return drawStatus;
    }

    public static DrawStatus modifyCurrentDrawStatus(String status) {
        switch (status) {
            case "shape":
                drawStatus = DrawStatus.SHAPE;
                return drawStatus;

            case "character":
                drawStatus = DrawStatus.CHARACTER;
                return drawStatus;

            default:
                throw new DrawStatusException();
        }
    }

    public static void recognize(List<gPoint> pointList) {
        switch (drawStatus) {
            case SHAPE:
                RecognizeShape.recognize(pointList);
                break;
            case CHARACTER:
                RecognizeCharacter.recognize(pointList);
                break;
        }
    }
}
