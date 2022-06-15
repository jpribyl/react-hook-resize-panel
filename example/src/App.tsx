import React, {
  ComponentProps,
  createContext,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DraggableCore } from "react-draggable";

type ContextType = {
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
};
const ReactContextResizePanel = createContext<ContextType>(undefined!);
type ResizePanelProps = { children: ReactNode; initialWidth: number };
function ResizePanel({ children, initialWidth }: ResizePanelProps) {
  const [width, setWidth] = useState(initialWidth);
  return (
    <ReactContextResizePanel.Provider value={{ width, setWidth }}>
      {children}
    </ReactContextResizePanel.Provider>
  );
}

function HandleRight(props: ComponentProps<typeof DraggableCore>) {
  const { setWidth } = useContext(ReactContextResizePanel);
  return (
    <DraggableCore
      onDrag={(_, ui) => {
        window.getSelection()?.removeAllRanges();
        const { deltaX } = ui;
        setWidth((current) =>  current + deltaX);
      }}
      {...props}
    />
  );
}
function HandleLeft(props: ComponentProps<typeof DraggableCore>) {
  const { setWidth } = useContext(ReactContextResizePanel);
  return (
    <DraggableCore
      onDrag={(_, ui) => {
        window.getSelection()?.removeAllRanges();
        const { deltaX } = ui;
        setWidth((current) => current - deltaX);
      }}
      {...props}
    />
  );
}
function Content({ style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { width } = useContext(ReactContextResizePanel);
  return <div style={{ ...style, width }} {...props} />;
}

export default function App() {
  return (
    <div className="App">
      <div className="App-container">
        <h3>React Hook Resize Panel</h3>
      </div>

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
      <a
        className="external-links"
        href="https://www.github.com/jpribyl/react-hook-resize-panel"
      >
        Code available on
        <svg
          height="50px"
          fill="rgb(203, 198, 192)"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>GitHub icon</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </div>
  );
}
