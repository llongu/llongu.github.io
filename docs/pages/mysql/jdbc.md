# JDBC

    JDBC（Java Database Connectivity，Java数据库连接）是一个Java语言中用来规范客户端程序如何访问数据库的应用程序接口（API）。

    通过使用JDBC，Java开发者可以将他们的应用程序与任何支持JDBC的数据库进行连接。JDBC API包括一系列的Java方法，这些方法用于创建，查询，更新，删除数据库中的数据。

    JDBC驱动是用于连接到特定类型数据库的程序。许多数据库管理系统（如Oracle，MySQL，PostgreSQL等）都有对应的JDBC驱动程序。

    JDBC的基本步骤通常包括以下：

    加载JDBC驱动
    创建数据库连接
    创建一个或多个SQL语句
    通过数据库执行这些语句
    获取并处理结果（如果有的话）
    关闭连接和语句对象

    例如，以下是一段简单的Java代码，使用JDBC连接到MySQL数据库并执行一个查询：

```java
import java.sql.*;

public class Main {
  public static void main(String[] args) {
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    try {
      // 1. 加载驱动
      Class.forName("com.mysql.cj.jdbc.Driver");
      
      // 2. 创建连接
      conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydatabase","username","password");
      
      // 3. 创建语句
      stmt = conn.createStatement();
      String sql;
      sql = "SELECT id, name FROM MyTable";
      rs = stmt.executeQuery(sql);

      //防止SQl 注入
    // sql = "SELECT id, name FROM MyTable WHERE id = ?";
    // PreparedStatement pstmt = conn.prepareStatement(sql);
    // pstmt.setInt(1, 1001);
    // rs = pstmt.executeQuery();
      
      // 4. 处理结果集
      while(rs.next()){
        System.out.println("ID: " + rs.getInt("id") + ", Name: " + rs.getString("name"));
      }
    } catch(SQLException se) {
      se.printStackTrace(); // 处理 JDBC 错误
    } catch(Exception e) {
      e.printStackTrace(); // 处理 Class.forName 错误
    } finally {
      // 5. 关闭所有资源
      try {
        if(stmt!=null) stmt.close();
      } catch(SQLException se2) { } // 什么也不做
      try {
        if(conn!=null) conn.close();
      } catch(SQLException se) { se.printStackTrace(); }
    }
  }
}
```

## DriverManager

    DriverManager是JDBC的基础类，用于管理一系列JDBC驱动程序。它负责：

    1. 注册驱动程序
    2. 提供数据库连接
    3. 跟踪可用的驱动程序

    以下是DriverManager的常用方法：

| 方法 | 描述 |
| --- | --- |
| static void registerDriver(Driver driver) | 注册驱动程序 |
| static Connection getConnection(String url) | 通过给定的URL连接到数据库 |
| static Connection getConnection(String url, String user, String password) | 通过给定的URL连接到数据库，使用给定的用户名和密码 |
| static Connection getConnection(String url, Properties info) | 通过给定的URL连接到数据库，使用给定的属性 |
| static Connection getConnection(String url, String user, String password, Properties info) | 通过给定的URL连接到数据库，使用给定的用户名和密码，使用给定的属性 |
| static Driver getDriver(String url) | 获取给定URL的驱动程序 |
| static Driver[] getDrivers() | 获取已注册的驱动程序 |
| static void setLoginTimeout(int seconds) | 设置登录超时时间 |
| static int getLoginTimeout() | 获取登录超时时间 |
| static PrintWriter getLogWriter() | 获取日志输出流 |
| static void setLogWriter(PrintWriter out) | 设置日志输出流 |

## Connection

    Connection接口表示与特定数据库的连接。它负责：

    1. 创建语句
    2. 提供数据库元数据信息
    3. 控制事务
    4. 关闭连接

### 事务操作
    
    事务是一组SQL语句，它们作为一个单元执行。如果事务中的所有语句都成功执行，则提交事务。如果任何语句失败，则回滚事务。

