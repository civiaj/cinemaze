import ErrorFallback from "./ErrorFallback";
import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
    msg: string;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, msg: "" };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, msg: error.message };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info.componentStack);
    }

    render() {
        return this.state.hasError ? <ErrorFallback msg={this.state.msg} /> : this.props.children;
    }
}
