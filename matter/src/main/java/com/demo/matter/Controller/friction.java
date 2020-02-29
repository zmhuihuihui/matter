package com.demo.matter.Controller;

import com.demo.matter.Util.recognizeUtil;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
public class friction {

    @RequestMapping("/friction")
    public String forward(){
        return "friction";
    }

    @RequestMapping(value = "/friction/handle",method = RequestMethod.POST)
    public Map<String,Object> function(String[] xPoint, String[] yPoint){
        Map<String,Object> model = new HashMap<>();
        if(xPoint == null || yPoint == null){
            model.put("success",false);
            return model;
        }
        //TODO
        Object[] rst = recognizeUtil.recognize(xPoint, yPoint);
        if(rst[2] !=null && rst[2] != ""){
            model.put("startX",rst[0]);
            model.put("startY",rst[1]);
            model.put("path",rst[2]);
            model.put("success",true);
        }else{
            model.put("success",false);
        }
        return model;
    }
}