```java
try {
  conn.setAutoCommit(false);
  stmt = conn.createStatement();
  stmt.executeUpdate("INSERT INTO MyTable(id, name) VALUES(1001, 'name1')");
  stmt.executeUpdate("INSERT INTO MyTable(id, name) VALUES(1002, 'name2')");
  conn.commit();
} catch(SQLException se) {
  conn.rollback();
} finally {
  conn.setAutoCommit(true);
}

```

    以下是Connection的常用方法：

| 方法 | 描述 |
| --- | --- |
| Statement createStatement() | 创建一个Statement对象，用于执行静态SQL语句 |
| PreparedStatement prepareStatement(String sql) | 创建一个PreparedStatement对象，用于执行动态SQL语句 |
| CallableStatement prepareCall(String sql) | 创建一个CallableStatement对象，用于执行存储过程 |
| String nativeSQL(String sql) | 将SQL语句转换为本地SQL语句 |
| void setAutoCommit(boolean autoCommit) | 设置自动提交模式 |
| boolean getAutoCommit() | 获取自动提交模式 |
| void commit() | 提交当前事务 |
| void rollback() | 回滚当前事务 |
| void close() | 关闭连接 |
| boolean isClosed() | 检查连接是否已关闭 |
| DatabaseMetaData getMetaData() | 获取数据库元数据信息 |
| void setReadOnly(boolean readOnly) | 设置只读模式 |
| boolean isReadOnly() | 检查是否为只读模式 |
| void setCatalog(String catalog) | 设置当前目录 |
| String getCatalog() | 获取当前目录 |
| void setTransactionIsolation(int level) | 设置事务隔离级别 |
| int getTransactionIsolation() | 获取事务隔离级别 |
| SQLWarning getWarnings() | 获取连接的警告信息 |
| void clearWarnings() | 清除连接的警告信息 |
| Statement createStatement(int resultSetType, int resultSetConcurrency) | 创建一个Statement对象，用于执行静态SQL语句，指定结果集类型和并发模式 |
| PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency) | 创建一个PreparedStatement对象，用于执行动态SQL语句，指定结果集类型和并发模式 |
| CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency) | 创建一个CallableStatement对象，用于执行存储过程，指定结果集类型和并发模式 |
| Map getTypeMap() | 获取自定义类型映射 |
| void setTypeMap(Map map) | 设置自定义类型映射 |

## Statement

    Statement接口用于执行静态SQL语句并返回它所生成结果的对象。它负责：

    1. 执行SQL语句
    2. 获取结果集
    3. 获取生成的键

    以下是Statement的常用方法：

| 方法 | 描述 |
| --- | --- |
| ResultSet executeQuery(String sql) | 执行给定的SQL语句，返回一个ResultSet对象 |
| int executeUpdate(String sql) | 执行给定的SQL语句，返回受影响的行数 |
| boolean execute(String sql) | 执行给定的SQL语句，返回一个boolean值，表示是否有结果集 |
| void addBatch(String sql) | 将给定的SQL语句添加到批处理中 |
| void clearBatch() | 清除批处理中的所有语句 |
| int[] executeBatch() | 执行批处理中的所有语句，返回一个int数组，表示每个语句受影响的行数 |
| ResultSet getResultSet() | 获取当前结果集 |
| int getUpdateCount() | 获取当前受影响的行数 |
| boolean getMoreResults() | 检查是否有更多的结果集 |
| void close() | 关闭语句 |
| int getMaxFieldSize() | 获取最大字段大小 |
| void setMaxFieldSize(int max) | 设置最大字段大小 |
| int getMaxRows() | 获取最大行数 |
| void setMaxRows(int max) | 设置最大行数 |
| void setEscapeProcessing(boolean enable) | 启用或禁用转义处理 |
| int getQueryTimeout() | 获取查询超时时间 |
| void setQueryTimeout(int seconds) | 设置查询超时时间 |
| void cancel() | 取消当前语句的执行 |
| SQLWarning getWarnings() | 获取当前语句的警告信息 |
| void clearWarnings() | 清除当前语句的警告信息 |
| void setCursorName(String name) | 设置游标名称 |
| boolean execute(String sql, int autoGeneratedKeys) | 执行给定的SQL语句，返回一个boolean值，表示是否有结果集，指定是否返回自动生成的键 |
| boolean execute(String sql, int[] columnIndexes) | 执行给定的SQL语句，返回一个boolean值，表示是否有结果集，指定是否返回自动生成的键 |
| boolean execute(String sql, String[] columnNames) | 执行给定的SQL语句，返回一个boolean值，表示是否有结果集，指定是否返回自动生成的键 |
| int getResultSetType() | 获取结果集类型 |
| int getResultSetConcurrency() | 获取结果集并发模式 |
| int getResultSetHoldability() | 获取结果集可保持性 |
| boolean isClosed() | 检查语句是否已关闭 |
| void setPoolable(boolean poolable) | 设置是否可池化 |
| boolean isPoolable() | 检查是否可池化 |
| void closeOnCompletion() | 设置在当前语句完成时关闭 |
| boolean isCloseOnCompletion() | 检查是否在当前语句完成时关闭 |
...

