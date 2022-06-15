"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Content = exports.HandleLeft = exports.HandleRight = exports.ResizePanel = void 0;
var react_1 = require("react");
var react_draggable_1 = require("react-draggable");
var ReactContextResizePanel = (0, react_1.createContext)(undefined);
function ResizePanel(_a) {
    var children = _a.children, initialWidth = _a.initialWidth;
    var _b = (0, react_1.useState)(initialWidth), width = _b[0], setWidth = _b[1];
    return (<ReactContextResizePanel.Provider value={{ width: width, setWidth: setWidth }}>
      {children}
    </ReactContextResizePanel.Provider>);
}
exports.ResizePanel = ResizePanel;
function HandleRight(props) {
    var setWidth = (0, react_1.useContext)(ReactContextResizePanel).setWidth;
    return (<react_draggable_1.DraggableCore onDrag={function (_, ui) {
            var _a;
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
            var deltaX = ui.deltaX;
            setWidth(function (current) { return current + deltaX; });
        }} {...props}/>);
}
exports.HandleRight = HandleRight;
function HandleLeft(props) {
    var setWidth = (0, react_1.useContext)(ReactContextResizePanel).setWidth;
    return (<react_draggable_1.DraggableCore onDrag={function (_, ui) {
            var _a;
            (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
            var deltaX = ui.deltaX;
            setWidth(function (current) { return current - deltaX; });
        }} {...props}/>);
}
exports.HandleLeft = HandleLeft;
function Content(_a) {
    var style = _a.style, props = __rest(_a, ["style"]);
    var width = (0, react_1.useContext)(ReactContextResizePanel).width;
    return <div style={__assign(__assign({}, style), { width: width })} {...props}/>;
}
exports.Content = Content;
