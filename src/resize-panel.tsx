/* eslint-disable react/display-name */
import {
  ComponentProps,
  createContext,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
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

// https://github.com/react-grid-layout/react-draggable/blob/v4.4.2/lib/DraggableCore.js#L159-L171
const Handle = forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} {...props} />
));

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
export function ResizeHandleRight(props: ComponentProps<"div">) {
  const { setWidth, minWidth, maxWidth } = useContext(ReactContextResizePanel);
  const nodeRef: any = useRef<HTMLDivElement>(null);
  return (
    <DraggableCore
      nodeRef={nodeRef}
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
    >
      <Handle ref={nodeRef} {...props} />
    </DraggableCore>
  );
}
export function ResizeHandleLeft(props: ComponentProps<"div">) {
  const { setWidth, minWidth, maxWidth } = useContext(ReactContextResizePanel);
  const nodeRef: any = useRef<HTMLDivElement>(null);
  return (
    <DraggableCore
      nodeRef={nodeRef}
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
    >
      <Handle ref={nodeRef} {...props} />
    </DraggableCore>
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
