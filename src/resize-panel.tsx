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
export function ResizePanel({ children, initialWidth }: ResizePanelProps) {
  const [width, setWidth] = useState(initialWidth);
  return (
    <ReactContextResizePanel.Provider value={{ width, setWidth }}>
      {children}
    </ReactContextResizePanel.Provider>
  );
}

export function ResizeHandleRight(props: ComponentProps<typeof DraggableCore>) {
  const { setWidth } = useContext(ReactContextResizePanel);
  return (
    <DraggableCore
      onDrag={(_, ui) => {
        window.getSelection()?.removeAllRanges();
        const { deltaX } = ui;
        setWidth((current) => current + deltaX);
      }}
      {...props}
    />
  );
}
export function ResizeHandleLeft(props: ComponentProps<typeof DraggableCore>) {
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
export function ResizeContent({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { width } = useContext(ReactContextResizePanel);
  return <div style={{ ...style, width }} {...props} />;
}