## PreparedStatement

    PreparedStatement 是Statement的子类，用于执行参数化动态SQL语句并返回它所生成结果的对象。它负责：

    1. 执行SQL语句
    2. 获取结果集
    3. 获取生成的键

    以下是PreparedStatement的常用方法：

| 方法 | 描述 |
| --- | --- |
| ResultSet executeQuery() | 执行当前SQL语句，返回一个ResultSet对象 |
| int executeUpdate() | 执行当前SQL语句，返回受影响的行数 |
| boolean execute() | 执行当前SQL语句，返回一个boolean值，表示是否有结果集 |
| --- | --- |
| void setNull(int parameterIndex, int sqlType) | 设置给定参数的值为NULL |
| void setBoolean(int parameterIndex, boolean x) | 设置给定参数的值为boolean值 |
| void setByte(int parameterIndex, byte x) | 设置给定参数的值为byte值 |
| void setShort(int parameterIndex, short x) | 设置给定参数的值为short值 |
| void setInt(int parameterIndex, int x) | 设置给定参数的值为int值 |
| void setLong(int parameterIndex, long x) | 设置给定参数的值为long值 |
| void setFloat(int parameterIndex, float x) | 设置给定参数的值为float值 |
| void setDouble(int parameterIndex, double x) | 设置给定参数的值为double值 |
| void setBigDecimal(int parameterIndex, BigDecimal x) | 设置给定参数的值为BigDecimal值 |
| void setString(int parameterIndex, String x) | 设置给定参数的值为String值 |
| void setBytes(int parameterIndex, byte[] x) | 设置给定参数的值为byte数组 |
| void setDate(int parameterIndex, Date x) | 设置给定参数的值为Date值 |
| void setTime(int parameterIndex, Time x) | 设置给定参数的值为Time值 |
| void setTimestamp(int parameterIndex, Timestamp x) | 设置给定参数的值为Timestamp值 |
| void setAsciiStream(int parameterIndex, InputStream x, int length) | 设置给定参数的值为AsciiStream值 |
| void setUnicodeStream(int parameterIndex, InputStream x, int length) | 设置给定参数的值为UnicodeStream值 |
| void setBinaryStream(int parameterIndex, InputStream x, int length) | 设置给定参数的值为BinaryStream值 |
| void clearParameters() | 清除所有参数的值 |
| void setObject(int parameterIndex, Object x, int targetSqlType) | 设置给定参数的值为Object值 |
| void setObject(int parameterIndex, Object x) | 设置给定参数的值为Object值 |
| boolean execute() | 执行当前SQL语句，返回一个boolean值，表示是否有结果集 |
| void addBatch() | 将当前SQL语句添加到批处理中 |
...


