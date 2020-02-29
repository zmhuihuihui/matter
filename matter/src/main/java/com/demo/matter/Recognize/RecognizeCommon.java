package com.demo.matter.Recognize;

import com.demo.matter.Util.DrawStatus;

public class RecognizeCommon {

    private static DrawStatus drawStatus = DrawStatus.SHAPE;

    public static DrawStatus getCurrentDrawStatus() {
        return drawStatus;
    }

    public static DrawStatus modifyCurrentDrawStatus(String status) {
        drawStatus = DrawStatus.modifyStatus(status);
        return drawStatus;
    }

    public static void recognize(int[][] pointMatrix) {
        switch (drawStatus) {
            case SHAPE:
                RecognizeShape.recognize(pointMatrix);
                break;
            case CHARACTER:
                RecognizeCharacter.recognize(pointMatrix);
                break;
        }
    }
}
