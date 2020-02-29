package com.demo.matter.Util;

import com.demo.matter.Exception.DrawStatusException;

public enum DrawStatus {
    SHAPE("shape"), CHARACTER("character");

    private String status;

    DrawStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public static DrawStatus modifyStatus(String status) {
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
