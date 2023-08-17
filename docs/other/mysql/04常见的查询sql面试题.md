---
title: 04常见的查询sql面试题
date: 2022-10-23 20:09:55
permalink: /pages/630559/
author: 
  name: 北鸟南游
  link: https://shenshuai89.github.io/
---

### 1.获取每个部门最高薪水的员工
```sql
第一步：
 按照部门分组，获取到每个部门的最高薪水
select deptno, max(sal) as maxsal from EMP group by deptno;
+--------+---------+
| deptno | maxsal  |
+--------+---------+
|     20 | 3000.00 |
|     30 | 2850.00 |
|     10 | 5000.00 |
+--------+---------+
第二步：
 将上面查出来的最高薪水和部门数据当作一张临时表。
select e.ename, t.* 
from EMP e
join (select deptno, max(sal) as maxsal from EMP group by deptno) t
on e.deptno = t.deptno and e.sal = t.maxsal;
+-------+--------+---------+
| ename | deptno | maxsal  |
+-------+--------+---------+
| SCOTT |     20 | 3000.00 |
| FORD  |     20 | 3000.00 |
| BLAKE |     30 | 2850.00 |
| KING  |     10 | 5000.00 |
+-------+--------+---------+
```
### 2.哪些员工薪水在所在部门平均薪水之上
```sql
第一步：
 算出部门的平均薪水
select deptno, avg(sal) as avgsal from EMP group by deptno;
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
第二步：
 把上面数据当做临时表，查询员工薪水大于 avgsal 值的数据，并且deptno相同
select e.ename, e.sal, t.* from EMP e
join (select deptno, avg(sal) as avgsal from EMP group by deptno) t
on e.deptno = t.deptno and e.sal > t.avgsal;
+-------+---------+--------+-------------+
| ename | sal     | deptno | avgsal      |
+-------+---------+--------+-------------+
| ALLEN | 1600.00 |     30 | 1566.666667 |
| JONES | 2975.00 |     20 | 2175.000000 |
| BLAKE | 2850.00 |     30 | 1566.666667 |
| SCOTT | 3000.00 |     20 | 2175.000000 |
| KING  | 5000.00 |     10 | 2916.666667 |
| FORD  | 3000.00 |     20 | 2175.000000 |
+-------+---------+--------+-------------+
```
### 3.取得部门中所有员工平均的 薪水等级。
```sql
第一步
 先求出每个员工的薪水等级
select e.ename, e.sal, e.deptno, s.grade 
from EMP e 
join
SALGRADE s
on e.sal between s.losal and s.hisal;
+--------+---------+--------+-------+
| ename  | sal     | deptno | grade |
+--------+---------+--------+-------+
| SMITH  |  800.00 |     20 |     1 |
| JAMES  |  950.00 |     30 |     1 |
| ADAMS  | 1100.00 |     20 |     1 |
| WARD   | 1250.00 |     30 |     2 |
| MARTIN | 1250.00 |     30 |     2 |
| MILLER | 1300.00 |     10 |     2 |
| TURNER | 1500.00 |     30 |     3 |
| ALLEN  | 1600.00 |     30 |     3 |
| CLARK  | 2450.00 |     10 |     4 |
| BLAKE  | 2850.00 |     30 |     4 |
| JONES  | 2975.00 |     20 |     4 |
| SCOTT  | 3000.00 |     20 |     4 |
| FORD   | 3000.00 |     20 |     4 |
| KING   | 5000.00 |     10 |     5 |
+--------+---------+--------+-------+
第二步：
 按照部门分组，计算等级的平均值
select e.deptno, avg(grade)
from EMP e
join SALGRADE s
on e.sal between s.losal and s.hisal
group by e.deptno;
+--------+------------+
| deptno | avg(grade) |
+--------+------------+
|     20 |     2.8000 |
|     30 |     2.5000 |
|     10 |     3.6667 |
+--------+------------+
```
### 4.不使用max，取得最高薪水
```sql
第一种方式：sal降序排序，使用limit取第一个
select ename, sal from EMP order by sal desc limit 1;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
+-------+---------+

第二种：使用表的自连接
 首先自连接查出所有符合条件的数据 [查出了除5000不满足条件的所有数据]
select distinct a.sal from EMP a join EMP b on a.sal < b.sal;
+---------+
| sal     |
+---------+
|  800.00 |
|  950.00 |
| 1100.00 |
| 1250.00 |
| 1300.00 |
| 1500.00 |
| 1600.00 |
| 2450.00 |
| 2850.00 |
| 2975.00 |
| 3000.00 |
+---------+
 然后 使用 not in查询除最高的薪水
select sal,ename from EMP where sal not in (select distinct a.sal from EMP a join EMP b on a.sal < b.sal);
+---------+-------+
| sal     | ename |
+---------+-------+
| 5000.00 | KING  |
+---------+-------+
```
### 5.找出部门平均薪水最大值的部门
```sql
第一种方法：求出部门平均薪水，然后将平均薪水降序排列，取得第一个值
select deptno, avg(sal) as avgsal from EMP group by deptno order by avgsal desc limit 1;
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     10 | 2916.666667 |
+--------+-------------+

第二种方法：使用max取部门平均薪水最大值
select max(t.avgsal) from (select avg(sal) as avgsal from EMP group by deptno) t;
+---------------+
| max(t.avgsal) |
+---------------+
|   2916.666667 |
+---------------+

然后在进行having 过滤出最大值相同是的部门
select deptno, avg(sal) as avgsal 
from EMP 
group by deptno
having avgsal = (select max(t.avgsal) from (select avg(sal) as avgsal from EMP group by deptno) t);
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     10 | 2916.666667 |
+--------+-------------+

```
### 6.取出平均薪水最高的部门名称
```sql
第一种方法：求出部门平均薪水，然后将平均薪水降序排列，取得第一个值
select d.dname, avg(e.sal) as avgsal 
from EMP e
join DEPT d
on e.deptno = d.deptno
group by d.dname 
order by avgsal desc 
limit 1;
+------------+-------------+
| dname      | avgsal      |
+------------+-------------+
| ACCOUNTING | 2916.666667 |
+------------+-------------+

第二种方式：
第一步按照部门分组，获取平均薪水
select deptno, avg(sal) as avgsal from EMP group by deptno;
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
第二步：把上面结果当作临时表，找出平均薪水最大值
select max(t.avgsal) from (select avg(sal) as avgsal from EMP group by deptno) t;
+---------------+
| max(t.avgsal) |
+---------------+
|   2916.666667 |
+---------------+
第三步：根据上面求的最大值进行having过滤
select deptno, avg(sal) as avgsal
from EMP
group by deptno
having avgsal = (select max(t.avgsal) from (select avg(sal) as avgsal from EMP group by deptno) t);
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     10 | 2916.666667 |
+--------+-------------+
第四步，和DEPT表做关联查询
select d.dname, x.avgsal
from DEPT d
join (select deptno, avg(sal) as avgsal
	from EMP
	group by deptno
	having avgsal = (select max(t.avgsal) from (select avg(sal) as avgsal from EMP group by deptno) t)) x
on d.deptno = x.deptno;
+------------+-------------+
| dname      | avgsal      |
+------------+-------------+
| ACCOUNTING | 2916.666667 |
+------------+-------------+
```
### 7.求出平均薪水的等级 最低的部门编码。
```sql
第一步找出每个部门的平均薪水 的等级
select deptno, avg(sal) as avgsal from EMP group by deptno;
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
第二步和salgrade表关联
select s.grade, t.* 
from SALGRADE s 
join (select deptno, avg(sal) as avgsal from EMP group by deptno) t
on t.avgsal between s.losal and s.hisal;
+-------+--------+-------------+
| grade | deptno | avgsal      |
+-------+--------+-------------+
|     4 |     20 | 2175.000000 |
|     3 |     30 | 1566.666667 |
|     4 |     10 | 2916.666667 |
+-------+--------+-------------+
第三步：求grade的最小值
select min(x.grade) from (select s.grade, t.* 
  from SALGRADE s 
  join (select deptno, avg(sal) as avgsal from EMP group by deptno) t
  on t.avgsal between s.losal and s.hisal) x;
+--------------+
| min(x.grade) |
+--------------+
|            3 |
+--------------+
【也可按照grade进行升序排序，取第一个】
select x.grade, x.deptno from (select s.grade, t.* 
  from SALGRADE s 
  join (select deptno, avg(sal) as avgsal from EMP group by deptno) t
  on t.avgsal between s.losal and s.hisal) x
order by x.grade
limit 1;
+-------+--------+
| grade | deptno |
+-------+--------+
|     3 |     30 |
+-------+--------+


第四步：根据最小结果进行关联表查询
select y.deptno, y.grade 
from (select s.grade, t.* 
  from SALGRADE s 
  join (select deptno, avg(sal) as avgsal from EMP group by deptno) t
  on t.avgsal between s.losal and s.hisal) y
where y.grade = (select min(x.grade) from (select s.grade, t.* 
  from SALGRADE s 
  join (select deptno, avg(sal) as avgsal from EMP group by deptno) t
  on t.avgsal between s.losal and s.hisal) x);
+--------+-------+
| deptno | grade |
+--------+-------+
|     30 |     3 |
+--------+-------+
```
### 8.找出比普通员工【员工编号empno不在mgr字段出现】最高薪水还高的所有员工
```sql
第一步找出所有的mgr字段，需要排除掉NULL
select distinct mgr from EMP where mgr is not NULL;
+------+
| mgr  |
+------+
| 7902 |
| 7698 |
| 7839 |
| 7566 |
| 7788 |
| 7782 |
+------+
第二步： 求出empno不在上面mgr中的最高薪水
select max(sal) from EMP where empno not in (select distinct mgr from EMP where mgr is not NULL);
+----------+
| max(sal) |
+----------+
|  1600.00 |
+----------+
第三步：求出薪水高于上面最高薪水的所有员工
select ename, sal from EMP where sal > (select max(sal) 
	from EMP 
  where empno not in (select distinct mgr from EMP where mgr is not NULL));

+-------+---------+
| ename | sal     |
+-------+---------+
| CLARK | 2450.00 |
| BLAKE | 2850.00 |
| JONES | 2975.00 |
| SCOTT | 3000.00 |
| FORD  | 3000.00 |
| KING  | 5000.00 |
+-------+---------+
```
### 9.取出薪水最高的前5名员工
```sql
将薪水降序排列，取前5个
select ename, sal from EMP order by sal desc limit 5;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
| FORD  | 3000.00 |
| SCOTT | 3000.00 |
| JONES | 2975.00 |
| BLAKE | 2850.00 |
+-------+---------+
```
### 10.取出薪水最高的第6到第10
```sql
select ename, sal from EMP order by sal desc limit 5,5;
+--------+---------+
| ename  | sal     |
+--------+---------+
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
| WARD   | 1250.00 |
+--------+---------+
```
### 11.取出最后入职的5名员工
日期也可排序
```sql
select ename, HIREDATE from EMP order by hiredate desc limit 5;
+--------+------------+
| ename  | HIREDATE   |
+--------+------------+
| ADAMS  | 1987-05-23 |
| SCOTT  | 1987-04-19 |
| MILLER | 1982-01-23 |
| JAMES  | 1981-12-03 |
| FORD   | 1981-12-03 |
+--------+------------+
```
### 12.取出每个薪水等级有多少员工
```sql
第一步：算出员工薪水等级
select e.ename, e.sal, s.grade 
from EMP e  
join SALGRADE s
on e.sal between s.losal and s.hisal;
+--------+---------+-------+
| ename  | sal     | grade |
+--------+---------+-------+
| SMITH  |  800.00 |     1 |
| JAMES  |  950.00 |     1 |
| ADAMS  | 1100.00 |     1 |
| WARD   | 1250.00 |     2 |
| MARTIN | 1250.00 |     2 |
| MILLER | 1300.00 |     2 |
| TURNER | 1500.00 |     3 |
| ALLEN  | 1600.00 |     3 |
| CLARK  | 2450.00 |     4 |
| BLAKE  | 2850.00 |     4 |
| JONES  | 2975.00 |     4 |
| SCOTT  | 3000.00 |     4 |
| FORD   | 3000.00 |     4 |
| KING   | 5000.00 |     5 |
+--------+---------+-------+
第二步：按照薪水等级grade分组，并统计数量count
select s.grade, count(*)
from EMP e  
join SALGRADE s
on e.sal between s.losal and s.hisal
group by s.grade;
+-------+----------+
| grade | count(*) |
+-------+----------+
|     1 |        3 |
|     2 |        3 |
|     3 |        2 |
|     4 |        5 |
|     5 |        1 |
+-------+----------+
```
### 13.面试题，表设计编程
有 3 个表 s学生表 c 课程表 sc学生选课表
s(sno, sname) 代表 学号、学生姓名
c（cno、cname、cteacher）代表（课号、课名、老师）
sc（sno、cno、scgrade）代表 学号、课号、成绩
问题：

