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
public class friction {

    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/friction")
    public String forward() {
        return "friction";
    }

    @RequestMapping("/testFriction")
    public String forwardt() {
        return "testFriction";
    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/friction/handle", method = RequestMethod.POST)
    public Map<String, Object> function(String[] xPoint, String[] yPoint) {
        Map<String, Object> model = new HashMap<>();
        if (xPoint == null || yPoint == null) {
            model.put("success", false);
            return model;
        }
        List<gPoint> list = new ArrayList<>();
        for (int i = 0; i < xPoint.length; i++) {
            list.add(new gPoint(Integer.parseInt(xPoint[i]), Integer.parseInt(yPoint[i])));
        }
        Object[] rst = RecognizeCommon.recognize(list);

        //TODO 优化实现
        if (rst[2] != null && rst[2] != "" && rst[3] != null) {
            model.put("startX", rst[0]);
            model.put("startY", rst[1]);
            model.put("path", rst[2]);
            model.put("type",rst[3]);
            model.put("success", true);
        } else {
            model.put("success", false);
        }
        return model;
    }
}
