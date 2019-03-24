var userLatitude;
var userLongitude;

var locate=[];

window.onload=function()
{
    $('#display-region').onepage_scroll({
		sectionContainer:'.page',
		pagination:false
    });
    
    //test随机生成100个点
    locate=testLocation(100);

    //获取当前位置
    // navigator.geolocation.getCurrentPosition(createMap);
    createMap();

    //绘制地区详细数据表格
    paintRect();
    paintCircle();
}

function createMap() {
    // userLatitude=position.coords.latitude;
    // userLongitude=position.coords.longitude;

    userLatitude=-100;
    userLongitude=35;

     //百度地图api
	let map = new BMap.Map("map-region-all");
	let point = new BMap.Point(userLongitude,userLatitude);
	map.centerAndZoom(point, 5);
	for (let i = 0; i < locate.length; i++) {
		let point = new BMap.Point(locate[i].longitude,locate[i].latitude);
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
    
    // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

//随机生成指定数目个经纬度
function testLocation(num)
{
    let locate=new Array();
    for(let i=0;i<num;i++)
    {
        locate.push({latitude:randomFloat(0,180),longitude:randomFloat(0,90)});
    }
    return locate;
}

//产生一个minNum到maxNum的随机小数
function randomFloat(minNum,maxNum)
{
    return Math.random()*(maxNum-minNum)+minNum;
}

function paintCircle()
{
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart-all'));
    option = {
        backgroundColor: '#2c343c',
    
        title: {
            text: '地区饼状图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
    
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'美食分享',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'上海'},
                    {value:310, name:'北京'},
                    {value:274, name:'天津'},
                    {value:235, name:'济南'},
                    {value:400, name:'其他城市'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        // shadowColor: 'rgba(255, 255, 255, 0.5)'
                    }
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function paintRect()
{
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart-rect-all'));
    option = {
        xAxis: {
            type: 'category',
            data: ['上海', '天津', '北京', '广州', '深圳', '济南', '其他']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}