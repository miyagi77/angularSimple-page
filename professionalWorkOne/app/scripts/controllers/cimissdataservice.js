/**
 * Created by struggler on 2015-10-27.
 */

'use strict';

angular.module('demoApp')
  .constant('cimissurl', 'http://10.172.89.55/cimiss-web/api?callbackName=JSON_CALLBACK&dataFormat=jsonp')
  .constant('theu','http://10.172.89.55/cimiss-web/api?')
  .constant('userId', 'BEXA_XXZX_YW')
  .constant('pwd', 'xxzx123')
  .constant('shanxiCode', '610000')
  .constant('drawurl', 'http://10.172.9.117:8888/api/')
  .constant('warningurl','http://10.172.9.117:8888/api/')
  .constant('satelliteUrl','http://10.172.9.117:8888/api/Pic')
  .factory('CimissService', function ($http, $q, cimissurl, userId, pwd, shanxiCode, drawurl,warningurl,satelliteUrl) {
    return {
      query: function (paras) {
        var url = cimissurl + '&userId=' + userId
          + '&pwd=' + pwd;
        for (var p in paras) {
          url += ('&' + p + '=' + paras[p]);
        }
        return $http.jsonp(url);
        console.log(url);
      },
      queryStation: function () {
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        var paras = {
          interfaceId: 'getStaInfoByRegionCode',
          dataCode: 'STA_INFO_SURF_CHN_N',
          adminCodes: shanxiCode,
          elements: 'Station_Id_C,Station_Name,Admin_Code_CHN,Town_code,Country,Province,City,Cnty,Town,Station_levl,Lat,Lon,Alti'
        };
        this.query(paras).success(function (data) {
          deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (err,state) {
          console.log(state)
        })
        deferred.promise.then(function (data) {
          var stations = [];
          var districtStations = [];
          var temp = {};
          var area = {};
          angular.forEach(data.DS, function (item) {
            if (item.Station_levl == "11" || item.Station_levl == "12" || item.Station_levl == "13") {
              if (!temp[item.City]) {
                temp[item.City] = [];
              }
              item.selected = false;
              temp[item.City].push(item);
            } else if(item.Station_levl == "14"){
              if (!area[item.City]) {
                area[item.City] = [];
              }
              item.selected = false;
              area[item.City].push(item);
            }
          });
          for (var p in temp) {
            stations.push({
              name: p,
              stations: temp[p]
            })
          }
          for (var a in area) {
            districtStations.push({
              name: a,
              stations: area[a]
            })
          }
     	  stations=stations.filter(function(item){
            return item.name!="";
          });
          districtStations=districtStations.filter(function(item){
            return item.name!="";
          });
         // console.log(districtStations);
          $localStorage.allStations={'autoStation':stations,'districtStation':districtStations};//初始化
          $localStorage.checkdatasel={
            'checkzyb':true,
            'checkyj':true,
            'checkkb':true,
            'checktime':100,
            'checkPRE':10,
            'checkTEM':37,
            'checkTEMmin':5
          };
        })
      },
      queryIp: function () {
        return $http.get('/getIp');
      },
      drawRainfall: function (time, type,district, time1) {
        return $http.get(drawurl + 'Render' +'/'+time+ '/' + type + "/" + district + "/" + time1);
      },
      drawRainfall1: function(time,type,district){
        return $http.get(satelliteUrl + '/Render1' +'/'+time+ '/' + type + "/" + district + "/ti");
      },
      drawRainfallRengion: function (time, type,district, time1,name1) {
        return $http.get('http://10.172.9.116:8888/api/RengionRender' +'/'+time+ '/' + type + "/" + district + "/" + time1+"/"+name1);
      },
      drawRainfallRengion1: function (time, type,district) {
        return $http.get('http://10.172.9.116:8888/api/RengionRender' +'/'+time+ '/' + type + "/" + district + "/ time1/name1/name2");
      },
      drawRainfallByPoints: function (data) {
        return $http.post(drawurl + 'Render' + '/'+data.time+'/' + data.type + '/' + data.area + '/' + data.bigType + '/'
          + data.time1 + '/' + data.mapName+'/' + data.isDayOrHour, data.points);
      },
      drawfallByPoints: function (data) {
        return $http.post(drawurl + 'RegionRender' + '/'+data.time+'/' + data.type + '/' + data.area + '/' + data.bigType + '/'
            + data.time1 + '/' + data.mapName+'/' + data.isHourOrDay+'/'+data.isDay+'/'+data.isHour+'/'+data.isday1, data.points);
      },
      drawWindfallByPoints:function(data){
        return $http.post(drawurl+'Render'+'/'+data.time+'/'+data.type+'/'+data.area+'/'+data.bigType
        +'/'+data.time1+'/'+data.mapName+'/'+data.isDayOrHour+'/'+data.isDay+'/'+data.isHour,data.points);
      },
      //warning info
      getWarn: function(){
        return $http.get('/warning');
      },
      getWarn2: function(){
        return $http.get('/warning2');
      },
      downloadOne: function (data) {
        return $http.post('/typeOne', data);
      },
      downloadTwo: function (data) {
        return $http.post('/typeTwo', data);
      },
      downloadThree: function (data) {
        return $http.post('/typeThree', data);
      },
      querywarninginformation2:function(pageIndex)
      {
        return $http.get(warningurl+'Page/YujingGetall'+'/'+pageIndex);//获取预警信息当前页面的数据
      },
      querywarninginfomation1:function()
      {
        return $http.get(warningurl+'Page/YuJingGetCount/1');//获取预警信息的总条数
      },
      querywarning2data: function(ID)
      {
        return $http.get(warningurl+'Page/ReturnIDData'+'/'+ID);//根据ID查询预警信息
      },
      querywarning1data:function(){
        return $http.get(warningurl+'Mert/ReturnYujingData');//首页预警信息查询
      },
      zhongyaobao:function(){
        return $http.get(warningurl+'Mert/ReturnZhongyaobaoData');//首页重要报信息查询
      },
      zhongyaobao1:function(pageIndex)
      {
        return $http.get(warningurl+'Page/ZhongyaobaoGet/'+pageIndex);//获取重要报当前页面的数据
      },
      zhongyaobao2:function(pageIndex)
      {
        return $http.get(warningurl+'Page/ZhongyaobaoGetCount'+'/'+pageIndex);//重要报总条数
      },
      querySatelliteTime:function(time){
        return $http.get(satelliteUrl+'/CloundData'+'/'+time+'/station/elev/tt');//获取卫星的时间
      },
      getSatellitePic:function(time,type,StarType){
        return $http.get(satelliteUrl+'/Get_Img'+'/'+time+'/'+type+'/'+StarType+'/tt');//获取卫星的图片
      },
      getRadarPic:function(time,staId) {
        return $http.get(satelliteUrl + '/GETIMG' +'/'+ time + '/' + staId+'/ele/tt');//获取雷达的图片
      },
      getRadarTime:function(time,staId,elev,tt)
      {
        return $http.get(satelliteUrl + '/RadarTime'+'/' + time + '/' + staId+'/'+elev+'/'+tt);//获取雷达的时间
      },
      getRadarPicture:function(time,staId,elev,tt)
      {
        return $http.get(satelliteUrl + '/GETRADARIMG'+'/' + time + '/' + staId+'/'+elev+'/'+tt);//查询雷达的图片
      },
       feedbackupload:function(name,time,content,tele,dpart, email,qq,message){
        return $http.get(warningurl+'messagestorage'+'/'+name+'/'+time+'/'+content+'/'+tele+'/'+dpart+'/'+email+'/'+qq+'/'+message);//用户反馈信息入库
      },
      feedbackdowload:function()
      {
        return $http.get(warningurl+'Mert/GetUsermessage')//用户反馈信息
      },
      feedback:function()
      {
        return $http.get(warningurl+'Page/UserGetCount/1')//用户反馈的总条数
      },
      feedback1:function(pageIndex)
      {
        return $http.get(warningurl+'Page/UserGetall'+'/'+pageIndex)//当前页面的用户反馈信息
      },

      download:function(data)
      {
        return $http.post('http://10.172.9.117:8888/api/download' + '/D'+'/name/' + data.name, data.dt);

      },
      SendMessage:function()
      {
        return $http.get('http://10.172.9.117:8888/api/Mert/ReturnSendMessage')
      },
      SendClick:function(IP,time)
      {
        return $http.get('http://10.172.9.117:8888/api/click/storclick/1'+'/'+IP+'/'+time+'/shanxi/name')
      },
      Sendtodayclic:function(IP,time)
      {
        return $http.get('http://10.172.9.117:8888/api/click/statitodayclick'+'/1'+'/'+IP+'/'+time+'/shanxi/name')
      },
      Sendallclic:function(IP,time)
      {
        return $http.get('http://10.172.9.117:8888/api/click/statiallclick/1'+'/'+IP+'/'+time+'/shanxi/name')
      },
      returnALLMessage:function(){
        return $http.get('http://10.172.9.117:8888/api/Page/zhongyaobao/0')
      },
      deleteMessage:function(flag){
        return $http.get('http://10.172.9.117:8888/api/Page/zhongyaobao'+'/'+flag)
      },
      updateYujing:function(optime){
        return $http.get('http://10.172.9.117:8888/api/Pic/updateYujing'+'/'+optime+'/asfd/wedf/wqef')
      },
      updateZhongyaobao:function(optime){
        return $http.get('http://10.172.9.117:8888/api/Pic/updatezhongyaobao'+'/'+optime+'/asfd/wedf/wqef')
      },
      //降水
      weatherPRE:function(PRE,TEM,TEMMIN){
        return $http.get('http://10.172.9.117:8888/api/Pic/weatherPRE'+'/'+PRE+'/'+TEM+'/'+TEMMIN+'/DATA')
      },
      airquality:function(){
        return $http.get('http://10.172.9.117:8888/api/Mert/quality')
      },
      shanxiairquality:function(){
        return $http.get('http://10.172.9.117:8888/api/Mert/shanxiquality')
      },
      cityquality:function(cityname,date){
        return $http.get('http://10.172.9.117:8888/api/Pic/cityquality/'+date+'/'+cityname+'/'+cityname+'/'+cityname)
      }

}


  })
  .constant('moduleID','2359bc26-2094-4ad3-9c38-0cdd81fa84bf')
  .constant('moduleSignStr','fzKyrxzODwmqweN90SqL3VynEIw+shX2zhK3cCvtl6ntvdmEGFOBSWZ7KiivZu8wOMqGxtE57HVcSh10BHdQooBoKoL5tlpIDvfZJazS1CxnrVOUZ6qKVPQvabFjNDtXlogkHaA860myWzgQqGkgHNCitJVTiEB985mV5D0uY=')
  .constant('baseUrl','http://10.172.9.116')
  .factory('ensureAuth',function($http,moduleID,moduleSignStr,baseUrl) {            //SSO登录服务
    return {
      Authentication : function ( user ) {
        var url =baseUrl+ "/QX_SSO/WebServices/PassportService.asmx/ValidateUser";
        return $http.post ( url , user );
      },
      queryMenuList:function(id,token){
        var url=baseUrl+ "/Qx_sso/WebServices/UserRoleService.asmx/QueryMenuList";
        return $http({
          method:'post',
          url:url,
          data:{userId:id,token:token,moduleID:moduleID,moduleSignStr:moduleSignStr},
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj){
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        })
      },
      getDeptName:function(user){
        var url=baseUrl+ "/QX_SSO/WebServices/UserInfoService.asmx/FetchByLoginName";
        return $http.post(url,user);
      },
      getJobName:function(id,token){
        var url=baseUrl+ "/QX_SSO/WebServices/UserRoleService.asmx/QueryJobList";
        //$http.post(url,{userId:id,token:token,moduleID:moduleID,moduleSignStr:moduleSignStr});
        return $http({
          method:'post',
          url:url,
          data:{userId:id,token:token,moduleID:moduleID,moduleSignStr:moduleSignStr},
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj){
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        })
      },

    }
  })
  .factory('offlineData',function($http,baseUrl){               //离线数据服务
    return {
      saveApplicationInfo:function(form){         //提交申请人基本信息
        var url=baseUrl+ ":8888/api/ApplyInfo/Add";
        return $http.post(url,form);
      },
      saveApplicationContent:function(temp){           //提交申请人申请项目信息
       // console.log(temp);
        var url=baseUrl+ ":8888/api/DataTbl/Add";
        return $http.post(url,temp);
      },
      getApplicationInfo:function(user){
        var url=baseUrl+ "/QX_SSO/WebServices/UserRoleService.asmx/QueryUserInfo";
        return $http({
          method:'post',
          url:url,
          data:user,
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj){
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        })
      },
      saveApplicationState:function(application){
        var url=baseUrl+ ":8888/api/CurrentState/Add";
        return $http.post(url,application);
      },
      sendApplyProcess:function(process){
        var url=baseUrl+ ":8888/api/ApplyProcess/Add";
        return $http.post(url,process);
      },
      getAllDataAudit:function(level,applyname,applyunit){
        var url=baseUrl+ ":8888/api/CurrentState/QueryByLevelCount/ApplyName:"+applyname
          +"^ApplyUnit:"+applyunit+"^StartTime:^EndTime:^Level:"+level+"^State:0^pageIndex:^pageSize:";
        return $http.get(url);
      },
      getPerApplyInfo:function(DataGUID){
        var url=baseUrl+ ":8888/api/ApplyInfo/Get/"+DataGUID;
        return $http.get(url);
      },
      getPerTblData:function(DataGUID){
        var url=baseUrl+ ":8888/api/DataTbl/QueryDataTblByDataGUID/"+DataGUID;
        return $http.get(url);
      },
      getQueryState:function(DataGUID,PeopleName,PeopleUnit){                       //数据查询状态信息获取
        var url=baseUrl+":8888/api/upstate/"+DataGUID+"/"+PeopleName+"/"+PeopleUnit+"/data";
        return $http.get(url);
      },
      changeApplyState:function(obj){
        var url=baseUrl+ ":8888/api/CurrentState/Update";
        return $http.post(url,obj);
      },
      getAllApply:function(name,unit,start,end,pageIndex,pageSize){
        var url=baseUrl+ ":8888/api/CurrentState/QueryByLevel/ApplyName:"+name
          +'^'+"ApplyUnit:"+unit+'^'+"StartTime:"+start+'^'+"EndTime:"+end+'^'+"Level:"+'^'+"State:"+'^'+"pageIndex:"+pageIndex+'^'+"pageSize:"+pageSize;
        return $http.get(url);
      },
      getAllApplyItemCount:function(name,unit,start,end,pageIndex,pageSize){
        var url=baseUrl+ ":8888/api/CurrentState/QueryByLevelCount/ApplyName:"+name
          +'^'+"ApplyUnit:"+unit+'^'+"StartTime:"+start+'^'+"EndTime:"+end+'^'+"Level:"+'^'+"State:"+'^'+"pageIndex:"+pageIndex+'^'+"pageSize:"+pageSize;
        return $http.get(url);
      },
      offerApplyData:function(name,start,end){        //获取所有需要提供数据的申请表
        var url=baseUrl+ ":8888/api/CurrentState/QueryByLevelCount/ApplyName:"+name+"^ApplyUnit:^StartTime:"+start+"^EndTime:"+end+"^Level:2^State:1^pageIndex:1^pageSize:1";
        return $http.get(url);
      },
      sendApplyData:function(obj){
        return $http({
          method:'post',
          url:"/api/attach/upload",
          data:{file:obj.file,name:obj.name},
          headers: {
            'Content-Type': undefined
          },
          transformRequest: function(data) {
            var formData = new FormData();
            formData.append('file',data.file);
            formData.append('filename',data.name);
            return formData;
          }
        })
      },
      saveOfferRecord:function(obj){
        var url=baseUrl+":8888/api/UpLoadData/Add";
        return $http.post(url,obj);
      },
      getDownloadData:function(name){
        var url=baseUrl+":8888/api/QueryData/IsDownLoad/"+name;
        return $http.get(url);
      },
      queryDataDetail:function(id){
        var url=baseUrl+":8888/api/QueryData/QueryDetaileInfo/"+id;
        return $http.get(url);
      },
      saveDownLoadRecords:function(data){
        var url=baseUrl+":8888/api/DownLoadRecord/Add";
        return $http.post(url,data);
      }
    }
  })
