# Each file is a component, with extension '.svelte'


# Dynamic Attribute
```dynamic attribute
<script>
    let src = 'image.gif';let alt = 'Person nods';
    let obj = {src: 'image.gif', alt: 'Person nods'};
    let lazy = false;
</script>


<img src={src} alt={alt}  />
// or
<img {src} {alt}  />
// or
<img {...obj}  />
// or with condition render attribute, must use null or undefined.
<img {...obj} loading={lazy ? 'lazy' : null | undefined} />

```

# Component style
```Component style

<script>
    let color = 'orangered';
</script>

<h1 stye="color: {color}">Svelte</h1>
// or
<h1 stye:color={color}>Svelte</h1>
// or omit right hand assigned caused they same name.
<h1 stye:color>Svelte</h1>
// 
<h1 stye={{ color }}>Svelte</h1>
//
<h1 stye="--color: {color}">Svelte</h1>
<h1 stye:--color={color}   >Svelte</h1>

<style>
    h1 {
        color: var(--color,#fff);
    }
</style>
```
# scoped and global style
- style trong mỗi file là scoped style, svelte sẽ tạo 1 class riêng.
- global style có thể được định nghĩa trong compoennt.

```global style
<script>
    let content = `
        <h1>Big banana exposed.</h1>
        <p>The gorillas inside the banana cartel speak out.</p>
    `
</script>

<hgroup>
    {@html content}
</hgroup>


<style>
    hgroup :global() {
        h1 {color:blue;}
    }

    // or

    :global(p) {
        color: red;
    }
    
    // or
    
    :global {
        p {
            color:red;
        }
        a {text-decoration:none;}
    }
</style>

```


# Dynamic classes

```Dynamic classses

<script>
    let open = $state(false);
    let status = $state('closed);
</script>

<button onclick={() => (open = !open) } class="btn">
    <span>Item A</span>
    <span class="trigger {open ? 'open' : ''}" >👈</span>
    // or
    <span class="trigger" class:open>👈</span>
    // or 
    <span class={{trigger:true, open}}>👈</span>
    // or
    <span class={['trigger', open && 'open'], {open}}>👈</span>
    // or
    <span class={['transition-transform', {'-rotate-90': open}]}>👈</span>
    // or
    <span class="trigger" data-status={status}>👈</span>
</button>

<style>
    .trigger {
        display:inline-block;
    }
    
</style>

```


# Reactive state.
- Bên dưới dùng cơ chế Proxy.

```

<script>
    let count = $state(0);
    let editor = $state({
        theme: 'dark',
        content: '<h1>Svelte</h1>'
    }); // deep update like proxy.
</script>

<button onclick={() => (count++)}>
    {count}
</button>

<textarea
    class="editor"
    value={editor.content}
    oninput={(e) => (editor.content = e.target.value) }
></textarea>

{@html editor.content}

```

Raw: `$state.raw` only reactive when reassignment the object.

```

<script>
    let count = $state(0);
    let editor = $state.raw({
        theme: 'dark',
        content: '<h1>Svelte</h1>'
    }); // deep update like proxy.
    
    // or 
    let {theme, content} = $state({
        theme: 'dark',
        content: '<h1>Svelte</h1>'
    }) // this works
    
    // but this is not
    // =====
    let editor = $state({
        theme: 'dark',
        content: '<h1>Svelte</h1>'
    });
    
    let {theme, content} = editor; // not work.
    
    // =====
    
    
    // get regular object from state Proxy
    function saveEditorState() {
        const editorState = structuredClone($state.snapshot(editor));
        console.log(editorState); // => object {...}
        // Svelte still return object.
        console.log(editor); // => return object normal.
    }
    
</script>

<button onclick={() => (count++)}>
    {count}
</button>

<textarea
    class="editor"
    value={editor.content}
    oninput={(e) => {
        // doesn't work
        editor.content = e.target.value
        
        // reassignment
        editor = {
            ...editor,
            content: e.target.value
        }
    } }
></textarea>

{@html editor.content}

```

# Derived State

```Derived State.

<script>
    let count = $state(0);let factor = $state(0);
    let result = $derived(count * factor); // each state changes then result re-calculate.
</script>

<h1>{count} * {factor} = {result}</h1>
<button onclick={() => count++}>Count: {count}</button>
<button onclick={() => factor++}>Factor: {factor}</button>

```


```Derived State lazy update.
// derived value only run when it was read.
// derived only update when they change, not when state dependency change.
// like below case, when count change but smaller then 4, then only count change, but max still false, 
// when count equal or bigger than 4, then max turn to true.
// 0,1,2,3 => max still false, not re-render or update to UI, 
// when reach 4, max update to true, if continue increase count, max still true and not re-render.

<script>
    let count = $state(0);
    let max = $devired(count >= 4);
    
    $inspect(max); // will log when max changes.
    
</script>

// other feature

<script>
    let count = $state(0);
    
    let max = $devired(limit(count)); // get(count) > 4
    function limit (count) {
        return count > 4;
    }
    
    // or 
    // only re-run when max changes.
    let max = $devired(limit()); 
    function limit() {
        return count > 4; // get(count) > 4
    }
    
</script>

<button onclick={() => count++} disabled={max}>Count: {count}</button>

```



```Derived State derived.by .
// More complex data.
<script>
    let cart = $state([
        {item: '🍎', total: 10},
        {item: '🍌', total: 20},
    ]);
    
    // derived total sum, when total changes then re-calculate sum.
    let total = derived.by(() => {
        // remember not update state in this scope.
        let sum = 0;
        for(let item of cart) {
            sum += item.total;
        }
        return sum;
    })
</script>

<h1>{total}</h1>

```

# Effect.
Run when dependencies change or remove component from DOM
```Effect
<script>
    let count = $state(0);
    
    $effect(() => {
        console.log(count);
    })
</script>

<button onclick={() => count++}>Click</button>

// OR 
// only when condition true then count is read (still increase but not read).

<script>
    let count = $state(0);
    let condition = $state(false);
    
    $effect(() => {
        if (condition) {
            console.log(count);
        }
    })
</script>

<button onclick={() => count++}>Click</button>
<button onclick={() => (condition = !condition)}>Click</button>

```

# Values read asynchronously are not tracked

```Asynchronously are not tracked
// when delay change, new interval create, so we need to clean up. 
// effect only read deplay state, cause count in asynschronous callback.
<script>
    let count = $state(0);
    let delay = $state(1000);
    
    $effect(() => {
        const interval = setInterval(() => count++, delay);
        // clean up before read deplay again
        return () => cleanInterval(interval);
    })
</script>

<div class="interval">
    <button onclick={() => (delay *= 2)}>slower</button>
    <div>{count}</div>
    <button onclick={() => (delay /= 2)}>faster</button>
</div>

```

# $effect.pre + queueMicrotask(() => {}) ( or tick())
