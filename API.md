# 接口文档
前后端请求接口约定

# 接口约定
*   成功请求errcode为0
*   不成功请求errcode为-1，errmsg为提示信息

## 1.获取数据列表
*   方法名: getList
*   请求: GET
*   示例: 
    *   查询所有列表: /node/dinner/manager/getList
    *   根据日期查询: /node/dinner/manager/getList?orderDate=2018-01-12
    *   根据名字查询: /node/dinner/manager/getList?name=leo
    *   根据日期+名字查询:  /node/dinner/manager/getList?name=leo2&orderDate=2018-01-12

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
name | false | String | 以名字检索数据
orderDate | false | String | 以日期检索数据


### 返回参数
参数 | 类型 | 描述
---|---|---|---
id | Number | 
name | String | 名字
department | Number | 部门：0，用户体验部；1，KM 产品部；2，蓝钉产品部；3，平台支持部；4，EKP 产品部；5，AIP 部门
orderStatus | Number | 订餐状态, 1:加班订餐; 2:加班不订餐; 3:不加班不订餐
orderDate | String | 订餐日期："2018-01-15"
orderTime | Number | 订餐时间戳： 1516000813994
restaurant | String | 吃哪家

---

## 2.更新订餐数据 (弃用)
*   方法名: updateData
*   请求: POST
*   示例: /node/dinner/updateData

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
orderStatus | true | String | 订餐状态
name | true | String | 名字

---

## 3.用户今天是否已做了选择
用处貌似不大，用获取点餐状态接口orderStatus也能实现

*   方法名: isAction
*   请求: GET
*   示例: /node/dinner/isAction?name=leo666&orderDate=2018-01-12

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
orderDate | true | String | 订餐日期: 2018-01-12
name | true | String | 名字


### 返回参数
参数 | 类型 | 描述
---|---|---|---
isAction | Boolean | true: 已操作，false: 未操作

---

## 4.某用户某天的点餐状态
*   方法名: orderStatus
*   请求: GET
*   示例: /node/dinner/orderStatus?name=leo666&orderDate=2018-01-12

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
orderDate | true | String | 日期: 2018-01-12
name | true | String | 名字


### 返回参数
参数 | 类型 | 描述
---|---|---|---
orderStatus | Number | 1:加班订餐; 2:加班不订餐; 3:不加班不订餐

---

## 5.后台管理员登录
*   方法名: login
*   请求: POST
*   示例: /node/dinner/manager/login

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
user | true | String | 用户名
pass | true | String | 密码


### 返回参数
参数 | 类型 | 描述
---|---|---|---
errcode | Number | -1: 登陆不成功, 0: 登陆成功



---

## 6.获取某日是否可以提交加班订餐记录
*   方法名: getSubmit
*   请求: GET
*   示例: /node/dinner/getSubmit?date=2018-01-16

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
date | true | String | 日期，格式：2018-01-16


### 返回参数
参数 | 类型 | 描述
---|---|---|---
status | Number | 0: 不允许, 1: 允许

---

## 7.设置某日是否可以提交加班订餐记录
*   方法名: setSubmit
*   请求: POST
*   示例: /node/dinner/manager/setSubmit

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
date | true | String | 日期
status | true | Number | 0: 不允许, 1: 允许



---

## 8.根据ID更新订餐数据 (管理用)
*   方法名: updateDataById
*   请求: POST
*   示例: /node/dinner/manager/updateDataById

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
id | true | Number | 记录ID
department | true | Number | 部门：0，用户体验部；1，KM 产品部；2，蓝钉产品部；3，平台支持部；4，EKP 产品部；5，AIP 部门
name | true | String | 名字
orderStatus | true | String | 订餐状态
restaurant | false | String | 吃哪家
remarks | false | String | 备注

---

## 9.删除某条订餐信息记录
*   方法名: deleteOrder
*   请求: POST
*   示例: /node/dinner/manager/deleteOrder


### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
id | true | Number | 记录ID

---


## 10.添加订餐数据
*   方法名: addOrder
*   请求: POST
*   示例: /node/dinner/addOrder

### 请求参数
参数 | 是否必须 | 类型 | 描述
---|---|---|---
name | true | String | 名字
department | true | Number | 部门：0，用户体验部；1，KM 产品部；2，蓝钉产品部；3，平台支持部；4，EKP 产品部；5，AIP 部门
orderStatus | true | String | 订餐状态
restaurant | false | String | 吃哪家
remarks | false | String | 备注

---

## 11.获取日常订餐数据列表
*   方法名: getStatusList
*   请求: GET


### 请求参数
参数             | 是否必须 | 类型 | 描述
----------------|-------|----------|---
orderDate | false | String | 以日期/月份条件获取数据
department | false | Number | 以部门条件用来获取数据

*   示例: 
    *   根据日期查询: /node/dinner/manager/getStatusList?orderDate=2018-02-13
    *   根据月份查询: /node/dinner/manager/getStatusList?orderDate=2018-02
    *   根据日期+部门查询: /node/dinner/manager/getStatusList?orderDate=2018-02-13&department=


### 返回参数
参数            | 类型 | 描述
----------------|-------|---------
orderStatus | Number | 订餐状态, 1:加班订餐; 2:加班不订餐; 3:不加班不订餐
total            | Number | 总数

```json
{
    "errmsg": "ok",
    "errcode": 0,
    "data": [
        {
            "orderStatus": 1,
            "total": 672
        },
        {
            "orderStatus": 2,
            "total": 2
        },
        {
            "orderStatus": 3,
            "total": 13
        }
    ]
}
```

---

## 12.获取以部门为纬度的订餐列表
*   方法名: getListByDepartment
*   请求: GET


### 请求参数
参数             | 是否必须 | 类型 | 描述
----------------|-------|----------|---
orderDate | false | String | 以日期/月份条件获取数据
department | false | Number | 以部门条件用来获取数据

*   示例: 
    *   根据日期查询: /node/dinner/manager/getListByDepartment?orderDate=2018-02-13
    *   根据月份查询: /node/dinner/manager/getListByDepartment?orderDate=2018-02
    *   根据日期+部门查询: /node/dinner/manager/getListByDepartment?orderDate=2018-02-13&department=


### 返回参数
参数            | 类型 | 描述
----------------|-------|---------
department | Number | 部门：0，用户体验部；1，KM 产品部；2，蓝钉产品部；3，平台支持部；4，EKP 产品部；5，AIP 部门
orderStatus | Number | 订餐状态, 1:加班订餐; 2:加班不订餐; 3:不加班不订餐
total            | Number | 总数

```json
{
    "errmsg": "ok",
    "errcode": 0,
    "data": [
        {
            "department": 1,
            "orderStatus": 1,
            "total": 672
        },
        {
            "department": 1,
            "orderStatus": 2,
            "total": 2
        },
        {
            "department": 1,
            "orderStatus": 3,
            "total": 12
        },
        {
            "department": 4,
            "orderStatus": 3,
            "total": 1
        },
        {
            "department": 5,
            "orderStatus": 3,
            "total": 1
        }
    ]
}
```

---