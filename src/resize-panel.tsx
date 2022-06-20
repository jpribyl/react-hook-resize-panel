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
import { DraggableCore, DraggableData } from "react-draggable";

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

type HandleOverflowParams = {
  ui: DraggableData;
  currentWidth: number;
  nextWidth: number;
};
function handleOverflow({ ui, currentWidth, nextWidth }: HandleOverflowParams) {
  const { clientWidth, scrollWidth } = ui.node.parentElement!;
  const difference = currentWidth - nextWidth;
  const nextScrollWidth = scrollWidth + difference;
  const overflow = nextScrollWidth - clientWidth;
  if (clientWidth - nextScrollWidth < 0) return currentWidth - overflow;
  return nextWidth;
}
export function ResizeHandleRight(props: ComponentProps<typeof DraggableCore>) {
  const { setWidth, minWidth, maxWidth } = useContext(ReactContextResizePanel);
  return (
    <DraggableCore
      onDrag={(_, ui) => {
        window.getSelection()?.removeAllRanges();
        const { deltaX } = ui;
        if (deltaX < 0) {
          setWidth((currentWidth) => Math.max(currentWidth + deltaX, minWidth));
        } else {
          setWidth((currentWidth) => {
            const nextWidth = Math.min(currentWidth + deltaX, maxWidth);
            return handleOverflow({ ui, currentWidth, nextWidth });
          });
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
          setWidth((currentWidth) => {
            const nextWidth = Math.min(currentWidth - deltaX, maxWidth);
            return handleOverflow({ ui, currentWidth, nextWidth });
          });
        } else {
          setWidth((currentWidth) => Math.max(currentWidth - deltaX, minWidth));
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
