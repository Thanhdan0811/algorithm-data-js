```

// get options and assign ID
        // this.id = options.id || this.selectTag.id;

        console.log("hello", this.id);


        this.options = getOptionsFromAttribute({
            target: this.selectTag,
            attributeName: ATTRS.init,
            defaultOptions: {...DEFAULTS, ...options, id: null},
            numericValues: ['autoShow'],
            onIsString: value => {
                if(!this.id) {
                    console.log("hello thissss", this);
                    this.id = value;
                }
                console.log(value); // => "hello-world"
            }
        });

        console.log('this.id', this.id, this.options.id);
        this.options.id = options.id || this.selectTag.id || this.options.id || this.id || DEFAULTS.id;
        this.id = this.options.id;



// isuse wrapper class file method.js

// add wrapperClass option
    if(context.options.wrapperClass?.trim().length > 0){
        context.wrapper.classList.add(context.options.wrapperClass?.trim());
    }

```