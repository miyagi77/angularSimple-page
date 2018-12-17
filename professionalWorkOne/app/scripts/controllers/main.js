'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', function ($scope,$http,$filter,$interval,$timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.show=true;
    $scope.showYw=false;
    $scope.imangesClick=[
      {staNam:'数据接口',image:'images/data.png',urlSrc:'http://10.172.89.55/cimissapiweb/'},
      {staNam:'数据服务',image:'images/shujufuwu.png',urlSrc:'http://10.172.8.166:8080'},
      {staNam:'传输监控',image:'images/chuanshu.png',urlSrc:'http://10.172.14.39:9990/'},
      {staNam:'格点服务',image:'images/gedian.png',urlSrc:'http://10.172.13.31:50003/'},
      {staNam:'资源申请',image:'images/zysq.png',urlSrc:'http://10.172.12.250/up/auth/login'},
      {staNam:'综合观测',image:'images/zongheguance.png',urlSrc:'http://10.172.9.142/mops/'},
      {staNam:'决策服务',image:'images/juce.png',urlSrc:'http://10.172.10.248:8086/MDS/index.do'},
      {staNam:'数据质控',image:'images/shujuzhikong.png',urlSrc:'http://10.172.8.172/MDOS2/'},
      {staNam:'ASOM',image:'images/ason.png',urlSrc:'http://10.1.64.39:7001/logon'},
      {staNam:'预报检验',image:'images/yubao.png',urlSrc:'http://10.172.13.31:50002/'},
      {staNam:'为农服务',image:'images/weinong.png',urlSrc:'http://10.172.8.102/'},
      {staNam:'三维闪电',image:'images/shandian.png',urlSrc:'http://61.185.209.68:8888/'},
      {staNam:'WRF模式',image:'images/wrf.png',urlSrc:'http://10.172.8.46/WRF/'},
      {staNam:'气象期刊',image:'images/qixiang.png',urlSrc:'http://10.172.8.90:8080/'},
      {staNam:'中国知网',image:'images/zhongguo.png',urlSrc:'http://www.cnki.net/'}
    ]
    $scope.chuanshu=true;
    $scope.neiWeb=[
      {staNames:'信息业务监视（新版）',urlNei:'http://10.172.14.39:9990/#/'},
      {staNames:'信息业务监视（旧版）',urlNei:'http://10.172.8.66:82/'},
      {staNames:'气象数据共享网（内网版）',urlNei:'http://10.172.8.166:8080'},
      {staNames:'气象数据共享网（公众版）',urlNei:'http://10.172.13.21:9090'},
      {staNames:'CIMISS数据服务接口',urlNei:' http://10.172.89.55/cimissapiweb/'},
      {staNames:'一体化智能网格预报平台',urlNei:' http://10.172.13.31:50003/'},
      {staNames:'县级综合观测业务集成平台 ',urlNei:'http://10.172.9.142/mops/'},
      {staNames:'气象数据分析平台(187网站)',urlNei:'http://10.172.9.187/'},
      {staNames:'MDOS2.0操作平台',urlNei:' http://10.172.8.172/MDOS2/'},
      {staNames:'ASOM系统',urlNei:' http://10.1.64.39:7001/logon'},
      {staNames:'综合管理信息系统',urlNei:' http://10.172.8.68'},
      {staNames:'陕西省决策气象服务网 ',urlNei:'http://10.172.10.248:8086/MDS/index.do'},
      {staNames:'陕西省粮食作物气象服务',urlNei:' http://10.172.8.102/'},
      {staNames:'陕西省公共气象服务系统',urlNei:' http://10.172.36.18:811/'},
      {staNames:'长江流域气象服务平台',urlNei:' http://10.104.64.16:8088/cjly/index'},
      {staNames:'陕西省气象台主页',urlNei:'http://10.172.9.158/'},
      {staNames:'陕西省气象信息中心主页',urlNei:' http://10.172.8.66/'},
      {staNames:'省内常用软件和资料下载',urlNei:' http://10.172.8.66:85/'}
    ]
    $scope.waiWeb=[
      {staNames:'中国气象局官网',urlWai:' http://www.cma.gov.cn/'},
    {staNames:'中国天气网',urlWai:' http://www.weather.com.cn/'},
    {staNames:'陕西省气象局官网',urlWai:' http://www.sxmb.gov.cn/index.php'},
    {staNames:'陕西省气象数字图书馆',urlWai:' http://www.cnki.net/'},
    {staNames:'中国气象数据网',urlWai:' http://data.cma.cn/'},
    {staNames:'中国气象远程教育网',urlWai:' http://www.cmatc.cn/www/res/index/index.shtml'},
    {staNames:'国家气象信息中心',urlWai:' http://www.nmic.cn/web/index.htm'},
    {staNames:'陕西省空气质量发布网',urlWai:'http://113.140.66.226:8024/sxAQIWeb/pagecity.aspx?cityCode=NjEwMTAw'},
    {staNames:'东亚地区地面气象数据',urlWai:' http://envf.ust.hk/dataview/gts/current/'},
    {staNames:'欧洲中心数值预报',urlWai:' https://www.ecmwf.int/'},
    {staNames:'气象家园',urlWai:' http://bbs.06climate.com/forum.php'},
    {staNames:'Micaps4开放平台',urlWai:' http://www.micaps.cn/MiFun/main'}
    ]
    $scope.yuj=[]
    $http.get('http://10.172.13.21:8077/warning')
      .success(function(res){
        $scope.data=[];
        $scope.yuj = []
        var result=res.data;
        result=result.replace(new RegExp("\r","gm"),"");
        result=result.replace(new RegExp("\n","gm"),"");
        result=result.replace(new RegExp("\t","gm"),"");
        var data =JSON.parse(result);
        $scope.yuj = data.DS;
      })
      .error(function(res){
        console.log(res)
      })

    $scope.now=(new Date());
    $scope.lastH=$scope.now.getTime()-2000*60*30;
    $scope.lastT=$scope.now.getTime()-16000*60*30;
    $scope.lasth=$scope.now.getTime()-30000*60*30;
    $scope.lasths=$scope.now.getTime()-36000*60*30;
    $scope.engTimes=$filter('date')($scope.lastH,'yyyyMMddHH0000')
    $scope.sendData=$filter('date')($scope.lastT,'yyyy-MM-dd HH:00:00')
    $scope.sendDatas=$filter('date')($scope.lastT,'yyyy-MM-dd HH:mm:00')
    $scope.startTimes=$filter('date')($scope.lasths,'yyyy-MM-dd')
    $scope.engTime=$filter('date')($scope.now,'yyyyMMddHH0000');
    $scope.startTime=$filter('date')($scope.now,'yyyyMMdd000000');
    $scope.urlDownRain='http://10.172.9.116/RengionRending/'+$scope.startTime+'/PRE_1h/610000/'+$scope.engTimes+'.png'
    $scope.qiWen=true;
    $scope.aripWen='http://10.172.9.116/RengionRending/'+$scope.startTime+'/TEM/610000/'+$scope.engTimes+'.png';
    $scope.actualReceiving=[]
    $scope.actualsend=[]
    $scope.selectStam=[
      {staName:'质控后地面气象要素资料',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'1',image:'images/dimianqixiang.png'},
      {staName:'质控后地面区域气象要素资料',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'2',image:'images/dimianquyu.png'},
      {staName:'质控后无人站气象要素',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'3',image:'images/wurenz.png'},
      {staName:'土壤水分',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'4',image:'images/tuur.png'},
      {staName:'公路交通',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'5',image:'images/jjiaotong.png'},
      {staName:'酸雨',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'6',image:'images/suanyu.png'},
      {staName:'城镇预报',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'7',image:'images/chengz.png'},
      {staName:'雷达基数据',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'8',image:'images/jishuju.png'},
      {staName:'雷达基本反射率',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'9',image:'images/fanshe.png'},
      {staName:'大气成分',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'10',image:'images/daqicf.png'},
      {staName:'雨滴谱数据',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'11',image:'images/rain.png'},
      {staName:'紫外线',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'12',image:'images/ziwaix.png'}
    ]
    $http.get('http://10.172.9.117:8888/api/Pic/Get_Img/'+$scope.startTimes+'%2008:31:00.000/L_PJ1_IR2/FY2E/tt')
      .success(function(res){
        $scope.wexin="data:image/png;base64,"+res.Data;
      })
      .error(function(res){
        console.log(res)
      })
    var timer=$interval(function(){
      $http.get('http://10.172.13.43:8888/api/DayStation/getImportData?tptime='+$scope.sendData)
        .success(function(res){
          angular.forEach(res,function(index){
            if(index.DATA_TYPE_NAME=='大气成分气溶胶PM10/PM2.5/PM1质量浓度（PMMUL）原始文件'){
              index.DATA_TYPE_NAME='大气成分'
              index.paixu='10'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='紫外线指数预报指导产品'){
              index.DATA_TYPE_NAME='紫外线';
              index.paixu='12'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='每日的酸雨采样资料原始文件'){
              index.DATA_TYPE_NAME='酸雨';
              index.paixu='6'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='全国城镇精细化预报产品－各省的订正预报产品'){
              index.DATA_TYPE_NAME='城镇预报';
              index.paixu='7'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='质控后无人站地面气象要素资料（新Z文件）'){
              index.DATA_TYPE_NAME='质控后无人站气象要素';
              index.paixu='3'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='质控后地面气象要素资料（新Z文件）_一体化'){
              index.DATA_TYPE_NAME='质控后地面气象要素资料';
              index.paixu='1'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='质控后地面自动站气象要素资料(区域站)_一体化'){
              index.DATA_TYPE_NAME='质控后地面区域气象要素资料';
              index.paixu='2'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.CTYPE=='E.0001.0003.R001'){
              index.DATA_TYPE_NAME='土壤水分';
              index.paixu='4'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='公路交通气象基本要素资料'){
              index.DATA_TYPE_NAME='公路交通';
              index.paixu='5'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.CTYPE=="J.0003.0001.R001"){
              index.DATA_TYPE_NAME='雷达基本反射率';
              index.paixu='9'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }
            if(index.DATA_TYPE_NAME=='雨滴谱数据'){
              index.paixu='11'
              index.RTIMEr=$filter('date')(index.RTIME,'dd');
              index.RTIMEs=$filter('date')(index.RTIME,'hh');
              index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == index.DATA_TYPE_NAME){
                  rec.receiving=index.shishou;
                  rec.baifen=index.baifen;
                  rec.sum=index.yingshou;
                  rec.rTimer=index.RTIMEr;
                  rec.rTimes=index.RTIMEs
                }
              })
            }

            index.RTIMEr=$filter('date')(index.RTIME,'dd');
            index.RTIMEs=$filter('date')(index.RTIME,'hh');
            index.baifen=((index.shishou/index.yingshou)*100).toFixed(2) + "%";
            $scope.actualReceiving.push({staName:index.DATA_TYPE_NAME,receiving:index.shishou,sum:index.yingshou,rTimer:index.RTIMEr,rTimes:index.RTIMEs,number:index.paixu,baifen:index.baifen})
            $http.get('http://10.172.13.43:8888/api/DayStation/getSendImportData?tptime='+$scope.sendData)
              .success(function(res){
                angular.forEach(res,function(index){
                  if(index.DATA_TYPE_NAME=='大气成分气溶胶PM10/PM2.5/PM1质量浓度（PMMUL）原始文件'){
                    index.DATA_TYPE_NAME='大气成分'
                    index.paixu='10'
                  }
                  if(index.DATA_TYPE_NAME=='紫外线指数预报指导产品'){
                    index.DATA_TYPE_NAME='紫外线';
                    index.paixu='12'
                  }
                  if(index.DATA_TYPE_NAME=='每日的酸雨采样资料原始文件'){
                    index.DATA_TYPE_NAME='酸雨';
                    index.paixu='6'
                  }
                  if(index.DATA_TYPE_NAME=='全国城镇精细化预报产品－各省的订正预报产品'){
                    index.DATA_TYPE_NAME='城镇预报';
                    index.paixu='7'
                  }
                  if(index.DATA_TYPE_NAME=='质控后无人站地面气象要素资料（新Z文件）'){
                    index.DATA_TYPE_NAME='质控后无人站气象要素';
                    index.paixu='3'
                  }
                  if(index.DATA_TYPE_NAME=='质控后地面气象要素资料（新Z文件）_一体化'){
                    index.DATA_TYPE_NAME='质控后地面气象要素资料';
                    index.paixu='1'
                  }
                  if(index.DATA_TYPE_NAME=='质控后地面自动站气象要素资料(区域站)_一体化'){
                    index.DATA_TYPE_NAME='质控后地面区域气象要素资料';
                    index.paixu='2'
                  }
                  if(index.CTYPE=='E.0001.0003.R001'){
                    index.DATA_TYPE_NAME='土壤水分';
                    index.paixu='4'
                  }
                  if(index.CTYPE=='A.0001.0029.R001'){
                    index.DATA_TYPE_NAME='自动站降水资料';
                    index.paixu='20'
                  }
                  if(index.DATA_TYPE_NAME=='公路交通气象基本要素资料'){
                    index.DATA_TYPE_NAME='公路交通';
                    index.paixu='5'
                  }
                  if(index.CTYPE=="J.0003.0001.R001"){
                    index.DATA_TYPE_NAME='雷达基本反射率';
                    index.paixu='9'
                  }
                  if(index.DATA_TYPE_NAME=='雨滴谱数据'){
                    index.paixu='11'
                  }

                  index.baifenf=((index.shifa/index.yingfa)*100).toFixed(2) + "%";
                  angular.forEach($scope.actualReceiving,function(rec){
                    if(rec.staName == index.DATA_TYPE_NAME){
                      rec.sending=index.shifa;
                      rec.baifenf=index.baifenf;
                    }
                  })
                  angular.forEach($scope.selectStam,function(rec){
                    if(rec.staName == index.DATA_TYPE_NAME){
                      rec.sending=index.shifa;
                      rec.baifenf=index.baifenf;
                    }
                  })
                })
                $scope.actualReceiving.sort(function(a,b){
                  return a.number - b.number;
                })
                $scope.selectStam.sort(function(a,b){
                  return a.number - b.number;
                })
              })
              .error(function(res){
              })
          })
        })
        .error(function(res){
          console.log(res)
        })
      $http.get('http://10.172.13.43:8888/api/DayStation/getAllData?tptime='+$scope.sendData)
        .success(function(res){
          angular.forEach(res,function(rader){
            if(rader.DATA_TYPE_NAME == "质控前统一格式多普勒雷达基数据"){
              rader.DATA_TYPE_NAME='雷达基数据'
              rader.paixu='8';
              rader.RTIMEr=$filter('date')(rader.RTIME,'dd');
              rader.RTIMEs=$filter('date')(rader.RTIME,'hh');
              rader.baifen=((rader.shishou/rader.yingshou)*100).toFixed(2) + "%";
              angular.forEach($scope.selectStam,function(rec){
                if(rec.staName == rader.DATA_TYPE_NAME){
                  rec.receiving=rader.shishou;
                  rec.baifen=rader.baifen;
                  rec.sum=rader.yingshou;
                  rec.rTimer=rader.RTIMEr;
                  rec.rTimes=rader.RTIMEs
                }
              })
            }
          })
          $http.get('http://10.172.13.43:8888/api/DayStation/getAllSendData?tptime='+$scope.sendData)
            .success(function(res){
              angular.forEach(res,function(index){
                if(index.DATA_TYPE_NAME == "质控前统一格式多普勒雷达基数据"){
                  index.DATA_TYPE_NAME='雷达基数据'
                }
                index.baifenf=((index.shifa/index.yingfa)*100).toFixed(2) + "%";
                angular.forEach($scope.actualReceiving,function(rec){
                  if(rec.staName == index.DATA_TYPE_NAME){
                    rec.sending=index.shifa
                    rec.baifenf=index.baifenf
                  }
                })
                angular.forEach( $scope.selectStam,function(rec){
                  if(rec.staName == index.DATA_TYPE_NAME){
                    rec.sending=index.shifa
                    rec.baifenf=index.baifenf
                  }
                })
              })
              $scope.actualReceiving.sort(function(a,b){
                return a.number - b.number;
              })
              $scope.selectStam.sort(function(a,b){
                return a.number - b.number;
              })
            })
        })
        .error(function(res){
          console.log(res)
        })
    },6000);


    //商洛市；西安市；渭南市；安康市；汉中市；榆林市；延安市；宝鸡市；咸阳市；铜川市；杨凌区 重要资料查询
    $scope.selectStams=[
      {staName:'地面自动站气象要素资料',staNames:'地面自动站气象要素资料(区域站)（旧Z，质控前）',time:'暂无数据',times:'暂无',baifen:'A.0001.0009.R001',number:'1'},
      {staName:'城镇预报',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'7'},
      {staName:'质控后地面气象要素资料',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'1'},
      {staName:'质控后地面区域气象要素资料',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'2'},
      {staName:'质控后无人站气象要素',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'3'},
      {staName:'土壤水分',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'4'},
      {staName:'公路交通',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'5'},
      {staName:'酸雨',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'6'},
      {staName:'雷达基数据',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'8'},
      {staName:'大气成分',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'10'},
      {staName:'雨滴谱数据',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'11'},
      {staName:'紫外线',receiving:'暂无数据',sum:'暂无',baifen:'暂无数据',baifenf:'暂无数据',number:'11'}
    ]
    $scope.quansheng=true;
    $scope.cityBy=['西安','商洛','渭南','安康','汉中','榆林','延安','宝鸡','咸阳','铜川','杨凌']
    $scope.dataOne=
    $scope.dataTwo=[]

    $scope.lastZ=$scope.now.getTime()-48000*60*30;
    $scope.lastZy=$scope.now.getTime()-96000*60*30;
    $scope.lastZys=$scope.now.getTime()-144000*60*30;
    $scope.sendDataZS=$filter('date')($scope.lastZ,'yyyy-MM-dd 00:00:00')
    $scope.sendDatatime=$filter('date')($scope.lastZ,'yyyy-MM-dd')
    $scope.sendDatatimes=$filter('date')($scope.lastZy,'yyyy-MM-dd')
    $scope.sendDataZs=$filter('date')($scope.lastZ,'yyyy-MM-dd 23:59:59');
    $scope.sendDataZSy=$filter('date')($scope.lastZy,'yyyy-MM-dd 00:00:00')
    $scope.sendDataZSys=$filter('date')($scope.lastZys,'yyyy-MM-dd 00:00:00')
    $scope.sendDataZsy=$filter('date')($scope.lastZy,'yyyy-MM-dd 23:59:59');
    $scope.sendDataZsys=$filter('date')($scope.lastZys,'yyyy-MM-dd 23:59:59');
    $scope.sendDataZSweb=$filter('date')($scope.lastZ,'yyyy-MM-dd')
    $scope.sendDataZsyWeb=$filter('date')($scope.lastZy,'yyyy-MM-dd');
    $scope.cese=$scope.now.getTime()
    $scope.massTime=$filter('date')($scope.cese,'HH')

    if($scope.massTime <10 && $scope.massTime>=0){
      $scope.massShow=true;
    }else{
      $scope.massShow=false;
    }

    //A.0001.0009.R001
    //A.0001.0026.R001
    //J.0003.0001.R001
    //J.0010.0001.R001
    //G.0002.0008.R001
    //G.0003.0001.R001

    //A.0001.0009.R001
    //A.0001.0026.R001
    //J.0003.0001.R001
    //M.0012.0002.R001
    //G.0002.0008.R001
    //G.0003.0001.R001
    $scope.getSum=[]

    $scope.allCtiy=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'土壤水分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
          })
          .error(function(res){})

      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0049.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0049.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'雨滴谱数据',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})


      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0040.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0040.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'地面无人站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})


      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.9%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})


      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0029.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0029.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'质控后地面自动站降水量资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
          })
          .error(function(res){})

        angular.forEach($scope.allCtiy,function(rec){
          if(rec.color < rec.number && rec.color>0){
            rec.style=true
          }else if (rec.color == rec.number || rec.color>rec.number){
            rec.style=false
          }else{
            rec.style=null
          }
          if(rec.times=='NaN%'){
            rec.times='暂无数据'
          }
        })
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0028.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0028.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})


      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0027.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0027.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'地面公路交通',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.999',assess:'99.9%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})



      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27,%27M.0021.0002.R001%27,%27M.0032.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%99%95%E8%A5%BF%E7%9C%81')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.allCtiy.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.allCtiy,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})


      })
      .error(function(res){})

    //西安
    $scope.xianImport=[]
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sum=0;
            var sumSrece=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              //obj.DATA_TYPE_C
              $scope.sums=function(){
                sum+=parseInt(obj.ARECEVICE);//实收
                return sum
              }
              $scope.sumSreces=function(){
                sumSrece+=parseInt(obj.SRECEVICE);//应收
                return sumSrece
              }
              obj.times=(sum/sumSrece*100).toFixed(2) + "%";
              obj.color=sum/sumSrece
              $scope.sumSreces();
              $scope.sums();
              $scope.dataOne=obj.DATA_TYPE_NAME;

            })
            $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
              .success(function(res){
                var sumOne=0;
                var sumSreceTwo=0;
                angular.forEach(res,function(obj){
                  //LRECEVICE  未收
                  $scope.sumsOne=function(){
                    sumOne+=parseInt(obj.ARECEVICE);//实收
                    return sumOne
                  }
                  $scope.sumSrecesTwo=function(){
                    sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                    return sumSreceTwo
                  }
                  $scope.sumSrecesTwo();
                  $scope.sumsOne();
                  $scope.dataOne=obj.DATA_TYPE_NAME;
                })
                $scope.xianImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
                angular.forEach($scope.xianImport,function(rec){
                  if(rec.colors < rec.number && rec.colors>0){
                    rec.styles=true
                    //rec.styles='background-color:#FF9900'
                    //$scope.ceshi=true
                  }else if (rec.colors == rec.number || rec.colors>rec.number){
                    rec.styles=false
                    //rec.styles='background-color:#008100'
                    //$scope.ceshi=false
                  }else{
                    rec.styles=null
                    //rec.styles='background-color:#DCE5F2'
                    //$scope.ceshi=false
                  }
                  if(rec.timeS=='NaN%'){
                    rec.timeS='暂无数据'
                  }
                })
                angular.forEach($scope.xianImport,function(rec){
                  if(rec.color < rec.number && rec.color>0){
                    rec.style=true
                    //rec.style='background-color:#FF9900'
                  }else if (rec.color == rec.number || rec.color>rec.number){
                    rec.style=false
                    //rec.style='background-color:#008100'
                  }else{
                    rec.style=null
                    //rec.style='background-color:#DCE5F2'
                  }
                  if(rec.times=='NaN%'){
                    rec.times='暂无数据'
                  }
                })

              })
              .error(function(res){})
      })
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          obj.times=(sum/sumSrece*100).toFixed(2) + "%";
          obj.color=sum/sumSrece
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27J.0003.0001.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='雷达基本反射率'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27J.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianImport.push({staNames:'雷达基本反射率',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.98',assess:'98.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})

      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})

      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='大气资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){

            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
                sumOne+=parseInt(obj.ARECEVICE);//实收
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianImport.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0021.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0021.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E8%A5%BF%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianImport.push({staNames:'紫外线指导预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
        // $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0032.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=西安市')
        //   .success(function(res){
        //     var sum=0;
        //     var sumSrece=0;
        //     angular.forEach(res,function(obj){
        //       //LRECEVICE  未收
        //       obj.DATA_TYPE_NAME='城市(6h)预报'
        //       $scope.sums=function(){
        //         sum+=parseInt(obj.ARECEVICE);//实收
        //         return sum
        //       }
        //       $scope.sumSreces=function(){
        //         sumSrece+=parseInt(obj.SRECEVICE);//应收
        //         return sumSrece
        //       }
        //       $scope.sumSreces();
        //       $scope.sums();
        //       $scope.dataOne=obj.DATA_TYPE_NAME;
        //     })
        //     $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0032.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=西安市')
        //       .success(function(res){
        //         var sumOne=0;
        //         var sumSreceTwo=0;
        //         angular.forEach(res,function(obj){
        //           //LRECEVICE  未收
        //           $scope.sumsOne=function(){
        //             sumOne+=parseInt(obj.ARECEVICE);//实收
        //             return sumOne
        //           }
        //           $scope.sumSrecesTwo=function(){
        //             sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
        //             return sumSreceTwo
        //           }
        //           $scope.sumSrecesTwo();
        //           $scope.sumsOne();
        //           $scope.dataOne=obj.DATA_TYPE_NAME;
        //         })
        //         $scope.xianImport.push({staNames:'城市(6h)预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
        //         angular.forEach($scope.xianImport,function(rec){
        //           if(rec.colors < rec.number && rec.colors>0){
        //             rec.styles='background-color:#FF9900'
        //           }else if (rec.colors == rec.number || rec.colors>rec.number){
        //             rec.styles='background-color:#008100'
        //           }else{
        //             rec.styles='background-color:#DCE5F2'
        //           }
        //           if(rec.timeS=='NaN%'){
        //             rec.timeS='暂无数据'
        //           }
        //         })
        //         angular.forEach($scope.xianImport,function(rec){
        //           if(rec.color < rec.number && rec.color>0){
        //             rec.style='background-color:#FF9900'
        //           }else if (rec.color == rec.number || rec.color>rec.number){
        //             rec.style='background-color:#008100'
        //           }else{
        //             rec.style='background-color:#DCE5F2'
        //           }
        //           if(rec.times=='NaN%'){
        //             rec.times='暂无数据'
        //           }
        //         })
        //
        //       })
        //       .error(function(res){})
        //   })
        //   .error(function(res){})
      })
      .error(function(res){})

    //A.0001.0008.R001
    //A.0001.0009.R001
    //A.0001.0026.R001
    //E.0001.0003.R001
