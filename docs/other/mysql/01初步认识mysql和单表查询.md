---
title: 01初步认识mysql和单表查询
date: 2022-10-23 20:07:09
permalink: /pages/4f2be2/
author: 
  name: 北鸟南游
  link: http://www.shenshuai.me
---
# mysql概念
## sql、DB、DBMS之间关系

1. sql ：结构化查询语言，是一门标准通用的语言。标准的sql适合于所有的数据库产品
2. DB：（database）数据库
3. DBMS：database mangement system（数据库管理系统，常见的mysql、oracle、DB2、Sybase、SqlServer）
> DBMS负责执行SQL，使用sql操作DB中的数据

## 数据库中表
表：table是数据库的基本组成单元，所有数据都已表格的形式组织，目的是可读性强。
表包括行和列：

- 行被称为数据
- 列被称为字段
| 学号（int） | 姓名（varchar） | 年龄（int） |
| --- | --- | --- |
| 1 | 张三 | 12 |
| 2 | 李四 | 13 |

每个字段都包含：字段名、数据类型、相关的约束。
## SQL的分类
sql语句包括增删改查

- DQL（数据查询语言）：查询语句，所有select都是DQL
- DML（数据修改语言）：更新语句，包含insert、update、delete，**对数据进行增删改**
- DDL（数据定义语言）：create、drop、alter，**对表结构进行增删改**
- TCL（事务控制语言）：commit提交事务，rollback撤销事务
- DCL（数据控制语言）：grant授权，revoke取消权限
## 导入和删除数据
第一步：登陆mysql数据库管理系统dos命令窗口：mysql -uroot -p12345678
第二步：查看有哪些数据库show databases；（这个不是sql语句，属于mysql的命令）
第三步：创建属于我们自己的数据库 create database pnode; 数据
第四步：使用pnode数据 use pnode; （这个不是sql语句，属于mysql的命令。）
```sql
DROP TABLE IF EXISTS EMP;
DROP TABLE IF EXISTS DEPT;
DROP TABLE IF EXISTS SALGRADE;
 
CREATE TABLE DEPT
       (DEPTNO int(2) not null ,
    DNAME VARCHAR(14) ,
    LOC VARCHAR(13),
    primary key (DEPTNO)
    );
CREATE TABLE EMP
       (EMPNO int(4)  not null ,
    ENAME VARCHAR(10),
    JOB VARCHAR(9),
    MGR INT(4),
    HIREDATE DATE  DEFAULT NULL,
    SAL DOUBLE(7,2),
    COMM DOUBLE(7,2),
    primary key (EMPNO),
    DEPTNO INT(2) 
    )
    ;
 
CREATE TABLE SALGRADE
      ( GRADE INT,
    LOSAL INT,
    HISAL INT );
 
 
 
 
INSERT INTO DEPT ( DEPTNO, DNAME, LOC ) VALUES ( 
10, 'ACCOUNTING', 'NEW YORK'); 
INSERT INTO DEPT ( DEPTNO, DNAME, LOC ) VALUES ( 
20, 'RESEARCH', 'DALLAS'); 
INSERT INTO DEPT ( DEPTNO, DNAME, LOC ) VALUES ( 
30, 'SALES', 'CHICAGO'); 
INSERT INTO DEPT ( DEPTNO, DNAME, LOC ) VALUES ( 
40, 'OPERATIONS', 'BOSTON'); 
commit;
  
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7369, 'SMITH', 'CLERK', 7902,  '1980-12-17'
, 800, NULL, 20); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7499, 'ALLEN', 'SALESMAN', 7698,  '1981-02-20'
, 1600, 300, 30); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7521, 'WARD', 'SALESMAN', 7698,  '1981-02-22'
, 1250, 500, 30); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7566, 'JONES', 'MANAGER', 7839,  '1981-04-02'
, 2975, NULL, 20); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7654, 'MARTIN', 'SALESMAN', 7698,  '1981-09-28'
, 1250, 1400, 30); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7698, 'BLAKE', 'MANAGER', 7839,  '1981-05-01'
, 2850, NULL, 30); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7782, 'CLARK', 'MANAGER', 7839,  '1981-06-09'
, 2450, NULL, 10); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7788, 'SCOTT', 'ANALYST', 7566,  '1987-04-19'
, 3000, NULL, 20); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7839, 'KING', 'PRESIDENT', NULL,  '1981-11-17'
, 5000, NULL, 10); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7844, 'TURNER', 'SALESMAN', 7698,  '1981-09-08'
, 1500, 0, 30); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7876, 'ADAMS', 'CLERK', 7788,  '1987-05-23'
, 1100, NULL, 20); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7900, 'JAMES', 'CLERK', 7698,  '1981-12-03'
, 950, NULL, 30); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7902, 'FORD', 'ANALYST', 7566,  '1981-12-03'
, 3000, NULL, 20); 
INSERT INTO EMP ( EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM,
DEPTNO ) VALUES ( 
7934, 'MILLER', 'CLERK', 7782,  '1982-01-23'
, 1300, NULL, 10); 
commit;
  
INSERT INTO SALGRADE ( GRADE, LOSAL, HISAL ) VALUES ( 
1, 700, 1200); 
INSERT INTO SALGRADE ( GRADE, LOSAL, HISAL ) VALUES ( 
2, 1201, 1400); 
INSERT INTO SALGRADE ( GRADE, LOSAL, HISAL ) VALUES ( 
3, 1401, 2000); 
INSERT INTO SALGRADE ( GRADE, LOSAL, HISAL ) VALUES ( 
4, 2001, 3000); 
INSERT INTO SALGRADE ( GRADE, LOSAL, HISAL ) VALUES ( 
5, 3001, 9999); 
commit;
```

