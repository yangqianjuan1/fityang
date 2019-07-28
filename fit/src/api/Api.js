import axios from "axios";
import qs from 'qs'
// import {
// 	PUBLIC
// } from "@/consts";
import * as request from "./RequestClient";
const MAP_KEY = "CokBuD8tQakmb3ab9heR6gi9DDZ6u0zi";

export default {
	install(Vue, pluginOptions = {}) {
		let requestClient = new request.Client({
			baseURL: 'http://www.baoxingtech.com:9604/'
		}, {
				tokenGetter: () => {
					let store = localStorage.getItem("store");
					let token = null;
					if (store != null) {
						store = JSON.parse(store);
						if (store.userInfo && store.userInfo.adminToken) {
							token = store.userInfo.adminToken;
						}
					}
					return token;


				},
				globalErrorHandler: error => {
					Vue.prototype.loadingClose()
					if (error.message) {
						Vue.prototype.toasts(error.message)
					}
					return Promise.reject(error);
				},
				errCode: res => {
					Vue.prototype.loadingClose()
					if (res.message) {
						Vue.prototype.toasts(res.message)
					}
					return Promise.reject(res);
				},
			});
		Vue.prototype.Api = {
			//登录
			login(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`/sys/user/login`, {
						userName: info.userName,
						userPwd: info.userPwd
					},
				)
			},
			//修改密码
			updataPW(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`sys/updataUser/updataPW`,
					info,
				)
			},
			//登出
			logout() {
				return requestClient.fetch(
					request.METHOD_POST,
					`/sys/user/logout`, {
					},
				)
			},
			/**
			 * 储能站
			 */
			energy_station(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/index/energy_station`,
					info
						// provinceId: info.provinceId,
						// cityId: info.cityId,
						// prefectureId: info.prefectureId
					,
				)
			},
			/**
			 * 延寿站
			 */
			prolong_station(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/index/prolong_station`,
					info
						// provinceId: info.provinceId,
						// cityId: info.cityId,
						// prefectureId: info.prefectureId
					,
				)
			},
			/**
			 * 备售发换
			 */
			big_type_data(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/index/big_type_data`,
					info
						// provinceId: info.provinceId,
						// cityId: info.cityId,
						// prefectureId: info.prefectureId
					,
				)
			},
			/**
			 * 备电详情
			 */
			panel_detail_bd(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/panel_detail/bd`, {
						panelId: info.panelId,
					},
				)
			},
			/**
			 * 电池
			 */
			queryBattery(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/panel_detail/queryBattery`, {
						panelId: info.panelId,
					},
				)
			},
			//轮播图
			allPicl(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/picture/onePic`,
					info
				)
			},
			/**
			 * 图片
			 */
			queryAppFile(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/panel_detail/queryAppFile`, {
						panelId: info.panelId,
					},
				)
			},
			/**
			 * 负责人
			 */
			queryContacts(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/panel_detail/queryContacts`, {
						panelId: info.panelId,
					},
				)
			},
			/**
			 * 快讯首页
			 */
			newshomeListl(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`/sys/news/newsFlash`,
					info,
				)
			},
			/**
			 * 快讯详情
			 */
			newsdetail(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/news/detail`, {
						id: info.id,
					},
				)
			},
			/**
			 * 全部快讯
			 */
			newsList(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`/sys/news/newsFlash`, {
						type: info.type,//文章类型  0：签约快讯
						pageNum: info.pageNum,
						pageSize: info.pageSize
					},
				)
			},
			//下载
			wInformationDown(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`/sys/wInformationDown/list`,
					info,
				)
			},
			//签约客户
			saveOrUpdate(info) {
				return requestClient.fetch(
					request.METHOD_POST,
					`/sys/wSigningClient/signingList`,
					info,
				)
			},
			/**
			 * 能源经营业务
			 */
			energy_business_data(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/resource_center/energy_business_data`,
					info,
				)
			},
			/**
			 * 能源生产保障
			 */
			energy_product_guarantee(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/resource_center/energy_product_guarantee`,
					info,
				)
			},

			/**
			 * 监控中心 储能
			 */
			energy_station_jk(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/monitor_center/energy_station`,
					info,
				)
			},
			/**
			 * 监控中心 延寿
			 */
			prolong_station_jk(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/monitor_center/prolong_station`,
					info,
				)
			},


			/**
			 * 业务中心 储能
			 */
			energy_station_yw(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/business_center/energy_station`,
					info,
				)
			},
			/**
			 * 业务中心 延寿
			 */
			prolong_station_yw(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/business_center/prolong_station`,
					info,
				)
			},

			/**
			 * 客户中心 查询客户
			 */
			select_customer(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/customer_center/select_customer`,
					info,
				)
			},

			/**
			 * 客户中心 查询客户
			 */
			left_data(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/operation_center/left_data`,
					info,
				)
			},
			/**
			 * 客户中心 删除客户
			 */
			customer_center_delete(id) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/customer_center/delete`,
					{
						id: id
					}
				)
			},
			//三大运行商
			index_qx(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/data_performs/index_qx`,
					info
				)
			},
			//前时间段电流为0的站点数量
			dl0sl() {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/data_performs/dl0sl`,

				)
			},
			/**
			 * 拓扑图
			 */
			//空调
			airInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/airInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//电表
			meterInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/meterInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//直流远贵
			hvdcInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/hvdcInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//开关电源
			switchPowerInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/switchPowerInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//查询能源管理设备信息
			powerManageDevInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/powerManageDevInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//充电站
			chargeHubInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/chargeHubInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//电池组
			batteryGroupInfo(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/batteryGroupInfo',
					{
						panelId: params.panelId
					}
				)
			},
			//表格
			table_info(params) {
				return requestClient.fetch(
					request.METHOD_GET,
					'sys/topography/table_info',
					{
						panelId: params.panelId
					}
				)
			},


		};
		Vue.prototype.tableApi = {

			/**
		 * 地图  省ID获取其下的所有市
		 */
			shi(id) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/area/shi`,
					{
						provinceId: id
					}
				)
			},
			qx(id) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/area/qx`,
					{
						cityId: id
					}
				)
			},

			/**
			 * 资源中心  备电
			 */
			second_bd_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/second_bd_list`,
					info
				)
			},
			//充电
			second_cd_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/second_cd_list`,
					info
				)
			},
			//储能站
			second_cnz_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/second_cnz_list`,
					info
				)
			},
			//延寿站
			second_ysz_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/second_ysz_list`,
					info
				)
			},
			//蓄电池
			second_xdc_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/second_xdc_list`,
					info
				)
			},
			//蓄电池
			second_nyb_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/second_nyb_list`,
					info
				)
			},


			/**
			 * 地图数据
			 */
			//资源中心  地图
			resource_center_map(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/resource_center_map`,
					info
				)
			},
			// 资源中心列表
			resource_center_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/resource_center/resource_center_list`,
					info
				)
			},

			//监控中心 储能
			energy_station_prefecture_panel_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/monitor_center/energy_station_prefecture_panel_list`,
					info
				)
			},
			//延寿
			prolong_station_prefecture_panel_list(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/monitor_center/prolong_station_prefecture_panel_list`,
					info
				)
			},
			// 监控 储能
			energy_station_map(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/monitor_center/energy_station_map`,
					info
				)
			},
			// 监控 延寿
			prolong_station_map(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/monitor_center/prolong_station_map`,
					info
				)
			},

			//业务中心
			business_center(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/business_center/map`,
					info
				)
			},

			//运营中心
			operation_center(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/operation_center/map`,
					info
				)
			},
			//运营中心 计量分路
			index_map(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`sys/data_performs/index_map`,
					info
				)
			},


			//分路计量 分路计量详情
			fljl_zdxqs(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/data_performs/fljl_zdxqs`,
					info
				)
			},
			//单个查询
			fljl_zdxq(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/data_performs/fljl_zdxq`,
					info
				)
			},
			//分路计量 分路计量详情
			fljl_gjs(info) {
				return requestClient.fetch(
					request.METHOD_GET,
					`/sys/data_performs/fljl_gjs`,
					info
				)
			},

		}
	}
};


