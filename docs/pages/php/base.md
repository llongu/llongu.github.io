> 参数接收 返回 Json 数据

```php
header('Content-Type:application/json;charset=utf-8');
// $getname=$_POST['name'];
// $getname=$_GET['name'];
$getname=$_REQUEST['name'];
if(isset($getname)){
    $json = array('status' => 200,'name'=> $getname );
    echo json_encode($json);
}else{
    echo 'failed';
};
```

> 数组的两种方式

```php
$arrayName= [
   "foo" => "bar",
   "bar" => "foo",
];
$arrayName= array("foo","bar");
var_dump($arrayName)
```

> 构造函数与析构函数

```php
class Person{

    public function __construct($name,$age){
        //new Person自动执行
        echo('hello'.$name.'</br>');
        $this -> name=$name;
        $this -> age=$age;
    }
    public function data(){
        return $this -> age;
    }

    public function __destruct(){
        //对象销毁后执行 可进行资源释放操作 数据库关闭等
        echo "buye {$this->name}";
    }

}

$test=new Person('frist',30);
```

> 私有受保护公有属性

```php
class Test{
    public $name='test';//公有
    private $age=22;//私有
    protected $sex='男';//受保护

    private function privateFN(){
        return $this->age;
    }

    protected function protectedFN(){
        return $this->sex;
    }

    public function publicFN(){
        echo  $this -> name.$this -> privateFN().$this->protectedFN();
    }


    //该方法只针对非公有属性有效
    public function __set($key,$value){
        if($key=='sex' && $value=='女'){
            $this -> sex ='性别永远是男的';
        }
    }

    //该方法只针对非公有属性有效
    public function __get($key){
        if($key=='age'){
            return '</br>不要访问此属性哦';
        }
    }

    //设置验证返回值
    public function __isset($key){
        if($key=='age'){
            return true;
        }
    }

}

$getTest=new Test();
$getTest -> sex ='女';
echo $getTest -> publicFN();
echo $getTest-> age;
```

> 继承

```php
class Person{

    public $name;
    private $age;//私有属性不可继承
    protected $sex;
    public function __construct($name,$age,$sex){
        $this->name=$name;
        $this->age=$age;
        $this->sex=$sex;
    }

    public function getInfo(){
       echo "name=".$this -> name."</br>age=".$this->age."</br>sex=".$this->sex;
    }
}

class Yellow extends Person{
    //如果重写父级方法 必须调用一下parent 才能继承 否则属性为空
    public function __construct($name,$age,$sex,$other){
      parent::__construct($name,$age,$sex);
      $this->other=$other;
    }

    public function getInfo(){
      parent::getInfo();
      echo "</br>other=".$this -> other;
      echo "</br>属性访问:".$this -> name;
      echo "</br>属性访问:".$this -> sex;
        // echo "</br>属性访问:".$this -> age;//不可访问
    }
}

$info=new Yellow('test',22,"男",'这是继承者的属性');
$info->getInfo();
```

> 抽象类不一定有抽象方法，可以存在普通方法，但含有抽象方法的，必须是抽象类
> 抽象类不能被实例化，必须有之类继承，并且把抽象类的抽象方法实现

```php
//抽象类
abstract class Person{
    //抽象方法没有方法体
    public abstract function eat();
}

class man extends Person{
    public function eat(){
        echo 'eat';
    }
}

$man=new Man();
$man->eat();
```

> 接口 interface

    接口可以声明常量也可以抽象方法
    接口中方法都是抽象方法，不用abstract定义
    接口不能实例化，需要类去实现
    一个类型不能继承多个类，但可以实现多个接口

```php
interface Person{
    const NAME='test';
    public function run();
    public function eat();
}

interface Study{
    public function study();
}

class Student implements Person,Study{
    //自己的静态属性 不用实例化就能访问
    static $my_static='mystatic';
    public function run(){
        //在类方法中不能用$this,使用self访问静态变量或属性
        echo self::NAME;
        echo '实现run';
    }
    public function eat(){
        echo '实现eat';
    }
    public function study(){
        echo '实现study';
    }
}

// 复杂业务写法
abstract class get implements Person,Study{
    public abstract function run();
    public abstract function eat();
    public abstract function study();
}

class Student extends get{
    public function run(){
        echo self::NAME;
        echo '实现run';
    }
    public function eat(){
        echo '实现eat';
    }
    public function study(){
        echo '实现study';
    }
}

echo Student::$my_static.'</br>';
$test=new Student();
$test->run();
$test->eat();
$test->study();
```

> PDO

```php
header("Content-type:text/html;charset=utf-8");

$dbms='mysql';     //数据库类型
$host='localhost'; //数据库主机名
$dbName='test';    //使用的数据库
$user='root';      //数据库连接用户名
$pass='';          //对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";
try{
    $dbh=new PDO($dsn,$user,$pass);
    echo '连接成功';
     /*你还可以进行一次搜索操作*/
    foreach ($dbh->query('SELECT * from test_name') as $row) {
        print_r($row); //你可以用 echo($GLOBAL); 来看到这些值
    }

}catch(PDOException $e){
    die('Error:'.$e.getMessage().'</br>');
}
```
