package com.demo.matter.Util;

import java.util.ArrayList;
import java.util.List;

/**
 * 识别图形
 */
public class recognizeUtil {

    private static final int[] RECTANGLE = {18,4,4,18,3,0,0,3,3,0,0,3,18,4,4,18};
    private static final int[] LEFT_TRIANGLE = {18,0,0,0,2,3,0,0,2,0,3,0,13,2,3,18};
    private static final int[] RIGHT_TRIANGLE = {0,0,2,20,0,1,3,2,1,2,0,3,20,3,2,16};


    public static Object[] recognize(String[] xPoint, String[] yPoint){
        int maxPreX = Integer.MIN_VALUE;
        int minPreX = Integer.MAX_VALUE;
        int maxPreY = Integer.MIN_VALUE;
        int minPreY = Integer.MAX_VALUE;
        List<Point> trail = new ArrayList<>();
        Object[] rst = new Object[3];
        for(int i=0;i<xPoint.length;i++){
            trail.add(new Point(Integer.parseInt(xPoint[i]),Integer.parseInt(yPoint[i])));
        }

        //获取图形的边界值
        for (Point point : trail) {
            if(point.x > maxPreX) maxPreX = point.x;
            if(point.x < minPreX) minPreX = point.x;
            if(point.y > maxPreY) maxPreY = point.y;
            if(point.y < minPreY) minPreY = point.y;
        }
        //计算图形边界长宽
        double xLength = maxPreX - minPreX;
        double yLength = maxPreY - minPreY;

        rst[0] = (int)(minPreX + xLength/2);
        rst[1] = (int)(minPreY + yLength/2);

        int[] count = new int[16];

        for(Point point : trail){
            int index = -1;
            if(point.x <= xLength / 4 + minPreX) index += 1;
            else if(point.x <= xLength / 2 + minPreX) index += 2;
            else if(point.x <= (xLength * 3) / 4 + minPreX) index += 3;
            else index += 4;
            if(point.y <= yLength / 4 + minPreY) index += 0;
            else if(point.y <= yLength / 2 + minPreY) index += 4;
            else if(point.y <= (yLength * 3) / 4 + minPreY) index += 8;
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
            }
            //左三角
            else if(left_triangle <= rectangle && left_triangle <= right_triangle){
                rst[2] += minPreX + " " + minPreY + " ";
                rst[2] += minPreX + " " + maxPreY + " ";
                rst[2] += maxPreX + " " + maxPreY ;
            }
            //右三角
            else if(right_triangle <= left_triangle && right_triangle <= rectangle){
                rst[2] += maxPreX + " " + minPreY + " ";
                rst[2] += maxPreX + " " + maxPreY + " ";
                rst[2] += minPreX + " " + maxPreY;
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