1. 找出没有选过 “刘德华” 老师的所有学生的姓名
2. 列出 2门以上（包含2门）不及格学生姓名及平均成绩
3. 即学过 1号课程 又学过 2号课程的所有学生的姓名
### 14.列出所有员工及领导的姓名
```sql
使用左外连接，自连接表查询
select a.ename as '员工', b.ename as '领导'
from EMP a
left join EMP b
on a.mgr = b.empno;
+--------+--------+
| 员工    | 领导   |
+--------+--------+
| SMITH  | FORD   |
| ALLEN  | BLAKE  |
| WARD   | BLAKE  |
| JONES  | KING   |
| MARTIN | BLAKE  |
| BLAKE  | KING   |
| CLARK  | KING   |
| SCOTT  | JONES  |
| KING   | NULL   |
| TURNER | BLAKE  |
| ADAMS  | SCOTT  |
| JAMES  | BLAKE  |
| FORD   | JONES  |
| MILLER | CLARK  |
+--------+--------+
```
### 15.列出入职日期早于直接上级的所有员工的编号、姓名、部门名称
```sql
表的自连接
emp a 员工表
emp b 领导表
条件 a.mgr = b.empno and a.hiredate < b.hiredate
select a.ename as '员工', a.hiredate '员工入职日期', b.ename as '领导', b.hiredate  '领导入职日期', d.dname
from EMP a
join EMP b
on a.mgr = b.empno and a.hiredate < b.hiredate
join DEPT d
on a.deptno = d.deptno;
```
### 16.列出部门名称，和部门下员工的所有信息
```sql
select e.*, d.dname
from  EMP e
right join DEPT d
on e.deptno = d.deptno;
+-------+--------+-----------+------+------------+---------+---------+--------+------------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO | dname      |
+-------+--------+-----------+------+------------+---------+---------+--------+------------+
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 | RESEARCH   |
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 | SALES      |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 | SALES      |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 | RESEARCH   |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 | SALES      |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 | SALES      |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 | ACCOUNTING |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 | RESEARCH   |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 | ACCOUNTING |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 | SALES      |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 | RESEARCH   |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 | SALES      |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 | RESEARCH   |
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 | ACCOUNTING |
|  NULL | NULL   | NULL      | NULL | NULL       |    NULL |    NULL |   NULL | OPERATIONS |
+-------+--------+-----------+------+------------+---------+---------+--------+------------+
```
### 17.列出部门中至少有5名员工的部门
```sql
按照部门编号分组group计数count, 过滤出数量大于5
select deptno from EMP group by deptno having count(*) >= 5;
+--------+
| deptno |
+--------+
|     20 |
|     30 |
+--------+
select d.deptno, d.dname
from DEPT d
join (select deptno from EMP group by deptno having count(*) >= 5) t
on d.deptno = t.deptno;
+--------+----------+
| deptno | dname    |
+--------+----------+
|     20 | RESEARCH |
|     30 | SALES    |
+--------+----------+
```
### 18.列出薪资比 SMITH 高的所有员工名称
```sql
select sal from EMP where ename = 'SMITH';
select ename, sal from EMP where sal > (select sal from EMP where ename = 'SMITH');
+--------+---------+
| ename  | sal     |
+--------+---------+
| ALLEN  | 1600.00 |
| WARD   | 1250.00 |
| JONES  | 2975.00 |
| MARTIN | 1250.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| SCOTT  | 3000.00 |
| KING   | 5000.00 |
| TURNER | 1500.00 |
| ADAMS  | 1100.00 |
| JAMES  |  950.00 |
| FORD   | 3000.00 |
| MILLER | 1300.00 |
+--------+---------+
```
### 19.查询出工作是‘CLERK’的员工姓名、部门名称及所在部门的人数
```sql
第一步：获取员工、部门编号, 部门名称需要使用表连接查询
select ename, deptno from EMP where job = 'CLERK';
+--------+--------+
| ename  | deptno |
+--------+--------+
| SMITH  |     20 |
| ADAMS  |     20 |
| JAMES  |     30 |
| MILLER |     10 |
+--------+--------+
第二步：部门名称需要使用表连接查询
select e.ename, e.deptno, d.dname 
from EMP e
join DEPT d
on e.deptno = d.deptno
where job = 'CLERK';
+--------+--------+------------+
| ename  | deptno | dname      |
+--------+--------+------------+
| SMITH  |     20 | RESEARCH   |
| ADAMS  |     20 | RESEARCH   |
| JAMES  |     30 | SALES      |
| MILLER |     10 | ACCOUNTING |
+--------+--------+------------+
第三步：按照部门进行分组，统计人数
select deptno, count(*) from EMP group by deptno;
+--------+----------+
| deptno | count(*) |
+--------+----------+
|     20 |        5 |
|     30 |        6 |
|     10 |        3 |
+--------+----------+
第四步：将第二步和第三步的表做连接查询
select a.*, b.deptcount 
from (select e.ename, e.deptno, d.dname 
  from EMP e
  join DEPT d
  on e.deptno = d.deptno
  where job = 'CLERK') a
join (select deptno, count(*) as deptcount from EMP group by deptno) b
on a.deptno = b.deptno;
+--------+--------+------------+-----------+
| ename  | deptno | dname      | deptcount |
+--------+--------+------------+-----------+
| SMITH  |     20 | RESEARCH   |         5 |
| ADAMS  |     20 | RESEARCH   |         5 |
| JAMES  |     30 | SALES      |         6 |
| MILLER |     10 | ACCOUNTING |         3 |
+--------+--------+------------+-----------+
```
###  20.列出最低薪资大于1500的各种工作，及从事此工作的人数
```sql
按照工作岗位进行分组，求sal最小值，要大于1500
select job, count(*) from EMP group by job having min(sal) > 1500;
+-----------+
| job       |
+-----------+
| MANAGER   |
| ANALYST   |
| PRESIDENT |
+-----------+
```
### 21.列出部门为SALES的员工姓名
```sql
第一步从DEPT表中查出SALES的部门编号
select deptno from DEPT where dname = 'SALES';
第二步：查询部门编号为上面数据的员工姓名
select ename from EMP where deptno = (select deptno from DEPT where dname = 'SALES');

+--------+
| ename  |
+--------+
| ALLEN  |
| WARD   |
| MARTIN |
| BLAKE  |
| TURNER |
| JAMES  |
+--------+
```
### 22.列出薪资高于公司平均薪资的所有员工，所在部门、上级领导，和员工的薪资等级
```sql
第一步：公司的平均薪资
select avg(sal) as avgsal from EMP;
+-------------+
| avgsal      |
+-------------+
| 2073.214286 |
+-------------+
第二步：表连接查询出需要的字段信息
select e.ename '员工', d.dname, l.ename '领导', s.grade
from EMP e
join DEPT d
on e.deptno = d.deptno
left join EMP l
on e.mgr = l.empno
join SALGRADE s
on e.sal between s.losal and s.hisal
where e.sal > (select avg(sal) as avgsal from EMP);
+--------+------------+--------+-------+
| 员工   | dname      | 领导   | grade |
+--------+------------+--------+-------+
| CLARK  | ACCOUNTING | KING   |     4 |
| BLAKE  | SALES      | KING   |     4 |
| JONES  | RESEARCH   | KING   |     4 |
| SCOTT  | RESEARCH   | JONES  |     4 |
| FORD   | RESEARCH   | JONES  |     4 |
| KING   | ACCOUNTING | NULL   |     5 |
+--------+------------+--------+-------+
```
### 23.列出和SCOTT从事相同工作的所有员工及部门
```sql
select job from EMP where ename = 'SCOTT';
+---------+
| job     |
+---------+
| ANALYST |
+---------+

select ename,deptno from EMP where job = (select job from EMP where ename = 'SCOTT') and ename!='SCOTT';
+-------+--------+
| ename | deptno |
+-------+--------+
| FORD  |     20 |
+-------+--------+

select e.ename, d.dname 
from (select ename,deptno from EMP where job = (select job from EMP where ename = 'SCOTT') and ename!='SCOTT') e
join DEPT d
on e.deptno = d.deptno;

+-------+----------+
| ename | dname    |
+-------+----------+
| FORD  | RESEARCH |
+-------+----------+

```
### 24.列出薪资等于部门编号30中员工薪资的其他员工的姓名和薪资
```sql
第一步算出部门30的薪资
select distinct sal from EMP where deptno = 30;
+---------+
| sal     |
+---------+
|  950.00 |
| 1250.00 |
| 1500.00 |
| 1600.00 |
| 2850.00 |
+---------+
第二步：找出薪资在上面数据范围的，并且部门不在30的员工
select ename, sal from EMP 
where sal in (select distinct sal from EMP where deptno = 30) 
and deptno != 30;
Empty set (0.01 sec)
```
### 25.列出薪资高于部门编号30中员工薪资的其他员工的姓名和薪资
```sql
第一步算出部门30的薪资
select distinct sal from EMP where deptno = 30;
+---------+
| sal     |
+---------+
|  950.00 |
| 1250.00 |
| 1500.00 |
| 1600.00 |
| 2850.00 |
+---------+
select max(sal) from EMP where deptno =30;

select ename, sal from EMP where sal > (select max(sal) from EMP where deptno =30);
+-------+---------+
| ename | sal     |
+-------+---------+
| JONES | 2975.00 |
| SCOTT | 3000.00 |
| FORD  | 3000.00 |
| KING  | 5000.00 |
+-------+---------+
```
### 26.列出每个部门员工人数、平均薪资、平均服务年限
```sql
select deptno,count(*),avg(sal) from EMP group by deptno; 
这个查询漏掉了部门人数为空的部门，部门编号40，需要使用外连接，把部门表当作主表
+--------+----------+-------------+
| deptno | count(*) | avg(sal)    |
+--------+----------+-------------+
|     20 |        5 | 2175.000000 |
|     30 |        6 | 1566.666667 |
|     10 |        3 | 2916.666667 |
+--------+----------+-------------+

# 使用外连接，把部门表作为主表
select d.*, count(e.ename) '部门人数', ifnull(avg(e.sal), 0) '平均工资'
from EMP e
right join DEPT d
on e.deptno = d.deptno
group by d.dname, d.loc, d.deptno;
+--------+------------+----------+--------------+--------------+
| DEPTNO | DNAME      | LOC      | 部门人数     | 平均工资     |
+--------+------------+----------+--------------+--------------+
|     20 | RESEARCH   | DALLAS   |            5 |  2175.000000 |
|     30 | SALES      | CHICAGO  |            6 |  1566.666667 |
|     10 | ACCOUNTING | NEW YORK |            3 |  2916.666667 |
|     40 | OPERATIONS | BOSTON   |            0 |     0.000000 |
+--------+------------+----------+--------------+--------------+

select timestampdiff(YEAR, hiredate, now()) from EMP;
+--------------------------------------+
| timestampdiff(YEAR, hiredate, now()) |
+--------------------------------------+
|                                   41 |
|                                   41 |
|                                   41 |
|                                   41 |
|                                   41 |
|                                   41 |
|                                   41 |
|                                   35 |
|                                   40 |
|                                   41 |
|                                   35 |
|                                   40 |
|                                   40 |
|                                   40 |
+--------------------------------------+

select d.dname, count(e.ename) '部门人数', 
	ifnull(avg(e.sal), 0) '平均工资', 
	ifnull(avg(timestampdiff(YEAR, e.hiredate, now())), 0) '平均服务年限'
from EMP e
right join DEPT d
on e.deptno = d.deptno
group by d.dname;
+------------+--------------+--------------+--------------------+
| dname      | 部门人数     | 平均工资     | 平均服务年限       |
+------------+--------------+--------------+--------------------+
| RESEARCH   |            5 |  2175.000000 |            38.4000 |
| SALES      |            6 |  1566.666667 |            40.8333 |
| ACCOUNTING |            3 |  2916.666667 |            40.3333 |
| OPERATIONS |            0 |     0.000000 |             0.0000 |
+------------+--------------+--------------+--------------------+

```
使用timestampdiff(间隔类型, DATE1, DATE2)计算出间隔时间长段;
间隔类型可以：YEAR 年、DAY 天、MONTH 月、QUARTER 季度、WEEK 星期、 HOUR 小时｜MINUTE分钟
SECOND 秒。
`select timestampdiff(YEAR, hiredate, now()) from EMP;`
### 27.列出员工的姓名、部门名称、薪资
```sql
select e.ename, e.sal, d.dname
from EMP e
join DEPT d
on e.deptno = d.deptno;
+--------+---------+------------+
| ename  | sal     | dname      |
+--------+---------+------------+
| SMITH  |  800.00 | RESEARCH   |
| ALLEN  | 1600.00 | SALES      |
| WARD   | 1250.00 | SALES      |
| JONES  | 2975.00 | RESEARCH   |
| MARTIN | 1250.00 | SALES      |
| BLAKE  | 2850.00 | SALES      |
| CLARK  | 2450.00 | ACCOUNTING |
| SCOTT  | 3000.00 | RESEARCH   |
| KING   | 5000.00 | ACCOUNTING |
| TURNER | 1500.00 | SALES      |
| ADAMS  | 1100.00 | RESEARCH   |
| JAMES  |  950.00 | SALES      |
| FORD   | 3000.00 | RESEARCH   |
| MILLER | 1300.00 | ACCOUNTING |
+--------+---------+------------+
```
### 28.列出所有部门的详细信息和人数
```sql
select d.*, count(e.deptno)
from DEPT d
left join EMP e
on d.deptno = e.deptno
group by d.deptno;
+--------+------------+----------+-----------------+
| DEPTNO | DNAME      | LOC      | count(e.deptno) |
+--------+------------+----------+-----------------+
|     20 | RESEARCH   | DALLAS   |               5 |
|     30 | SALES      | CHICAGO  |               6 |
|     10 | ACCOUNTING | NEW YORK |               3 |
|     40 | OPERATIONS | BOSTON   |               0 |
+--------+------------+----------+-----------------+
```
### 29.列出各种工作的最低薪资，和从事该工作的员工姓名
```sql
select min(sal),job from EMP group by job;
+----------+-----------+
| min(sal) | job       |
+----------+-----------+
|   800.00 | CLERK     |
|  1250.00 | SALESMAN  |
|  2450.00 | MANAGER   |
|  3000.00 | ANALYST   |
|  5000.00 | PRESIDENT |
+----------+-----------+

select e.ename, t.* from EMP e
join (select min(sal) as minsal,job from EMP group by job) t
on t.minsal = e.sal and t.job = e.job;
+--------+---------+-----------+
| ename  | minsal  | job       |
+--------+---------+-----------+
| SMITH  |  800.00 | CLERK     |
| WARD   | 1250.00 | SALESMAN  |
| MARTIN | 1250.00 | SALESMAN  |
| CLARK  | 2450.00 | MANAGER   |
| SCOTT  | 3000.00 | ANALYST   |
| FORD   | 3000.00 | ANALYST   |
| KING   | 5000.00 | PRESIDENT |
+--------+---------+-----------+
```

