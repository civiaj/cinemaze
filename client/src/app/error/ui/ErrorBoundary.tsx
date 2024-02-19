import ErrorFallback from "./ErrorFallback";
import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info.componentStack);
    }

    render() {
        return this.state.hasError ? <ErrorFallback /> : this.props.children;
    }
}
