# Setup gutenberg

To setup, copy the `gutenberg-blocks` folder include:

- `start-block.js`,
- `add-block.js`,
- 'src' folder (can be empty folder).

Copy `package.json` in `worklounge-03` folder paste to `themes/[project-name]`;

In package.json file, will should have these properties:

```package.json
{
    ...,
    "blockConfig": {
        "namespace": "worklounge-03"
    },
    "scripts": {
      ...,
      "packages-update": "wp-scripts packages-update", // update 
      "plugin-zip": "wp-scripts plugin-zip",
      "start": "wp-scripts start --webpack-src-dir=gutenberg-blocks/src --output-path=gutenberg-blocks/build",
        "start:block": "node ./gutenberg-blocks/start-block.js",
        "add": "node ./gutenberg-blocks/add-block.js"
    },
    "devDependencies": {
        ...,
        "@wordpress/scripts": "^27.9.0"
    },
    "dependencies": {
        ...,
        "@wordpress/block-editor": "^13.4.0",
        "@wordpress/blocks": "^13.4.0",
        "@wordpress/components": "^28.4.0",
        "@wordpress/data": "^10.4.0",
        "@wordpress/element": "^6.4.0",
        "@wordpress/i18n": "^5.4.0",
        "@wordpress/icons": "^10.5.0",
    }
}
```

- `"packages-update": "wp-scripts packages-update"`: update package `@wordpress/scripts` and dependencies to the latest
  version.
- `"plugin-zip": "wp-scripts plugin-zip"`: create a zip file of the plugin.

- Currently, Accordion block is restyle from new. So can copy also the `accordion`, `accordion-item` block folder from
  `src` to your new `gutenberg-blocks/src` folder. Then you can build and map to server.
- Then open terminal at the `gutenberg-blocks` folder and run `npm install` to install dependencies.

# How to add new block and build.

## Add new block

- First open terminal at the `themes/[project-name]` folder (make sure you have installed dependencies by running
  `npm install`).
- To add a new block can run these commands:

### Add new block commands in package.json

```add new block commands in package.json
npm run add [folder-block-name]
```

example: `npm run add accordion-item`.

- will create a new block folder with name `accordion-item` in the `src` folder with all necessary files and structure
  for a `dynamic` block. we can change info like block name, namespace, category, textdomain... in the `block.json` file
  of the new block.
- To change `namespace` automatically, we can update the `package.json` file with the new namespace.

```package.json
"blockConfig": {
    "namespace": "worklounge-03"
  },
```

### Add new block manually

```add new block manually
npx @wordpress/create-block --no-plugin --variant dynamic --namespace <namespace> --category "<Category>" --textdomain <textdomain> --target-dir src/<block-name> <block-name>
```

Example:
`npx @wordpress/create-block --no-plugin --variant dynamic --namespace worklounge-03 --category "Worklounge 03" --textdomain worklounge-03 --target-dir src/accordion-item accordion-item`

`<block-name>` → Block name (️change this to your new block name)

`<namespace>` → Block namespace (change if using another theme/plugin)

`"<Category>"` → Block category in editor (must match registered category)

`<textdomain>`  → Translation domain

`--target-dir src/accordion-item`  → Output directory (update path if needed)

`--variant dynamic` → Creates a dynamic block (rendered via PHP)

`--no-plugin` → Adds block to existing project (not standalone plugin)

Note: This extra infos like category, namespace... can be changed in the `block.json` file of each block. Just focus on
the `block name`, `--variant dynamic`, `--no-plugin`, `--target-dir src/accordion-item`

## Build all and individual block.

- To build all blocks use command: `npm run start`, and all blocks will be built in the `build` folder.
- To build individual block use command: `npm run start:block [name-of-block-folder]` and the block will be built in the
  `build` folder.
    * Example: `npm run start:block accordion-item` and the block will be built in the
      `build/accordion-item` folder.
- Then we can map folder built to server.

# Structure of block

## Block Structure

Each block folder (e.g. `accordion-item-1/`) contains:

```bash id="n2f8qk"
accordion-item-1/
├── block.json      # Block metadata & configuration
├── index.js        # Register block (entry point)
├── edit.js         # Editor UI (Gutenberg)
├── render.php      # Frontend render (dynamic block)
├── view.js         # Frontend behavior (JS)
├── editor.scss     # Styles in editor
└── style.scss      # Styles on frontend
```

---

## File Responsibilities

* **block.json**
  → Defines block settings (name, attributes, supports, scripts, styles)

* **index.js**
  → Registers the block and connects `edit.js`

* **edit.js**
  → Handles UI and interactions inside Gutenberg editor

* **render.php**
  → Outputs HTML on frontend (used for dynamic blocks)

* **view.js**
  → Adds frontend interactivity script (e.g. accordion toggle, events)

* **editor.scss**
  → Styles applied only in editor

* **style.scss**
  → Styles applied on frontend (and optionally editor)

---

## Notes

* This is a **dynamic block** → frontend is rendered via `render.php` (static blocks would use `save.js` instead)
* `view.js` must be registered in `block.json` (`viewScript`)
* Avoid putting frontend logic inside `edit.js`
* Keep PHP (`render.php`) for markup, JS (`view.js`) for behavior

## Process to code a block

1. Create the block (follow the instruction above).
2. Code layout for editor in `edit.js`, style in `editor.scss`. Most techniques used are React-based, refer
   to [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/components/)
   and [@wordpress/element](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/).
3. Code layout for frontend in `render.php`, style in `style.scss`. This file returns the HTML output for the block,
   using PHP to get data from block attributes or database if needed. For custom frontend scripts, use `view.js`.
4. Build the block and map to server to test. If changes are needed, update the code and rebuild.

# Theme.json

# Template

# Update fields