### sql脚本
当一个文件的扩展名是.sql，并且该文件中编写了大量的sql语句，我们称这样的文件为sql脚本。
注意：直接使用source命令可以执行sql脚本。
### 删除数据库
`drop database bjpowernode`
## 查看表结构
先显示所有表：`show tables;`
使用 desc 命令查看表结构：
```sql
mysql> desc EMP;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| EMPNO    | int(4)      | NO   | PRI | NULL    |       |
| ENAME    | varchar(10) | YES  |     | NULL    |       |
| JOB      | varchar(9)  | YES  |     | NULL    |       |
| MGR      | int(4)      | YES  |     | NULL    |       |
| HIREDATE | date        | YES  |     | NULL    |       |
| SAL      | double(7,2) | YES  |     | NULL    |       |
| COMM     | double(7,2) | YES  |     | NULL    |       |
| DEPTNO   | int(2)      | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
8 rows in set (0.00 sec)

mysql> desc DEPT;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| DEPTNO | int(2)      | NO   | PRI | NULL    |       |
| DNAME  | varchar(14) | YES  |     | NULL    |       |
| LOC    | varchar(13) | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
3 rows in set (0.01 sec)

```
查看表中所有数据
`select * from emp;`
`select * from dept;`
## 查看当前使用的数据库
查看当前使用的数据`select database();`
查看使用版本 `select version();`
## 终止语句，退出mysql

- \c 结束一条未执行完成的命令
- exit 退出mysql
## 查看创建表的语句
`show create table emp;`
```sql
mysql> show create table EMP;
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table | Create Table                                                                                                                                                                                                                                                                                                                                          |
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| EMP   | CREATE TABLE `EMP` (
  `EMPNO` int(4) NOT NULL,
  `ENAME` varchar(10) DEFAULT NULL,
  `JOB` varchar(9) DEFAULT NULL,
  `MGR` int(4) DEFAULT NULL,
  `HIREDATE` date DEFAULT NULL,
  `SAL` double(7,2) DEFAULT NULL,
  `COMM` double(7,2) DEFAULT NULL,
  `DEPTNO` int(2) DEFAULT NULL,
  PRIMARY KEY (`EMPNO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 |
+-------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
## 查询语句DQL
### 基础查询
语法格式： **select 字段1,字段2,字段3,... from 表名;**

- sql语句都必须以";"结尾。
- sql不区分大小写
```sql
# 查询员工年薪
select ename, sal *12 as '年薪' from emp;
```
### 条件查询
语法格式： 
**select 字段1,字段2,字段3,... **
**from 表名 **
**where 条件 ;**
执行顺序：先from，然后where，最后执行select查询
```sql
# 查询工资等于5000的员工
select ename,sal from EMP where sal = 5000; 
# 查询工资不等于5000的员工
select ename,sal from EMP where sal <> 5000; 
select ename,sal from EMP where sal != 5000;
# 查询SMITH的工资
select sal from EMP where ename='SMITH';
```
#### 条件查询-区间查询between and
```sql
#查询薪水在1500到5000区间
mysql> select ename, sal from EMP where sal between 1500 and 5000;
+--------+---------+
| ename  | sal     |
+--------+---------+
| ALLEN  | 1600.00 |
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| SCOTT  | 3000.00 |
| KING   | 5000.00 |
| TURNER | 1500.00 |
| FORD   | 3000.00 |
+--------+---------+
8 rows in set (0.01 sec)

#查询字符
mysql> select ename from EMP where ename between 'A' and 'C';
+-------+
| ename |
+-------+
| ALLEN |
| BLAKE |
| ADAMS |
+-------+
3 rows in set (0.00 sec)
```

