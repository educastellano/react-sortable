# react-sortable-dnd

A React component to sort elements of any type. It also supports dropping external elements in any position.

## Install

```
npm i react-sortable-dnd --save 
```

## Usage

```html
<Sortable onSort={components => console.log(components.map(c => c.props.children))}>
    <div>Apple</div>
    <div>Mango</div>
    <div>Pineapple</div>
</Sortable>
```

## Props

Prop                | Type/Options              | Default             | Description
---                 | ---                       | ---                 | ---
`className`         | *string*                  | `Sortable`          | **`Optional`** The class name of the component
`classPlaceholder`  | *string*                  | `Placeholder`       | **`Optional`** The class name of the placeholder component when dragging external elements.
`enabled`           | *boolean*                 | `true`              | **`Optional`** Enable/disable the sorting (dragging still works)

## Event Props

Prop                | Parameters                | Description
---                 | ---                       | ---
`onSort`            | *(components)*            | The sorting callback function
`onDrop`            | *(e, data, index)*        | **`Optional`** Called when an external element is dropped.


## Changelog

* 1.0.0 
    * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
