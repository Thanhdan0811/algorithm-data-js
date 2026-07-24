# @if vs \*ngIf

- less verbose, more intutive
- no need for imports
- supports else if and else conditions
- migration : ng g @angular/core:control-flow
- ngIf không có else if.

# ngClass

```
<!-- array -->
<div class="course-card" *ngIf="course" [ngClass]="['beginner', 'course-card']"></div>

<!-- object -->
<div class="course-card" *ngIf="course" [ngClass]="{'beginner': true}"></div>

<div class="course-card" *ngIf="course" [ngClass]="cardClasses()"></div>

<!-- function -->
cardClasses() {
    return {
      'beginner': this.course.category == "BEGINNER",
      'course-card': true,
    }
  }

<!-- or -->

cardClasses() {

    if(this.course.category === "BEGINNER") {
      return ['beginner']
    }
  }

```

# ngStyle

```

<!-- style attribute -->
<div class="course-title" [style.text-decoration]="'underline'">
       {{index}} {{ course.description }}
    </div>


<!-- ngStyle using object. -->
<div class="course-title" [ngStyle]="{
        'text-decoration': 'underline',
        ...
    }">
       {{index}} {{ course.description }}
    </div>

<!-- ngStyle using function -->
<div class="course-title" [ngStyle]="cardStyles()">
       {{index}} {{ course.description }}
    </div>

cardStyles() {
    return {
      'text-decoration': 'underline',
      'background-image' : 'url(' + this.course?.iconUrl + ')'
    }
  }


```

# ngFor & @For

```

<div class="courses">
  @for (course of coreCourses; track courseTrackBy(index, course); let index = $index; let count =
  $count; let first = $first; let last = $last; let even = $even; let odd = $odd) {
  <course-card
    (courseSelected)="onCourseSelected($event)"
    [course]="course"
    [class.is-first]="first"
    [class.is-last]="last"
    [class.is-even]="even"
    [class.is-odd]="odd"
  ></course-card>
  } @empty {
  <h1>No courses found!</h1>
  }
</div>
<!-- Cách cũ. -->
<course-card *ngFor="let course of coreCourses; index as i; first as isFirst; last as isLast"
    (courseSelected)="onCourseSelected($event)"
    [course]="course"
    [class.is-first]="isFirst"
    [class.is-last]="isLast"
    [class.is-even]="even"
    [class.is-odd]="odd"
>

</course-card>

// function track by
 courseTrackBy(index: number, course: Course) {
    return course.id;
  }

```

# @switch <=> \*ngSwitch

```
<div class="course-category">

        @switch (course.category) {
            @case ("Beginner") {
                <div class="category">Begginer</div>
            }
            @case ("INTERMEDIATE") {
                <div class="category">Intermediate</div>
            }
            @default {
                <div class="category">Unknow</div>
            }
        }

    </div>

// Cách cũ 

<div class="course-category" *ngSwitch="course.category">
        <div class="category" *ngSwitchCase="'BEGINNER'">Begginer</div>
        <div class="category" *ngSwitchCase="'BEGINNER'">Intermediate</div>
        <div class="category" *ngSwitchDefault>Unknow</div>
    </div>

```

- check courrse-card.
