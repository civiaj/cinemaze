import { Component, ErrorInfo, ReactNode } from "react";
import ErrorFallback from "./ErrorFallback";

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
        if (import.meta.env.VITE_ENV === "development") console.log(error, info.componentStack);
    }

    render() {
        return this.state.hasError ? <ErrorFallback msg={this.state.msg} /> : this.props.children;
    }
}
