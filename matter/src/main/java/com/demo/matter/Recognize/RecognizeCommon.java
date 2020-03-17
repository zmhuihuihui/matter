package com.demo.matter.Recognize;

import com.demo.matter.Exception.DrawStatusException;
import com.demo.matter.Geo.gPoint;
import com.demo.matter.Util.DrawStatus;
import com.demo.matter.Util.RecognizeUtil;

import java.util.List;

public class RecognizeCommon {

    private static DrawStatus drawStatus = DrawStatus.SHAPE;

    public static DrawStatus getCurrentDrawStatus() {
        return drawStatus;
    }


    public static Object[] recognize(List<gPoint> pointList) {
        //TODO 删除手势
        /*
        if(RecognizeDel.recognize(pointList) != '0'){

            return null;
        }
        */

        //状态切换
        String StatusChange = RecognizeStatusChange.recognize(pointList);
        if(StatusChange != null){
            drawStatus = modifyCurrentDrawStatus(StatusChange);
            return null;
        }

        Object[] resultType = null;
        switch (drawStatus) {
            case SHAPE:
                //TODO 图形识别
                //resultType = RecognizeShape.recognize(pointList);
                resultType = RecognizeUtil.recognize(pointList);
                break;
            case CHARACTER:
                //TODO 字符识别
                //resultType = RecognizeCharacter.recognize(pointList);
                break;
            default:
                throw new RuntimeException();

        }
        return resultType;
    }

    public static DrawStatus modifyCurrentDrawStatus(String status) {
        switch (status) {
            case "shape":
                return DrawStatus.SHAPE;
            case "character":
                return DrawStatus.CHARACTER;
            default:
                throw new DrawStatusException();
        }
    }
}
