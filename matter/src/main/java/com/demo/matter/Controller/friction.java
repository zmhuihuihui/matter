package com.demo.matter.Controller;

import com.demo.matter.Geo.gPoint;
import com.demo.matter.Recognize.RecognizeCommon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
class IndexController {
    @RequestMapping("/Blog")
    public String index()  {
        return "forward:index.html";
    }
}


@Controller
public class friction {
    @RequestMapping("/friction")
    public String forward(){
        return "friction";
    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/friction/handle",method = RequestMethod.POST)
    public Map<String,Object> function(String[] xPoint, String[] yPoint){
        Map<String,Object> model = new HashMap<>();
        if(xPoint == null || yPoint == null){
            model.put("success",false);
            return model;
        }
        List<gPoint> list = new ArrayList<>();
        for(int i=0;i<xPoint.length;i++){
            list.add(new gPoint(Integer.parseInt(xPoint[i]),Integer.parseInt(yPoint[i])));
        }
        Object[] rst = RecognizeCommon.recognize(list);
        
        //TODO 优化实现
        if(rst[2] != null && rst[2] != ""){
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