- between and使用时必须是左小右大，否则查不出数据。
- between and查询数字时，左右都是闭区间
- between and查询字符时，左闭右开区间
#### 条件查询-判断查询is null和is not null
查询字段是null, 数据库中NULL代表什么都没有，为空。不能用=号做判断
```sql
mysql> select ename, comm from EMP where comm is null;
+--------+------+
| ename  | comm |
+--------+------+
| SMITH  | NULL |
| JONES  | NULL |
| BLAKE  | NULL |
| CLARK  | NULL |
| SCOTT  | NULL |
| KING   | NULL |
| ADAMS  | NULL |
| JAMES  | NULL |
| FORD   | NULL |
| MILLER | NULL |
+--------+------+
10 rows in set (0.00 sec)

mysql> select ename, comm from EMP where comm is not null;
+--------+---------+
| ename  | comm    |
+--------+---------+
| ALLEN  |  300.00 |
| WARD   |  500.00 |
| MARTIN | 1400.00 |
| TURNER |    0.00 |
+--------+---------+
4 rows in set (0.00 sec)
```
#### 条件查询-and和or的优先级
```sql
#找出工作岗位是SALESMAN和MANAGER
mysql> select ename,job from EMP where job = 'MANAGER' or job= 'SALESMAN';
+--------+----------+
| ename  | job      |
+--------+----------+
| ALLEN  | SALESMAN |
| WARD   | SALESMAN |
| JONES  | MANAGER  |
| MARTIN | SALESMAN |
| BLAKE  | MANAGER  |
| CLARK  | MANAGER  |
| TURNER | SALESMAN |
+--------+----------+
7 rows in set (0.00 sec)

#and和or联合使用，找出薪资大于1500，并且部门编号是20或30部门的员工;
#and 优先级大于or，可以使用()改变运算优先级
mysql> select ename,sal,deptno from EMP where sal > 1500 and (deptno = 20 or deptno=30);
+-------+---------+--------+
| ename | sal     | deptno |
+-------+---------+--------+
| ALLEN | 1600.00 |     30 |
| JONES | 2975.00 |     20 |
| BLAKE | 2850.00 |     30 |
| SCOTT | 3000.00 |     20 |
| FORD  | 3000.00 |     20 |
+-------+---------+--------+
5 rows in set (0.00 sec)
```
#### 条件查询-in查询
in等同于or, in后边表示具体的值，不是区间。
```sql
#找出工作岗位是SALESMAN和MANAGER
mysql> select ename,job from EMP where job = 'MANAGER' or job= 'SALESMAN';
mysql> select ename,job from EMP where job in('MANAGER', 'SALESMAN');

#找出薪资是1200和3000的
mysql> select ename,job,sal from EMP where sal in(1200, 3000);
+-------+---------+---------+
| ename | job     | sal     |
+-------+---------+---------+
| SCOTT | ANALYST | 3000.00 |
| FORD  | ANALYST | 3000.00 |
+-------+---------+---------+
2 rows in set (0.00 sec)
```
#### 条件查询-模糊查询
找出名字含有 o 的；在模糊查询中，必须掌握2个特殊符号，
一个%：表示任意多个字符；
一个_ : 表示任意1个字符；
```sql
#找出名字含有 o 的员工；
mysql> select ename from EMP where ename like '%O%';
+-------+
| ename |
+-------+
| JONES |
| SCOTT |
| FORD  |
+-------+
3 rows in set (0.00 sec)

#找出名字第二个字符是A的员工
mysql> select ename from EMP where ename like '_A%';
+--------+
| ename  |
+--------+
| WARD   |
| MARTIN |
| JAMES  |
+--------+
3 rows in set (0.00 sec)
```
注意：如果需要查询的是特殊字符，比如_、% , 那么就需要使用 \ 做转义；
### 数据排序
默认是升序asc，如果降序使用order by sal desc;
```sql
#按照工资升序，找出员工名和薪资
mysql> select ename,sal from EMP order by sal;
+--------+---------+
| ename  | sal     |
+--------+---------+
| SMITH  |  800.00 |
| JAMES  |  950.00 |
| ADAMS  | 1100.00 |
| WARD   | 1250.00 |
| MARTIN | 1250.00 |
| MILLER | 1300.00 |
| TURNER | 1500.00 |
| ALLEN  | 1600.00 |
| CLARK  | 2450.00 |
| BLAKE  | 2850.00 |
| JONES  | 2975.00 |
| FORD   | 3000.00 |
| SCOTT  | 3000.00 |
| KING   | 5000.00 |
+--------+---------+
14 rows in set (0.01 sec)

select ename,sal from EMP order by sal asc;
select ename,sal from EMP order by sal desc;
```
当一个字段值相同，可以设置多个字段参与排序；排序字段用逗号分开
```sql
#按照工资的降序排，如果相同，则按照名称的升序排
mysql> select ename,sal from EMP order by sal desc, ename asc;
+--------+---------+
| ename  | sal     |
+--------+---------+
| KING   | 5000.00 |
| FORD   | 3000.00 |
| SCOTT  | 3000.00 |
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
| MARTIN | 1250.00 |
| WARD   | 1250.00 |
| ADAMS  | 1100.00 |
| JAMES  |  950.00 |
| SMITH  |  800.00 |
+--------+---------+
14 rows in set (0.12 sec)
```
```sql
#找出工作岗位是SALESMAN的员工，并且要求按照薪资降序排列
mysql> select ename, sal, job from EMP where job='SALESMAN' order by sal desc;
+--------+---------+----------+
| ename  | sal     | job      |
+--------+---------+----------+
| ALLEN  | 1600.00 | SALESMAN |
| TURNER | 1500.00 | SALESMAN |
| WARD   | 1250.00 | SALESMAN |
| MARTIN | 1250.00 | SALESMAN |
+--------+---------+----------+
4 rows in set (0.01 sec)
```
DQL语句执行顺序：
select            ------  3
 _ field_
