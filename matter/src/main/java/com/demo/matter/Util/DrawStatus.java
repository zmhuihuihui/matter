package com.demo.matter.Util;


public enum DrawStatus {

    SHAPE("shape"), CHAR("char");

    private String status;

    DrawStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
