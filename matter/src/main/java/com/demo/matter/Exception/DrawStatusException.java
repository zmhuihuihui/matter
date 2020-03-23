package com.demo.matter.Exception;

public class DrawStatusException extends RuntimeException {

    public DrawStatusException(String message){
        super(message);
    }

    public DrawStatusException(){
        throw new DrawStatusException("画图状态错误！");
    }
}
