# matter
基于matter的手绘物理实验

## 1、摩擦力实验
>接口地址：http://127.0.0.1:8080/friction

## 2.速度图像使用说明
### 2.1 导入tableUtil.js、echarts.js
### 2.2 
        obj=initTable();//初始化表格
        let myChart=obj.myChart;//获取表格实例
        let option=obj.option;//获取表格选项实例
        let currentTimeOut;//声明计时器
        
        /**调用速度图像方法
          *param:
          *   tablebody：是一个Body实例的数组
          *   0：起始时间为0
          *   myChart：表格实例
          *   option：表格选项实例
        startDrawTable(tablebody,0,myChart,option);
### 2.3 使用实例
        建议绑定物理仿真的开始按钮，单击开始按钮，同时开始/结束物理仿真和速度记录
        <button id="tableStart">开始</button>
        
        
        <script>
        $(document).ready(function(){
        $("#tableStart").click(function(){
            if($("#tableStart").text()=="开始"){
                $("#tableStart").text("暂停");
                currentTimeOut=startDrawTable(tablebody,0,myChart,option);
            }else{
                $("#tableStart").text("开始");
                clearInterval(currentTimeOut);
            }
        });
        });
        </script>
        
