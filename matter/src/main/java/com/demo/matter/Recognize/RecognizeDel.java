package com.demo.matter.Recognize;

import com.demo.matter.Geo.gPoint;

import java.util.List;

public class RecognizeDel {

    public static char recognize(List<gPoint> pointList){
        PredictModel model = new PredictModel();
        return model.predictDel(pointList.listIterator());
    }
}