## ResultSet

    ResultSet接口用于表示SQL查询的结果集。它负责：

    1. 遍历结果集
    2. 获取结果集的元数据信息

    以下是ResultSet的常用方法：

| 方法 | 描述 |
| --- | --- |
| boolean next() | 移动到下一行 |
| boolean previous() | 移动到上一行 |
| boolean first() | 移动到第一行 |
| boolean last() | 移动到最后一行 |
| boolean absolute(int row) | 移动到指定行 |
| boolean relative(int rows) | 移动指定行数 |
| void close() | 关闭结果集 |
| boolean isClosed() | 检查结果集是否已关闭 |
| void setFetchDirection(int direction) | 设置获取方向 |
| int getFetchDirection() | 获取获取方向 |
| void setFetchSize(int rows) | 设置获取大小 |
| int getFetchSize() | 获取获取大小 |
| int getType() | 获取结果集类型 |
| int getConcurrency() | 获取结果集并发模式 |
| int getHoldability() | 获取结果集可保持性 |
| boolean isBeforeFirst() | 检查是否在第一行之前 |
| boolean isAfterLast() | 检查是否在最后一行之后 |
| boolean isFirst() | 检查是否在第一行 |
| boolean isLast() | 检查是否在最后一行 |
| void beforeFirst() | 移动到第一行之前 |
| void afterLast() | 移动到最后一行之后 |
| boolean first() | 移动到第一行 |
| boolean last() | 移动到最后一行 |
| int getRow() | 获取当前行号 |
| boolean absolute(int row) | 移动到指定行 |
| boolean relative(int rows) | 移动指定行数 |
| ResultSetMetaData getMetaData() | 获取结果集元数据信息 |
| void setMetaData(ResultSetMetaData meta) | 设置结果集元数据信息 |
| Statement getStatement() | 获取创建结果集的语句 |
| Blob getBlob(int columnIndex) | 获取指定列的Blob对象 |
| Blob getBlob(String columnLabel) | 获取指定列的Blob对象 |
| Clob getClob(int columnIndex) | 获取指定列的Clob对象 |
| Clob getClob(String columnLabel) | 获取指定列的Clob对象 |
| boolean getBoolean(int columnIndex) | 获取指定列的
boolean值 |
| boolean getBoolean(String columnLabel) | 获取指定列的
boolean值 |
| byte getByte(int columnIndex) | 获取指定列的byte值 |
...






## 数据库连接池

    数据库连接池是一种创建和管理数据库连接的技术。它负责：

    资源重用：由于数据库连接得以重用，避免了频繁创建、释放连接引起的大量性能开销，在减少系统消耗的基础上，也增加了系统运行环境的平稳性
    提高系统响应速度：数据库连接池在初始化过程中，往往已经创建了若干数据库连接置于池中备用，此时连接的初始化工作均已完成。对于业务请求处理而言，直接利用现有可用连接，避免了数据库连接初始化和释放过程的时间开销，从而缩减了系统整体响应时间
    新的资源分配手段：对于多应用共享同一数据库的系统而言，可在应用层通过数据库连接的配置，使用数据库连接池技术，设置某一应用最大可用数据库连接数，避免某一应用独占所有数据库资源
    统一的连接管理：在较为完善的数据库连接池实现中，可根据预先设定的连接占用超时时间，强制收回被超时占用的连接，从而避免了常规数据库连接操作中可能出现的资源泄漏

 ## Druid 介绍和使用

    下载Jar包,导入模块

 ```java
  import com.alibaba.druid.pool.DruidDataSource;

  public class DruidDemo {
    public static void main(String[] args) {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        dataSource.setInitialSize(10);
        dataSource.setMaxActive(20);
        // more properties ...
    }
  }

  ```


## demo