from              ------  1
 _ tableName_
where            ------  2
 _condition_
order by        ------  4
  ....
**order by是最后执行。**
### 分组函数

- count：计数
- sum：求和
- avg：求平均值
- max：最大值
- min：最小值

所有的分组函数都是对“一组”数据进行操作。
```sql
#找出工资总和
select sum(sal) from EMP;
#找出最高工资
select max(sal) from EMP;
#找出最低工资
select min(sal) from EMP;
#算出平均工资
select avg(sal) from EMP;
#找出总人数
select count(ename) from EMP;
```

- 分组函数会自动忽略NULL;
- 分组函数不能直接放在where子句中。【错误：select ename, sal from EMP where sal > avg(sal);】

**count(*)和count(comm)的区别？**

- count(*)表示所有数据条数据，和字段无关；
- count(具体字段)，查询出某个字段中不为NULL的数据个数；

**查询工资高于平均工资的员工，需要使用到子查询；**
分组函数不能直接使用在where中，因为group by是在where执行之后才执行的。
分2步骤进行查询
第一步：查询平均工资
   select avg(sal) from EMP;
第二步：找出大于平均工资的员工
 select ename, sal from EMP where sal > (select avg(sal) from EMP);
```sql
#找出工资大于平均工资的员工，使用子查询
mysql>  select ename, sal from EMP where sal > (select avg(sal) from EMP);
+-------+---------+
| ename | sal     |
+-------+---------+
| JONES | 2975.00 |
| BLAKE | 2850.00 |
| CLARK | 2450.00 |
| SCOTT | 3000.00 |
| KING  | 5000.00 |
| FORD  | 3000.00 |
+-------+---------+
6 rows in set (0.03 sec)
```
### 单行处理函数
单行处理函数，输入一行就输出一行；
计算每个员工的年薪；
```sql
mysql> select ename, (sal+comm)*12 as yearsal from EMP;
+--------+----------+
| ename  | yearsal  |
+--------+----------+
| SMITH  |     NULL |
| ALLEN  | 22800.00 |
| WARD   | 21000.00 |
| JONES  |     NULL |
| MARTIN | 31800.00 |
| BLAKE  |     NULL |
| CLARK  |     NULL |
| SCOTT  |     NULL |
| KING   |     NULL |
| TURNER | 18000.00 |
| ADAMS  |     NULL |
| JAMES  |     NULL |
| FORD   |     NULL |
| MILLER |     NULL |
+--------+----------+
14 rows in set (0.00 sec)
```
#### 使用ifnull() 空处理函数，进行判断；
```sql
#使用ifnull() 空处理函数，先进行NULL判断处理；
mysql> select ename, (sal + ifnull(comm, 0))*12 as yearsal from EMP;
+--------+----------+
| ename  | yearsal  |
+--------+----------+
| SMITH  |  9600.00 |
| ALLEN  | 22800.00 |
| WARD   | 21000.00 |
| JONES  | 35700.00 |
| MARTIN | 31800.00 |
| BLAKE  | 34200.00 |
| CLARK  | 29400.00 |
| SCOTT  | 36000.00 |
| KING   | 60000.00 |
| TURNER | 18000.00 |
| ADAMS  | 13200.00 |
| JAMES  | 11400.00 |
| FORD   | 36000.00 |
| MILLER | 15600.00 |
+--------+----------+
14 rows in set (0.00 sec)
```
### 分组查询 group by和having

