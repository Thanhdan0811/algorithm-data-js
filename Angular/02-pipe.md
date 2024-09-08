# Pipes.

```
title = COURSES[0].description;
startDate = new Date(2000, 0, 1);
price = 9.99;
percent = 0.67;
course = COURSES[0];

<!-- html -->
<div class="demo">
  <div> Start Date:
    {{startDate | date: 'MM/dd/yyyy'}}
  </div>
  <div>
    String pipe :
    {{title | lowercase | uppercase | titlecase }}
  </div>
  <div>
    Number pipe :
    <!-- 3 số trước dấu ., 3 là min , max là 5 sau dấu chấm. -->
    {{price | number: '3.3-5'}}
    {{price | currency: "VND"}}
  </div>
  <div>
    Percent pipe :
    {{percent | percent}}
  </div>
</div>

{{ courses | json }}

<div *ngFor="let pair of course | keyvalue">
  {{pair.key + "-" + pair.value}}
</div>
@for (course of courses | slice:0:2; track trackCourse; let idx = $index; let count =
  $count; let first = $first; let last = $last; let even = $even; let odd = $odd) {

}


```