```java
package main;


import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.*;
import java.util.Properties;

public class DruidDataBase {
    public static DataSource dataSource;
    static {
        System.out.println("DruidDataBase 开始执行连接");
        try {
            //加载配置文件
            Properties prop = new Properties();
            FileInputStream fis = new FileInputStream("F:/java/salaryManage/salary/src/druid.properties");
            prop.load(fis);
            fis.close();

            //获取连接池对象
            dataSource= DruidDataSourceFactory.createDataSource(prop);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {

    }

    //获取Connection
    public static Connection getConnection(){
                 Connection conn=null;
                 try {
                         conn=dataSource.getConnection();

                 } catch (SQLException e) {
                         e.printStackTrace();
                   }
                 return conn;
     }

   public static void close(Connection conn){
        try {
            if(conn!=null)
                conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
     }
    public static void close(Statement stm){
             try {
                   if(stm!=null)
                             stm.close();
                   } catch (SQLException e) {
                       e.printStackTrace();
                    }
            }
     public static void close(ResultSet rs){
              try {
                       if(rs!=null)
                              rs.close();
                    } catch (SQLException e) {
                       e.printStackTrace();
                    }
     }

     public static void allClose(Connection conn,Statement stm){
         try {
             conn.close();
             stm.close();
         } catch (SQLException e) {
             e.printStackTrace();
         }
     }

    public static void allClose(Connection conn,Statement stm,ResultSet rs){
        try {
            conn.close();
            stm.close();
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}


```






## use demo

```java
package main;

import com.alibaba.fastjson.JSONObject;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Job {
    public static JSONObject query(){
        try {
            Connection  conn=DruidDataBase.getConnection();
            String sql = "SELECT * FROM job";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet resultSet = pstmt.executeQuery();
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();
            List<Map<String, Object>> resultList = new ArrayList<>();

            while (resultSet.next()) {
                HashMap<String, Object> columnMap = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String key = metaData.getColumnName(i);
                    Object value = resultSet.getObject(key);
                    columnMap.put(key, value);
                }
                resultList.add(columnMap);
            }

            JSONObject jsonData=new JSONObject();
            jsonData.put("success",true);
            jsonData.put("list",resultList);
            //关闭连接
            DruidDataBase.allClose(conn,pstmt,resultSet);
            return jsonData;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public static JSONObject add(Map<String, String> params){
        try {
            Connection  conn=DruidDataBase.getConnection();
            String sql = "INSERT INTO job (name,remark,update_date,create_date) VALUES (?,?,?,?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,params.get("name"));
            pstmt.setString(2,params.get("remark"));
            String timeStr1=LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            pstmt.setString(3,timeStr1);
            pstmt.setString(4,timeStr1);


            int resultSet = pstmt.executeUpdate();
            JSONObject jsonData=new JSONObject();
            if(resultSet==1){
                jsonData.put("success",true);
            }else{
                jsonData.put("success",false);
            }
            //关闭连接
            DruidDataBase.allClose(conn,pstmt);
            return jsonData;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static JSONObject update(Map<String, String> params){
        try {
            Connection  conn=DruidDataBase.getConnection();

            String sql = "UPDATE job SET name = ?, remark = ?, update_date = ?, create_date = ? WHERE id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,params.get("name"));
            pstmt.setString(2,params.get("remark"));
            String timeStr1=LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            pstmt.setString(3,timeStr1);
            pstmt.setString(4,params.get("create_date"));
            pstmt.setString(5,params.get("id"));

            int resultSet = pstmt.executeUpdate();
            JSONObject jsonData=new JSONObject();
            if(resultSet==1){
                jsonData.put("success",true);
            }else{
                jsonData.put("success",false);
            }
            //关闭连接
            DruidDataBase.allClose(conn,pstmt);
            return jsonData;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public static JSONObject delete(String id){
        try {
            Connection  conn=DruidDataBase.getConnection();
            String sql = "DELETE FROM job where (id) = (?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            int resultSet = pstmt.executeUpdate();
            JSONObject jsonData=new JSONObject();
            if(resultSet==1){
                jsonData.put("success",true);
            }else{
                jsonData.put("success",false);
            }
            //关闭连接
            DruidDataBase.allClose(conn,pstmt);
            return jsonData;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}

```