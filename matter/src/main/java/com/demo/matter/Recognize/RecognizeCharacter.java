package com.demo.matter.Recognize;

import com.demo.matter.Geo.gPoint;

import java.util.List;

public class RecognizeCharacter {

    public static String  recognize(List<gPoint> pointList){
        PredictModel model = new PredictModel();
        return Character.toString(model.predictChinese(pointList.listIterator()));
    }
}
