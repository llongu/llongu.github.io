# 前端导入 excel vue 业务代码示例

> 解析需要格式规范统一，不能没有规则


## 安装
`npm install --save xlsx js-xlsx`


```js

<input type="file" @change="getFile" name="" id="">

import XLSX from "xlsx"; 

function getFile(e){
      const file=e.target.files[0];
      const reader=new FileReader(file);
      reader.onload=(obj)=>{
        const {result}=obj.target
        const wb=XLSX.read(result,{
          type:'array'
        })
        const data=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        console.log(data);
        /**
         *  验证
         *  1. 验证表头完整
         * 
         *  导入错误
         *  2. x行 x 列 格式错误
         *  3. x行 开始时间 不能大于 结束时间
         *  x条 导入成功
         */
        const headers=['抵扣类型','会员手机号','抵扣金额','发放生效时间','发放失效时间','使用生效时间','使用过期时间']
        const tips=[],newData=[]
        if( !Array.isArray(data) || data.length==0){
           return this.$message.warning('导入失败，请确认格式是否与模板一致')
        }
        data.forEach((item,index)=>{
          headers.forEach(key=>{
            if(!item[key] && item[key]!=0 && item[key]!='false'){
              console.log(`第${index+2}行，${key}列格式错误`);
              return tips.push(`第${index+2}行，${key}列格式错误`)
            }
          })
          if(item['发放失效时间'] < item['发放生效时间']){
              console.log(`第${index+2}行，发放失效时间 应大于 发放生效时间`)
              return tips.push(`第${index+2}行，发放失效时间 应大于 发放生效时间`)
          }
          if(item['使用过期时间'] < item['使用生效时间']){
              console.log(`第${index+2}，使用过期时间 应大于 使用生效时间`)
              return tips.push(`第${index+2}，使用过期时间 应大于 使用生效时间`)
          }
          const obj={
              couponName:item['抵扣类型'],
              phone:item['会员手机号'],
              couponPolicy:{
                deduction:item['抵扣金额'],
              },
              grantStartTime:this.formatDate(item['发放生效时间']),
              grantEndTime:this.formatDate(tem['发放失效时间']),
              useStartTime:this.formatDate(item['使用生效时间']),
              useEndTime:this.formatDate(item['使用过期时间']),
          }
          newData.push(obj) 
        })
        console.log(newData);
        console.log(tips);
      }
      reader.readAsArrayBuffer(file)
    },
     formatDate(numb, format='/') {
      if(!numb)return null

      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }

```

## [导入模板.xls](https://llongu.github.io/pages/use/file/导入模板.xls)



# 前端导出 excel vue 业务代码示例

> 解析 lsit 格式

## 安装

`npm install --save xlsx js-xlsx`

```js

<el-button  @click='exports'> 导出所有  </el-button>

import XLSX from "xlsx"; 
      exports(){
        //为二维数组，第一个数组是header ,其余为数据（获取接口list解析后按header顺序对应排列）
        const tables=[
            ['订单号', '运营商', '启动充电时间', '结束充电时间','客户应付总额', '客户应付电费', '客户应付服务费', '客户实付总额','客户支付状态','哪吒应付费用总额','哪吒应付电费','哪吒应付服务费']
        ]

        this.exportLoad=true
          getList({
            pageNum: 1,
            pageSize: 1000000,
          }).then(response=>{
            console.log('response:',response)    
            const {list=[]}=response.data || {}
            list.forEach(item=>{
                const {
                    chargingSeq,tenantName,chargingStartTime,chargingEndTime,
                    orderAmount,electricPrice,servicePrice,payAmount,paymentStatus,
                    costAmount,costElectricPrice,costServicePrice
                    }=item
                const excelRow=[
                    chargingSeq,tenantName,chargingStartTime,chargingEndTime,
                    orderAmount,electricPrice,servicePrice,payAmount,this.getOptValue(paymentStatus,'paymentStatusOpt'),
                    costAmount,costElectricPrice,costServicePrice
                ]
                tables.push(excelRow)
            })
            console.log(tables) 
            const sheet = XLSX.utils.aoa_to_sheet(tables);
            this.openDownloadDialog(this.sheet2blob(sheet), '对账.xlsx');
            this.exportLoad=false

        }).catch(e=>{
            console.log(e)
            this.exportLoad=false
        });     
    },
    sheet2blob(sheet, sheetName) {
        sheetName = sheetName || 'sheet1';
        var workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet;
        // 生成excel的配置项
        var wopts = {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
        // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        return blob;
    },
    openDownloadDialog(url, saveName)
    {
        if(typeof url == 'object' && url instanceof Blob)
        {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if(window.MouseEvent) event = new MouseEvent('click');
        else
        {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    },
```

## [导出结果示例.xlsx](https://llongu.github.io/use/file/导出结果示例.xlsx)