//商洛
    $scope.shangluoImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.shangluoImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.color < rec.number && rec.color>0 ){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.shangluoImport.push({staNames:'地面无人站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})

        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
          .success(function(res){
            var sum=0;
            var sumSrece=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              obj.DATA_TYPE_NAME='地面区域站气象资料'
              $scope.sums=function(){
                sum+=parseInt(obj.ARECEVICE);//实收
                return sum
              }
              $scope.sumSreces=function(){
                sumSrece+=parseInt(obj.SRECEVICE);//应收
                return sumSrece
              }
              $scope.sumSreces();
              $scope.sums();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
              .success(function(res){
                var sumOne=0;
                var sumSreceTwo=0;
                angular.forEach(res,function(obj){
                  //LRECEVICE  未收
                  $scope.sumsOne=function(){
                    sumOne+=parseInt(obj.ARECEVICE);//实收
                    return sumOne
                  }
                  $scope.sumSrecesTwo=function(){
                    sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                    return sumSreceTwo
                  }
                  $scope.sumSrecesTwo();
                  $scope.sumsOne();
                  $scope.dataOne=obj.DATA_TYPE_NAME;
                })
                $scope.shangluoImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
                angular.forEach($scope.shangluoImport,function(rec){
                  if(rec.colors < rec.number && rec.colors>0){
                    rec.styles=true
                  }else if (rec.colors == rec.number || rec.colors>rec.number){
                    rec.styles=false
                  }else{
                    rec.styles=null
                  }
                  if(rec.timeS=='NaN%'){
                    rec.timeS='暂无数据'
                  }
                })
                angular.forEach($scope.shangluoImport,function(rec){
                  if(rec.color < rec.number && rec.color>0){
                    rec.style=true
                  }else if (rec.color == rec.number || rec.color>rec.number){
                    rec.style=false
                  }else{
                    rec.style=null
                  }
                  if(rec.times=='NaN%'){
                    rec.times='暂无数据'
                  }
                })

              })
              .error(function(res){})
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.shangluoImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.shangluoImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%95%86%E6%B4%9B%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.shangluoImport.push({staNames:'土壤水分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.shangluoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    //A.0001.0009.R001
    //A.0001.0026.R001
    //E.0001.0003.R001
    //渭南
    $scope.weinanImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.weinanImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.weinanImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='土壤水分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.weinanImport.push({staNames:'土壤水分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.weinanImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B8%AD%E5%8D%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.weinanImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:"0.985",assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.weinanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    //A.0001.0008.R001
    //A.0001.0009.R001
    //A.0001.0026.R001
    //安康
    $scope.ankangImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ankangImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ankangImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})

      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ankangImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
          .success(function(res) {
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ankangImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
         obj.DATA_TYPE_NAME='地面无人站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%89%E5%BA%B7%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ankangImport.push({staNames:'地面无人站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ankangImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    //A.0001.0009.R001
    //A.0001.0026.R001
    //E.0001.0003.R001
    //G.0002.0008.R001
    //榆林
    $scope.yulinImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yulinImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yulinImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='大气成分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yulinImport.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='土壤水分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yulinImport.push({staNames:'土壤水分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yulinImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%A6%86%E6%9E%97%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yulinImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yulinImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    //A.0001.0009.R001
    //A.0001.0026.R001
    //E.0001.0003.R001
    //G.0002.0008.R001
//延安市
    $scope.yanImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yanImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yanImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
           obj.DATA_TYPE_NAME='大气成分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yanImport.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='土壤水分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yanImport.push({staNames:'土壤水分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yanImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%BB%B6%E5%AE%89%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.yanImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.yanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.yanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    //A.0001.0009.R001
    //A.0001.0026.R001
    //E.0001.0003.R001
    //汉中
    $scope.hanImport=[];
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.hanImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.hanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.hanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.hanImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.hanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.hanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='土壤水分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27E.0001.0003.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.hanImport.push({staNames:'土壤水分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.99',assess:'99.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.hanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.hanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.hanImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.hanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.hanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%B1%89%E4%B8%AD%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.hanImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.hanImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.hanImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    // //A.0001.0026.R001A.0001.0009.R001
    //A.0001.0008.R001
    //G.0002.0008.R001
    //宝鸡
    $scope.baoImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面气象要素日值资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'地面气象要素日值资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='大气成分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
         obj.DATA_TYPE_NAME='地面无人站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'地面无人站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%AE%9D%E9%B8%A1%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.baoImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.baoImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.baoImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    //A.0001.0009.R001
    //main.js:1522 A.0001.0026.R001
    //main.js:1522 G.0002.0008.R001
   //咸阳
    $scope.xianyImport=[]
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
            sum+=parseInt(obj.ARECEVICE);//实收
            sumSrece+=parseInt(obj.SRECEVICE);//应收
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
                sumOne+=parseInt(obj.ARECEVICE);//实收

                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收

              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianyImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }

            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianyImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面气象要素日值资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianyImport.push({staNames:'地面气象要素日值资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
         obj.DATA_TYPE_NAME='大气成分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianyImport.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})

      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianyImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E5%92%B8%E9%98%B3%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.xianyImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.xianyImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})

      })
      .error(function(res){})

    //A.0001.0009.R001
    //main.js:1624 A.0001.0026.R001
    //main.js:1624 G.0002.0008.R001
//铜川
    $scope.tcImport=[];
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
      .success(function(res){

        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.tcImport.push({staNames:'酸雨日文件',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.tcImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.tcImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })
          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.tcImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.tcImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.tcImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='大气成分'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0002.0008.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.tcImport.push({staNames:'大气成分',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.95',assess:'95.0%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.tcImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.tcImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.tcImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.tcImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.tcImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面气象要素日值资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.tcImport.push({staNames:'地面气象要素日值资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.tcImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.tcImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E9%93%9C%E5%B7%9D%E5%B8%82')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.tcImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.tcImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.tcImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})


    $scope.ylImport=[];
    //$http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=杨凌区')
    //  .success(function(res){
    //
    //    var sum=0;
    //    var sumSrece=0;
    //    angular.forEach(res,function(obj){
    //      //LRECEVICE  未收
    //      $scope.sums=function(){
    //        sum+=parseInt(obj.ARECEVICE);//实收
    //        return sum
    //      }
    //      $scope.sumSreces=function(){
    //        sumSrece+=parseInt(obj.SRECEVICE);//应收
    //        return sumSrece
    //      }
    //      $scope.sumSreces();
    //      $scope.sums();
    //      $scope.dataOne=obj.DATA_TYPE_NAME;
    //    })
    //    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27G.0003.0001.R001%27&EndDate='+$scope.sendDataZsys+'&StartDate='+$scope.sendDataZSys+'&city=杨凌区')
    //      .success(function(res){
    //        var sumOne=0;
    //        var sumSreceTwo=0;
    //        angular.forEach(res,function(obj){
    //          //LRECEVICE  未收
    //          $scope.sumsOne=function(){
    //            sumOne+=parseInt(obj.ARECEVICE);//实收
    //            return sumOne
    //          }
    //          $scope.sumSrecesTwo=function(){
    //            sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
    //            return sumSreceTwo
    //          }
    //          $scope.sumSrecesTwo();
    //          $scope.sumsOne();
    //          $scope.dataOne=obj.DATA_TYPE_NAME;
    //        })
    //        $scope.ylImport.push({staNames:'酸雨',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
    //        angular.forEach($scope.ylImport,function(rec){
    //          if(rec.colors < rec.number && rec.colors>0){
    //            rec.styles='background-color:#FF9900'
    //          }else if (rec.colors == rec.number || rec.colors>rec.number){
    //            rec.styles='background-color:#008100'
    //          }else{
    //            rec.styles='background-color:#DCE5F2'
    //          }
    //          if(rec.timeS=='NaN%'){
    //            rec.timeS='暂无数据'
    //          }
    //        })
    //        angular.forEach($scope.ylImport,function(rec){
    //          if(rec.color < rec.number && rec.color>0){
    //            rec.style='background-color:#FF9900'
    //          }else if (rec.color == rec.number || rec.color>rec.number){
    //            rec.style='background-color:#008100'
    //          }else{
    //            rec.style='background-color:#DCE5F2'
    //          }
    //          if(rec.times=='NaN%'){
    //            rec.times='暂无数据'
    //          }
    //        })
    //      })
    //      .error(function(res){})
    //  })
    //  .error(function(res){})
    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面气象要素日值'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0011.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ylImport.push({staNames:'地面气象要素日值资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ylImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ylImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0032.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ylImport.push({staNames:'地面国家站',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ylImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ylImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='地面区域站气象资料'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27A.0001.0009.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ylImport.push({staNames:'地面区域站气象资料',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'0.985',assess:'98.5%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ylImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ylImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})

    $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZs+'&StartDate='+$scope.sendDataZS+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
      .success(function(res){
        var sum=0;
        var sumSrece=0;
        angular.forEach(res,function(obj){
          //LRECEVICE  未收
          obj.DATA_TYPE_NAME='全国城镇预报'
          $scope.sums=function(){
            sum+=parseInt(obj.ARECEVICE);//实收
            return sum
          }
          $scope.sumSreces=function(){
            sumSrece+=parseInt(obj.SRECEVICE);//应收
            return sumSrece
          }
          $scope.sumSreces();
          $scope.sums();
          $scope.dataOne=obj.DATA_TYPE_NAME;
        })
        $http.get('http://10.172.13.43:8888/api/QueryQuality/GetCityQualityData?DATA_TYPE_C=%27M.0012.0002.R001%27&EndDate='+$scope.sendDataZsy+'&StartDate='+$scope.sendDataZSy+'&city=%E6%9D%A8%E5%87%8C%E5%8C%BA')
          .success(function(res){
            var sumOne=0;
            var sumSreceTwo=0;
            angular.forEach(res,function(obj){
              //LRECEVICE  未收
              $scope.sumsOne=function(){
                sumOne+=parseInt(obj.ARECEVICE);//实收
                return sumOne
              }
              $scope.sumSrecesTwo=function(){
                sumSreceTwo+=parseInt(obj.SRECEVICE);//应收
                return sumSreceTwo
              }
              $scope.sumSrecesTwo();
              $scope.sumsOne();
              $scope.dataOne=obj.DATA_TYPE_NAME;
            })
            $scope.ylImport.push({staNames:'全国城镇预报',times:(sum/sumSrece*100).toFixed(2) + "%",time:$scope.sendDatatime,color:sum/sumSrece,number:'1',assess:'100%',timeS:(sumOne/sumSreceTwo*100).toFixed(2) + "%",colors:sumOne/sumSreceTwo});
            angular.forEach($scope.ylImport,function(rec){
              if(rec.colors < rec.number && rec.colors>0){
                rec.styles=true
              }else if (rec.colors == rec.number || rec.colors>rec.number){
                rec.styles=false
              }else{
                rec.styles=null
              }
              if(rec.timeS=='NaN%'){
                rec.timeS='暂无数据'
              }
            })
            angular.forEach($scope.ylImport,function(rec){
              if(rec.color < rec.number && rec.color>0){
                rec.style=true
              }else if (rec.color == rec.number || rec.color>rec.number){
                rec.style=false
              }else{
                rec.style=null
              }
              if(rec.times=='NaN%'){
                rec.times='暂无数据'
              }
            })

          })
          .error(function(res){})
      })
      .error(function(res){})
  })
