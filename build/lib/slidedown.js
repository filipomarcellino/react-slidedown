"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideDown = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var SlideDownContent = (function (_super) {
    tslib_1.__extends(SlideDownContent, _super);
    function SlideDownContent(props) {
        var _this = _super.call(this, props) || this;
        _this.outerRef = null;
        _this.handleRef = function (ref) {
            _this.outerRef = ref;
            if (_this.props.forwardedRef) {
                if (typeof _this.props.forwardedRef === 'function') {
                    _this.props.forwardedRef(ref);
                }
                else if (typeof _this.props.forwardedRef === 'object') {
                    var forwardedRef = _this.props.forwardedRef;
                    forwardedRef.current = ref;
                }
                else {
                    throw new Error("Invalid forwardedRef ".concat(_this.props.forwardedRef));
                }
            }
        };
        _this.handleTransitionEnd = function (evt) {
            if ((evt.target === _this.outerRef) && (evt.propertyName === 'height')) {
                if (_this.state.childrenLeaving) {
                    _this.setState({ children: null, childrenLeaving: false }, function () { return _this.endTransition(); });
                }
                else {
                    _this.endTransition();
                }
            }
        };
        _this.state = {
            children: props.children,
            childrenLeaving: false
        };
        return _this;
    }
    SlideDownContent.prototype.componentDidMount = function () {
        if (this.outerRef) {
            if (this.props.closed || !this.props.children) {
                this.outerRef.classList.add('closed');
                this.outerRef.style.height = '0px';
            }
            else if (this.props.transitionOnAppear) {
                this.startTransition('0px');
            }
            else {
                this.outerRef.style.height = 'auto';
            }
        }
    };
    SlideDownContent.prototype.getSnapshotBeforeUpdate = function () {
        return this.outerRef ? this.outerRef.getBoundingClientRect().height + 'px' : null;
    };
    SlideDownContent.getDerivedStateFromProps = function (props, state) {
        if (props.children) {
            return {
                children: props.children,
                childrenLeaving: false
            };
        }
        else if (state.children) {
            return {
                children: state.children,
                childrenLeaving: true
            };
        }
        else {
            return null;
        }
    };
    SlideDownContent.prototype.componentDidUpdate = function (_prevProps, _prevState, snapshot) {
        if (this.outerRef) {
            this.startTransition(snapshot);
        }
    };
    SlideDownContent.prototype.startTransition = function (prevHeight) {
        var endHeight = '0px';
        if (!this.props.closed && !this.state.childrenLeaving && this.state.children) {
            this.outerRef.classList.remove('closed');
            this.outerRef.style.height = 'auto';
            endHeight = getComputedStyle(this.outerRef).height;
        }
        if (parseFloat(endHeight).toFixed(2) !== parseFloat(prevHeight).toFixed(2)) {
            this.outerRef.classList.add('transitioning');
            this.outerRef.style.height = prevHeight;
            this.outerRef.offsetHeight;
            this.outerRef.style.transitionProperty = 'height';
            this.outerRef.style.height = endHeight;
        }
    };
    SlideDownContent.prototype.endTransition = function () {
        this.outerRef.classList.remove('transitioning');
        this.outerRef.style.transitionProperty = 'none';
        this.outerRef.style.height = this.props.closed ? '0px' : 'auto';
        if (this.props.closed || !this.state.children) {
            this.outerRef.classList.add('closed');
        }
    };
    SlideDownContent.prototype.render = function () {
        var _a = this.props, _b = _a.as, as = _b === void 0 ? 'div' : _b, children = _a.children, className = _a.className, closed = _a.closed, transitionOnAppear = _a.transitionOnAppear, forwardedRef = _a.forwardedRef, rest = tslib_1.__rest(_a, ["as", "children", "className", "closed", "transitionOnAppear", "forwardedRef"]);
        var containerClassName = className ? 'react-slidedown ' + className : 'react-slidedown';
        return react_1.default.createElement(as, tslib_1.__assign({ ref: this.handleRef, className: containerClassName, onTransitionEnd: this.handleTransitionEnd }, rest), this.state.children);
    };
    SlideDownContent.defaultProps = {
        transitionOnAppear: true,
        closed: false
    };
    return SlideDownContent;
}(react_1.Component));
exports.SlideDown = (0, react_1.forwardRef)(function (props, ref) { return (react_1.default.createElement(SlideDownContent, tslib_1.__assign({}, props, { forwardedRef: ref }))); });
exports.default = exports.SlideDown;
//# sourceMappingURL=slidedown.js.map