- group by：按照某个字段或者某些字段进行分组
- having： 对分组之后的数据进行再次过滤
```sql
#按照工作岗位进行分组,并显示该岗位的最大薪资
mysql> select job,max(sal) from EMP group by job;
+-----------+----------+
| job       | max(sal) |
+-----------+----------+
| ANALYST   |  3000.00 |
| CLERK     |  1300.00 |
| MANAGER   |  2975.00 |
| PRESIDENT |  5000.00 |
| SALESMAN  |  1600.00 |
+-----------+----------+
5 rows in set (0.00 sec)
```
⚠️：分组函数一般需要和group by 联合使用。任何一个分组函数都是在group by语句执行结束之后才执行的。
当一条sql语句没有group by时，是把整张表的数据组成了一组。
当一条语句中**有group by时，select 后面只能跟分组函数和参与分组的字段【非常重要】。**
### 多字段分组查询
多个字段联合起来一起分组
```sql
#找出每个部门不同工作岗位的最高薪资
mysql> select deptno,job,max(sal) from EMP group by deptno,job;
+--------+-----------+----------+
| deptno | job       | max(sal) |
+--------+-----------+----------+
|     10 | CLERK     |  1300.00 |
|     10 | MANAGER   |  2450.00 |
|     10 | PRESIDENT |  5000.00 |
|     20 | ANALYST   |  3000.00 |
|     20 | CLERK     |  1100.00 |
|     20 | MANAGER   |  2975.00 |
|     30 | CLERK     |   950.00 |
|     30 | MANAGER   |  2850.00 |
|     30 | SALESMAN  |  1600.00 |
+--------+-----------+----------+
9 rows in set (0.00 sec)
```
可以把多个字段联合起来进行分组。
### having和where的选择

- where用于过滤行数据
- having用于过滤分组数据，使用了分组函数计算处理的数据
- where在数据分组前过滤，having在数据分组后过滤
- where查询条件后不可使用字段别名，having可以使用字段别名的数据
```sql
#找出每个部门最高薪资，要求显示薪资大于2900的数据
mysql> select max(sal),deptno from EMP where sal >2900 group by deptno;
+----------+--------+
| max(sal) | deptno |
+----------+--------+
|  5000.00 |     10 |
|  3000.00 |     20 |
+----------+--------+
2 rows in set (0.00 sec)
```
```sql
#找出每个部门平均薪资，要求显示薪资大于2000的数据
# 第一步先找出每个部门平均薪资
select deptno,avg(sal) from EMP group by deptno;

#第二步 要求显示薪资大于2000的数据
mysql> select deptno,avg(sal) from EMP group by deptno having avg(sal) >2000;
+--------+-------------+
| deptno | avg(sal)    |
+--------+-------------+
|     10 | 2916.666667 |
|     20 | 2175.000000 |
+--------+-------------+
2 rows in set (0.00 sec)
```
总结：如果没有使用到分组函数，并且可以先进行数据过滤的，那么就是where，这样会提高效率。当使用的 分组函数时就无法使用where，这时必须使用having。having和group by配合使用，分组函数一般也配合group by使用。
## DQL语句执行顺序
select      ------ 5
 ..
from        ------ 1
 ..
where        ------ 2
..
group by        ------ 3
..
having       ------ 4
..
order by        ------ 6
..

[课程视频地址](https://www.bilibili.com/video/BV1fx411X7BD)


卸载时注意：需要同步删除 Program Files\MySQL 和 ProgramData\MySQL（隐藏文件，需要打开系统设置）中的数据。