### 30.列出每个部门领导MANAGER的最低薪资
```sql
select deptno, min(sal) as minsal
from EMP
where job = 'MANAGER'
group by deptno;
+--------+---------+
| deptno | minsal  |
+--------+---------+
|     20 | 2975.00 |
|     30 | 2850.00 |
|     10 | 2450.00 |
+--------+---------+

select e.ename,e.job, t.* 
from EMP e
join (select deptno, min(sal) as minsal
  from EMP
  where job = 'MANAGER'
  group by deptno) t
on e.sal = t.minsal and e.deptno = t.deptno;
+-------+---------+--------+---------+
| ename | job     | deptno | minsal  |
+-------+---------+--------+---------+
| JONES | MANAGER |     20 | 2975.00 |
| BLAKE | MANAGER |     30 | 2850.00 |
| CLARK | MANAGER |     10 | 2450.00 |
+-------+---------+--------+---------+
```
### 31.列出所有员工的年工资，按照年薪升序排序asc
```sql
#默认排序就是升序asc，如果使用降序desc
select ename, (sal+ifnull(comm, 0)) * 12 as yearsal
from EMP e
order by yearsal asc;
```
### 32.算出员工领导的薪水超过2900的员工 和 其领导
```sql
select a.ename as '员工',a.sal as '员工薪水', b.ename as '领导', b.sal as '领导薪水'
from EMP a
left join EMP b
on a.mgr = b.empno
where b.sal > 2900;
```
### 33.列出部门名称带有 “s” 字母的部门员工的工资合计、部门人数
```sql
select dname,deptno from DEPT where dname like '%S%';
+------------+--------+
| dname      | deptno |
+------------+--------+
| RESEARCH   |     20 |
| SALES      |     30 |
| OPERATIONS |     40 |
+------------+--------+

select d.*, count(e.ename), ifnull(sum(e.sal),0) as '部门员工工资合计'
from EMP e
right join DEPT d
on e.deptno = d.deptno
where d.dname like '%S%'
group by d.deptno;
+--------+------------+---------+----------------+--------------------------+
| DEPTNO | DNAME      | LOC     | count(e.ename) | 部门员工工资合计         |
+--------+------------+---------+----------------+--------------------------+
|     20 | RESEARCH   | DALLAS  |              5 |                 10875.00 |
|     30 | SALES      | CHICAGO |              6 |                  9400.00 |
|     40 | OPERATIONS | BOSTON  |              0 |                     0.00 |
+--------+------------+---------+----------------+--------------------------+
```
### 34.给任职超过39年的员工加薪 50%
```sql
select timestampdiff(YEAR, hiredate, now()) as '年限', ename, sal 
from EMP
having 年限 > 39;
+--------+--------+---------+
| 年限   | ename  | sal     |
+--------+--------+---------+
|     41 | SMITH  |  800.00 |
|     41 | ALLEN  | 1600.00 |
|     41 | WARD   | 1250.00 |
|     41 | JONES  | 2975.00 |
|     41 | MARTIN | 1250.00 |
|     41 | BLAKE  | 2850.00 |
|     41 | CLARK  | 2450.00 |
|     40 | KING   | 5000.00 |
|     41 | TURNER | 1500.00 |
|     40 | JAMES  |  950.00 |
|     40 | FORD   | 3000.00 |
|     40 | MILLER | 1300.00 |
+--------+--------+---------+

create table EMP2 as select * from EMP;
select ename,hiredate,sal from EMP2;
+--------+------------+---------+
| ename  | hiredate   | sal     |
+--------+------------+---------+
| SMITH  | 1980-12-17 |  800.00 |
| ALLEN  | 1981-02-20 | 1600.00 |
| WARD   | 1981-02-22 | 1250.00 |
| JONES  | 1981-04-02 | 2975.00 |
| MARTIN | 1981-09-28 | 1250.00 |
| BLAKE  | 1981-05-01 | 2850.00 |
| CLARK  | 1981-06-09 | 2450.00 |
| SCOTT  | 1987-04-19 | 3000.00 |
| KING   | 1981-11-17 | 5000.00 |
| TURNER | 1981-09-08 | 1500.00 |
| ADAMS  | 1987-05-23 | 1100.00 |
| JAMES  | 1981-12-03 |  950.00 |
| FORD   | 1981-12-03 | 3000.00 |
| MILLER | 1982-01-23 | 1300.00 |
+--------+------------+---------+

更新数据
update EMP2 set sal = sal*1.5 where timestampdiff(YEAR, hiredate, now()) > 39;
select ename,hiredate,sal from EMP2;
+--------+------------+---------+
| ename  | hiredate   | sal     |
+--------+------------+---------+
| SMITH  | 1980-12-17 | 1200.00 |
| ALLEN  | 1981-02-20 | 2400.00 |
| WARD   | 1981-02-22 | 1875.00 |
| JONES  | 1981-04-02 | 4462.50 |
| MARTIN | 1981-09-28 | 1875.00 |
| BLAKE  | 1981-05-01 | 4275.00 |
| CLARK  | 1981-06-09 | 3675.00 |
| SCOTT  | 1987-04-19 | 3000.00 |
| KING   | 1981-11-17 | 7500.00 |
| TURNER | 1981-09-08 | 2250.00 |
| ADAMS  | 1987-05-23 | 1100.00 |
| JAMES  | 1981-12-03 | 1425.00 |
| FORD   | 1981-12-03 | 4500.00 |
| MILLER | 1982-01-23 | 1950.00 |
+--------+------------+---------+
```

