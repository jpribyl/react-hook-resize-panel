import {
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
  maxWidth: number;
  minWidth: number;
};
const ReactContextResizePanel = createContext<ContextType>(undefined!);
type ResizePanelProps = {
  children: ReactNode;
  initialWidth: number;
  maxWidth?: number;
  minWidth?: number;
};
export function ResizePanel({
  children,
  initialWidth,
  minWidth = 0,
  maxWidth = Infinity,
}: ResizePanelProps) {
  const [width, setWidth] = useState(initialWidth);
  return (
    <ReactContextResizePanel.Provider
      value={{ width, setWidth, minWidth, maxWidth }}
    >
      {children}
    </ReactContextResizePanel.Provider>
  );
}

export function ResizeHandleRight(props: ComponentProps<typeof DraggableCore>) {
  const { setWidth, minWidth, maxWidth } = useContext(ReactContextResizePanel);
  return (
    <DraggableCore
      onDrag={(_, ui) => {
        window.getSelection()?.removeAllRanges();
        const { deltaX } = ui;
        if (deltaX < 0) {
          setWidth((current) => Math.max(current + deltaX, minWidth));
        } else {
          setWidth((current) => Math.min(current + deltaX, maxWidth));
        }
      }}
      {...props}
    />
  );
}
export function ResizeHandleLeft(props: ComponentProps<typeof DraggableCore>) {
  const { setWidth, minWidth, maxWidth } = useContext(ReactContextResizePanel);
  return (
    <DraggableCore
      onDrag={(_, ui) => {
        window.getSelection()?.removeAllRanges();
        const { deltaX } = ui;
        if (deltaX < 0) {
          setWidth((current) => Math.min(current - deltaX, maxWidth));
        } else {
          setWidth((current) => Math.max(current - deltaX, minWidth));
        }
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
  return (
    <div
      style={{ ...style, width, maxWidth: width, minWidth: width }}
      {...props}
    />
  );
}
