# React Hook MathJax

[![npm version](https://badge.fury.io/js/react-hook-mathjax.svg)](https://badge.fury.io/js/react-hook-mathjax)

Dead simple resizable panel- only 60 lines of code. Lightweight, strongly typed
package with almost no dependencies. It uses React Grid Layout and React Hooks
to construct a resizable panel. For more details, take a look at the [example
project](https://github.com/jpribyl/react-hook-resize-panel/tree/master/example)
(which contains code for the gif below) or the [live
demo](https://johnpribyl.com/react-hook-resize-panel/) of the example project.

![Example of usage](/demo.gif)

## Install

```
yarn add react-hook-resize-panel
```

## Usage

### Basic inline display

```jsx
import {
  Content,
  HandleLeft,
  HandleRight,
  ResizePanel,
} from "react-hook-resize-panel";

export default function App() {
  return (
    <div style={{ flexFlow: "row nowrap", flexGrow: 1, display: "flex" }}>
      <ResizePanel initialWidth={300}>
        <Content style={{ backgroundColor: "#283430" }} />
        <HandleRight>
          <div
            style={{
              cursor: "col-resize",
              width: 5,
              backgroundColor: "black",
            }}
          />
        </HandleRight>
      </ResizePanel>

      <div style={{ flexGrow: 1, backgroundColor: "#34282c" }} />

      <ResizePanel initialWidth={300}>
        <HandleLeft>
          <div
            style={{
              cursor: "col-resize",
              width: 5,
              backgroundColor: "black",
            }}
          />
        </HandleLeft>
        <Content style={{ backgroundColor: "#283430" }} />
      </ResizePanel>
      <div />
    </div>
  );
}
```

## API

### `ResizePanel` props:

#### `initialWidth` Number, required

- Sets initial width of panel
- Does not currently support responsive / percentage values

### `Content` props:

- Will patch panel's `width` into `style` prop
- Passes all props directly into a `<div/>`

### `HandleRight` props:

- Will shrink `<Content/>` when dragged to the left and grow `<Content/>` when dragged to the right
- Passed directly to `react-draggable`'s `DraggableCore` component
- See docs here for valid options: [DraggableCore](https://github.com/react-grid-layout/react-draggable#draggablecore)

### `HandleLeft` props:

- Will shrink `<Content/>` when dragged to the right and grow `<Content/>` when dragged to the left
- Passed directly to `react-draggable`'s `DraggableCore` component
- See docs here for valid options: [DraggableCore](https://github.com/react-grid-layout/react-draggable#draggablecore)
