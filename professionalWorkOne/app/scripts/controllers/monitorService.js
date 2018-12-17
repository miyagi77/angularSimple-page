'use strict';
angular.module("demoApp")
		.constant('dataQuaUrl','http://10.172.14.39:8999/api/QuaStatic/GetQuaStatic?')
		.constant('dataQuaUrl2','http://10.172.14.39:8999/api/QuaStatic/GetQuaStaticAll?')
		.constant('loseUrl','http://10.172.13.43:8888/api/DayStation/GetYS?method=QB')
		.constant('sendUrl','http://10.172.13.43:8888/api/DayStation/GetYS?method=YS')
		.constant('receivedUrl','http://10.172.13.43:8888/api/RcvStation/QueryRCVIDS?')
		.constant('receivedUrl2','http://10.172.13.43:8888/api/DayStation/GetFiveData?')
		.constant('sendedUrl','http://10.172.13.43:8888/api/QuerySend/QuerySend?')
		.constant('fiveSendUrl','http://10.172.13.43:8888/api/DayStation/GetNewZSend?')
		.constant('fiveGetUrl','http://10.172.13.43:8888/api/DayStation/GetNewZRCV?')
		.factory('monitorService',function(dataQuaUrl,$http,loseUrl,sendUrl,receivedUrl,sendedUrl,dataQuaUrl2,$localStorage,fiveSendUrl,fiveGetUrl){
			return{
				queryStation: function(){
					var data = [];
					var temp1 = [];
					$http.get('http://10.172.13.43:8888/api/Teltable/QueryStations').success(function(res){
						console.log(res);
						data = res;
						var obj = {};
						var temp = [];
						angular.forEach(data,function(item){
							if(!obj[item.SOURCE_COUNTY]){
								obj[item.SOURCE_COUNTY] = [];
								obj[item.SOURCE_COUNTY].push(item);
							}else{
								obj[item.SOURCE_COUNTY].push(item);
							}
						})
						for(var p in obj){
							var list = {
								SOURCE_COUNTY:p,
								stations:obj[p]
							}
							temp.push(list);
						}
						console.log(temp);
						var obj2 = {};
						angular.forEach(temp,function(item){
							item.SOURCE_CITY = item.stations[0].SOURCE_CITY;
							if(!obj2[item.SOURCE_CITY]){
								obj2[item.SOURCE_CITY] = [];
								obj2[item.SOURCE_CITY].push(item);
							}else{
								obj2[item.SOURCE_CITY].push(item);
							}
						});
						for(var p2 in obj2){
							var list2 = {
								SOURCE_CITY:p2,
								stations:obj2[p2]
							}
							temp1.push(list2);
						}
						angular.forEach(temp1,function(item){
							angular.forEach(item.stations,function(sitem){
								angular.forEach(sitem.stations,function(subitem){
									subitem.name = subitem.STATION_NAME + '(' + subitem.IIIII+')';
									if(subitem.IIIII.substr(0,1) == '5'){
										subitem.sortId ='V0001';
									}else{
										subitem.sortId =subitem.IIIII;
									}
								})
								sitem.stations.push({
									IIIII:sitem.stations[0].SOURCE_COUNTY,
									SOURCE_CITY:sitem.stations[0].SOURCE_CITY,
									SOURCE_COUNTY:sitem.stations[0].SOURCE_COUNTY,
									STATION_NAME:'',
									name:sitem.stations[0].SOURCE_COUNTY+"(全部)",
									sortId:'V0000'
								})
							})
						})
						console.log(temp1);
						$localStorage.stations = temp1;
					});
					return temp1;
				},
				getWarnData: function(){
					var url = 'http://10.172.13.43:8888/api/Teltable/AlarmType';
					return $http.get(url);
				},
				queryDataQua:function(para){
					var url = dataQuaUrl;
					for(var p in para){
						url += ('&&' + p + '=' + para[p]);
					}
					//解决IE9url 中文参数无法解析的问题，用encodeURI对url进行编码
					return $http.get(encodeURI(url));
				},
				queryDataQua2:function(para){
					var url = dataQuaUrl2;
					for(var p in para){
						url += ('&&' + p + '=' + para[p]);
					}
					return $http.get(encodeURI(url));
				},
				//实发
				sendedData:function(paras){
					var url = sendedUrl;
					url += 'dType='+paras.dType+'&cType='+paras.cType+'&startTime='+paras.startTime+'&endtime='+paras.endtime;
					return $http.get(url);
				},
				//getAll(实时监控)
				getAll:function(time){
					var url = 'http://10.172.13.43:8888/api/DayStation/GetAll?tptime='+time;
					return $http.get(url);
				},
				//特殊资料接受服务
				getRcv:function(ctype,time){
					var url = 'http://10.172.13.43:8888/api/DayStation/GetDataTypeData?';
					url+='ctype='+ctype+'&datetime='+time;
					return $http.get(url);
				},
				//特殊资料发送服务
				getSend:function(ctype,time){
					var url = 'http://10.172.13.43:8888/api/DayStation/GetDataTypeSendData?';
					url+='ctype='+ctype+'&datetime='+time;
					return $http.get(url);
				},
				//重要资料接收服务
				getImportant :function(time){
					var url = 'http://10.172.13.43:8888/api/DayStation/getImportData?tptime='+time;
					return $http.get(url);
				},
				//重要资料发送服务
				getSendImportant :function(time){
					var url = 'http://10.172.13.43:8888/api/DayStation/getSendImportData?tptime='+time;
					return $http.get(url);
				},
				//省到国家局实发，未发
				sendData:function(time){
					var url = 'http://10.172.13.43:8888/api/DayStation/GetSendAll?tptime='+time;
					return $http.get(url);
				},
				//5分钟数据接收
				getFive:function(time){
					var url = fiveGetUrl+'timeNow='+time;
					return $http.get(url);
				},
				sendFive:function(time){
					var url = fiveSendUrl+'timeNow='+time;
					return $http.get(url);
				},
				//5分钟数据发送
				//添加资料
				addInfo:function(data){
					var url = 'http://10.172.13.43:8888/api/DataType/Adds';
					return $http.post(url,data);
				},
				//新增站点
				addStation:function(data){
					var url = 'http://10.172.13.43:8888/api/Teltable/ADStations';
					return $http.post(url,data);
				},
				//编辑资料
				editInfo:function(data){
					var url = 'http://10.172.13.43:8888/api/DataType/UpdateDate';
					return $http.post(url,data);
				},
				//编辑站点
				editStation:function(data){
					var url='http://10.172.13.43:8888/api/Teltable/UpdateStation';
					return $http.post(url,data);
				},
				//质量统计缺报站点详情
				misStaDetail:function(paras){
					var url = 'http://10.172.13.43:8888/api/QueryQuality/GetLackData?';
					for(var p in paras){
						url += ( '&' + p + '=' + paras[p]);
					}
					return $http.get(url);
				}
			}
		})
		//数组
		.factory('transData',function(){
			var transData = [];
			var avaData = [];
			var _set = function (data) {
				avaData = data;
			};
			var _get = function(){
				return avaData;
			}
			transData.set = _set;
			transData.get = _get;

			// 在controller中通过调set()和get()方法可实现提交或获取参数的功能
			return transData;
		})
		//对象
		.factory('transObj',function(){
			var transObj = [];
			var avaData = [];
			var _set = function (data) {
				avaData = data;
			};
			var _get = function(){
				return avaData;
			}
			transObj.set = _set;
			transObj.get = _get;

			// 在controller中通过调set()和get()方法可实现提交或获取参数的功能
			return transObj;
		})
		//资料的站点编辑
		.factory('dataToSta',function(){
			var dataToSta = [];
			var avaData = [];
			var _set = function (data) {
				avaData = data;
			};
			var _get = function(){
				return avaData;
			}
			dataToSta.set = _set;
			dataToSta.get = _get;

			// 在controller中通过调set()和get()方法可实现提交或获取参数的功能
			return dataToSta;
		})
		//新增资料的站点编辑
		.factory('addInfoSta',function(){
			var addInfoSta = [];
			var avaData = [];
			var _set = function (data) {
				avaData = data;
			};
			var _get = function(){
				return avaData;
			}
			addInfoSta.set = _set;
			addInfoSta.get = _get;

			// 在controller中通过调set()和get()方法可实现提交或获取参数的功能
			return addInfoSta;
		})
		//新增资料的站点编辑
		.factory('userWrite',function(){
			var userWrite = [];
			var avaData = [];
			var _set = function (data) {
				avaData = data;
			};
			var _get = function(){
				return avaData;
			}
			userWrite.set = _set;
			userWrite.get = _get;

			// 在controller中通过调set()和get()方法可实现提交或获取参数的功能
			return userWrite;
		})
