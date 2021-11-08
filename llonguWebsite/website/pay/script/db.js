var DbSqliteIm = {
    createNew: function (dbModule) {
        if (!dbModule) {
            return null;
        }
        var db = {};
        db.dbModule = dbModule;
        db.isAsynOpened = false;

        //异步打开数据库
        function openDatabase(callBack) {
            if (db.isAsynOpened) {
                callBack && callBack();
                return;
            }

            db.dbModule.openDatabase({
                name: 'tpay'
            }, function (ret) {
                if (ret.status) {
                    db.isAsynOpened = true;
                    callBack && callBack();
                }
            });
        }
        
        //初始化
       db.init=function(){
            var IsDbSqliteImInit = localStorage.getItem('IsDbSqliteImInit');
            if (!IsDbSqliteImInit) {
                var ret = db.dbModule.openDatabaseSync({
                    name: 'tpay'
                });

                if (!ret.status) {
                    return null;
                }

                ret = db.dbModule.executeSqlSync({
                    name: 'tpay',
                    sql: 'CREATE TABLE IF NOT EXISTS `his_messages` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`target_id` varchar(50) NOT NULL,`message` text,`time` INTEGER NOT NULL);'
                });

                if (!ret.status) {
                    return null;
                }
                localStorage.setItem('IsDbSqliteImInit', true);

                console.log('IsDbSqliteIm Init Success');
            }
       };
       db.init();
       

        //清空
        db.clear = function () {
            openDatabase(function () {
                db.dbModule.executeSql({
                    name: 'tpay',
                    sql: 'DROP TABLE `his_messages`;'
                }, function (ret) {
                    if (ret.status) {
                        localStorage.removeItem('IsDbSqliteImInit');
                    }
                });
            });
        };

        //消息入库
        db.pushMessage = function (target_id, msg) {
            if (!target_id || !msg) {
                return;
            }
            db.init();
         
            //异步方式入库
            var sql = 'INSERT INTO `his_messages` (`target_id`,`message`,`time`) VALUES (\''
                + target_id + '\',\'' + JSON.stringify(msg) + '\',' + msg.send_at + ');';

            openDatabase(function () {
                db.dbModule.executeSql({
                    name: 'tpay',
                    sql: sql
                }, function (ret, err) { 
                    if(ret.status){
                        // console.log(JSON.stringify(ret))
                    }else{
                        console.warn(JSON.stringify(err))
                    }
                });
            });

          
        };
        db.getAllMessage=function(callBack){
            openDatabase(function () {
                db.dbModule.selectSql({
                    name: 'tpay',
                    sql: 'SELECT * FROM his_messages'
                }, function (ret,err) {
                    if (ret.status) {
                        console.log(JSON.stringify(ret)+'所有数据')
                        var msgs = [];
                        for (var i = 0; i < ret.data.length; i++) {
                            msgs.push(JSON.parse(ret.data[i].message));
                        }
                        callBack && callBack(msgs);
                    } else {
                        console.log(JSON.stringify(err))
                    }
                });
            });
        }

        //历史消息
        db.getHisMessage = function (target_id, lastTime, num, callBack) {
            var sql;
            if (lastTime) {
                sql = 'SELECT `message` FROM `his_messages` WHERE `target_id` = \''
                    + target_id + '\' AND `time` < ' + lastTime
                    + ' ORDER BY `time` desc limit ' + num;
            } else {
                sql = 'SELECT `message` FROM `his_messages` WHERE `target_id` = \''
                    + target_id + '\' ORDER BY `time` desc limit ' + num;
            }

            openDatabase(function () {
                db.dbModule.selectSql({
                    name: 'tpay',
                    sql: sql
                }, function (ret) {
                    if (ret.status) { 
                        // console.war(JSON.stringify(ret))
                        var msgs = [];
                        for (var i = 0; i < ret.data.length; i++) {
                            msgs.push(JSON.parse(ret.data[i].message));
                        }
                        callBack && callBack(msgs);
                    } else {
                        callBack && callBack([]);
                    }
                });
            });
        };

         //所有历史消息
         db.getHisMessageAll = function (target_id, callBack) {
            var sql ='SELECT `message` FROM `his_messages` WHERE `target_id` = ' + target_id;
                     

            openDatabase(function () {
                db.dbModule.selectSql({
                    name: 'tpay',
                    sql: sql
                }, function (ret) {
                    if (ret.status) { 
                        // console.war(JSON.stringify(ret))
                        var msgs = [];
                        for (var i = 0; i < ret.data.length; i++) {
                            msgs.push(JSON.parse(ret.data[i].message));
                        }
                        callBack && callBack(msgs);
                    } else {
                        callBack && callBack([]);
                    }
                });
            });
        };

       
        //会话列表
        db.getConversation = function (callBack) {
            //SELECT * FROM (SELECT * FROM `his_messages` ORDER BY `time` ASC) AS a GROUP BY `target_id`
            openDatabase(function () {
                db.dbModule.selectSql({
                    name: 'tpay',
                    sql: 'SELECT * FROM `his_messages` GROUP BY `target_id` ORDER BY `time`'
                }, function (ret) {
                    if (ret.status) {
                        var msgs = {};
                        for (var i = 0; i < ret.data.length; i++) {
                            var key = ret.data[i].target_id;
                            var msg = JSON.parse(ret.data[i].message);
                            msgs = {
                                target_id:ret.data[i].target_id,
                                msgType: msg.msgType,
                                content: msg.content
                            };
                            callBack && callBack(msgs);
                        }
                    } else {
                        callBack && callBack([]);
                    } 
                });
            }); 
        };

        //删除会话
        db.delConversation = function (target_id) {
            openDatabase(function () {
                db.dbModule.executeSql({
                    name: 'tpay',
                    sql: 'DELETE FROM `his_messages` WHERE `target_id` = ' + target_id
                });
            });
        };

        return db;
    },

};

