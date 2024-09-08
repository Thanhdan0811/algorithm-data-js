# String compare
- Có 3 cách so sánh : `equals`, `==` , `compareTo()`

## str.equals(str2) hoặc str.equalsIgnoreCase(s2) (bỏ qua case)
- `s1.equals(s2)` : so sánh value có giống nhau không.

```
class Teststringcomparison1{  
 public static void main(String args[]){  
   String s1="Sachin";  
   String s2="Sachin";  
   String s3=new String("Sachin");  
   String s4="Saurav";  
   System.out.println(s1.equals(s2));//true  
   System.out.println(s1.equals(s3));//true  
   System.out.println(s1.equals(s4));//false  
 }  
}  

```

## `==`
- `==` sẽ so sánh reference không phải values

```
class Teststringcomparison3{  
 public static void main(String args[]){  
   String s1="Sachin";  
   String s2="Sachin";  
   String s3=new String("Sachin");  
   System.out.println(s1==s2);//true (because both refer to same instance)  
   System.out.println(s1==s3);//false(because s3 refers to instance created in nonpool)  
 }  
}  

```

## compareTo()
- So sánh `values lexicographically` và trả về integer.
- `s1 == s2` : return 0.
- `s1 > s2` : return positive.
- `s1 < s2` : return negative.

```
class Teststringcomparison4{  
 public static void main(String args[]){  
   String s1="Sachin";  
   String s2="Sachin";  
   String s3="Ratan";  
   System.out.println(s1.compareTo(s2));//0  
   System.out.println(s1.compareTo(s3));//1(because s1>s3)  
   System.out.println(s3.compareTo(s1));//-1(because s3 < s1 )  
 }  
}  


```