<!-- file app.html -->

```
<div class="courses" *ngIf="courses[0] as course">

  <!-- định nghĩa 1 template -->
  <ng-template #blankImage let-courseName="description">
    <!-- <p class="warn">{{course.description}} has no Image yet.</p> -->
    <p class="warn">{{courseName}} has no Image yet.</p>
    <img src="/assets/empty-image.png" alt="">
  </ng-template>

  <!-- định nghĩa 1 instance của template -->
  <ng-container *ngTemplateOutlet="blankImage; context: {description: course.description}"></ng-container>
  <ng-container *ngTemplateOutlet="blankImage; context: {description: course[1].description}"></ng-container>

  <hr>
  <hr>

  <course-card [course]="course" (courseSelected)="onCardClicked($event)">
    <h2>this is content between child tags no select</h2>
    <h3>this is content but only select h3</h3>
    <h4 class="h4-select">
      this is content but only select h4 select by class
    </h4>
    <h5 #h5Child>Content Child</h5>
  </course-card>
</div>


```

- #blankImage là 1 template
- let-courseName="description" : => courseName là biến sẽ truyền vào, description sẽ là tên property của object context của instance.
- \*ngTemplateOutlet là 1 instance của template, context là object truyền value vào template.

# Truyền template từ cha xuống con.

<!-- componnent cha app.component -->

```
<div class="courses" *ngIf="courses[0] as course">

  <!-- định nghĩa 1 template -->
  <ng-template #blankImage let-courseName="description">
    <!-- <p class="warn">{{course.description}} has no Image yet.</p> -->
    <p class="warn">{{courseName}} has no Image yet.</p>
    <img src="/assets/empty-image.png" alt="">
  </ng-template>

  <!-- định nghĩa 1 instance của template -->
  <!-- <ng-container *ngTemplateOutlet="blankImage; context: {description: course.description}"></ng-container>
  <ng-container *ngTemplateOutlet="blankImage; context: {description: course[1].description}"></ng-container> -->

  <hr>
  <hr>

  <course-card [course]="course" (courseSelected)="onCardClicked($event)" [noImageTemplate]="blankImage">
    <h2>this is content between child tags no select</h2>
    <h3>this is content but only select h3</h3>
    <h4 class="h4-select">
      this is content but only select h4 select by class
    </h4>
    <h5 #h5Child>Content Child</h5>
  </course-card>
</div>

```
-  [noImageTemplate]="blankImage" : truyền template blankImage xuống component con.

<!-- componnent con course.component -->

```
<!-- trong file ts -->
@Input()
  noImageTpl: TemplateRef<any>


<!-- trong file html -->
<ng-content select="course-image" *ngIf="course.iconUrl; else noImage"></ng-content>

<ng-template #noImage>
<ng-container *ngTemplateOutlet="noImageTpl; context: {description: course.description}"></ng-container>
</ng-template>

```

- *ngTemplateOutlet="noImageTpl; context: {description: course.description}" : nhận template và truyền value vào cho template.

