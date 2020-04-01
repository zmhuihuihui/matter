package com.demo.matter.Util;

import com.demo.matter.Geo.gPoint;

import java.util.ArrayList;
import java.util.List;

/**
 * 识别图形
 */
public class RecognizeUtil {

    private static final int[] RECTANGLE = {18,4,4,18,3,0,0,3,3,0,0,3,18,4,4,18};
    private static final int[] LEFT_TRIANGLE = {18,0,0,0,2,3,0,0,2,0,3,0,13,2,3,18};
    private static final int[] RIGHT_TRIANGLE = {0,0,2,20,0,1,3,2,1,2,0,3,20,3,2,16};


    public static Object[] recognize(List<gPoint> trail){
        int maxPreX = Integer.MIN_VALUE;
        int minPreX = Integer.MAX_VALUE;
        int maxPreY = Integer.MIN_VALUE;
        int minPreY = Integer.MAX_VALUE;

        /**
         * 0 : 中心点横坐标
         * 1 : 中心点纵坐标
         * 2 : 路径
         */
        Object[] rst = new Object[4];

        //获取图形的边界值
        for (gPoint point : trail) {
            if(point.X() > maxPreX) maxPreX = point.X();
            if(point.X() < minPreX) minPreX = point.X();
            if(point.Y() > maxPreY) maxPreY = point.Y();
            if(point.Y() < minPreY) minPreY = point.Y();
        }
        //计算图形边界长宽
        double xLength = maxPreX - minPreX;
        double yLength = maxPreY - minPreY;

        rst[0] = (int)(minPreX + xLength/2);
        rst[1] = (int)(minPreY + yLength/2);
        rst[2] = "";
        rst[3] = null;

        int[] count = new int[16];

        for(gPoint point : trail){
            int index = -1;
            if(point.X() <= xLength / 4 + minPreX) index += 1;
            else if(point.X() <= xLength / 2 + minPreX) index += 2;
            else if(point.X() <= (xLength * 3) / 4 + minPreX) index += 3;
            else index += 4;
            if(point.Y() <= yLength / 4 + minPreY) index += 0;
            else if(point.Y() <= yLength / 2 + minPreY) index += 4;
            else if(point.Y() <= (yLength * 3) / 4 + minPreY) index += 8;
            else index += 12;

            count[index]++;
        }

        //归一化
        for(int i = 0; i <count.length;i++){
            count[i] = (int)(((double)count[i]/trail.size())*100);
        }

        double rectangle = euclideanDistance(RECTANGLE,count);
        double left_triangle = euclideanDistance(LEFT_TRIANGLE,count);
        double right_triangle = euclideanDistance(RIGHT_TRIANGLE,count);

        //阈值
        if(Math.min(rectangle,Math.min(left_triangle,right_triangle)) <= 20){
            //长方形
            if(rectangle <= left_triangle && rectangle <= right_triangle){
                rst[2] += minPreX + " " + minPreY + " ";
                rst[2] += minPreX + " " + maxPreY + " ";
                rst[2] += maxPreX + " " + maxPreY + " ";
                rst[2] += maxPreX + " " + minPreY;
                rst[3] = "RECTANGLE";
            }
            //左三角
            else if(left_triangle <= rectangle && left_triangle <= right_triangle){
                rst[2] += minPreX + " " + minPreY + " ";
                rst[2] += minPreX + " " + maxPreY + " ";
                rst[2] += maxPreX + " " + maxPreY ;
                rst[3] = "TRIANGLE";
            }
            //右三角
            else if(right_triangle <= left_triangle && right_triangle <= rectangle){
                rst[2] += maxPreX + " " + minPreY + " ";
                rst[2] += maxPreX + " " + maxPreY + " ";
                rst[2] += minPreX + " " + maxPreY;
                rst[3] = "TRIANGLE";
            }
        }
        return rst;

    }

    private static double euclideanDistance(int[] reference, int[] predict) {
        double value2 = 0;
        if (reference.length != predict.length) {
            return -1;
        }
        for (int i = 0; i < predict.length; i++) {
            value2 += (predict[i] - reference[i]) * (predict[i] - reference[i]);
        }
        return Math.sqrt(value2);
    }

}
