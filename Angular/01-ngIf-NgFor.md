# @if vs \*ngIf

- less verbose, more intutive
- no need for imports
- supports else if and else conditions
- migration : ng g @angular/core:control-flow

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

# ngSwitch

- check courrse-card.