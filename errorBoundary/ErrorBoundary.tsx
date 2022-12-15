import React, {FC} from "react";
import FallbackComponent, {FallbackComponentProps} from "./FallbackComponent";

type State = { error: Error | null }
type Props = FallbackComponentProps & { children: React.ReactNode }

class ErrorBoundary extends React.Component<Props, State> {
    state: State = {error: null}

    static getDerivedStateFromError(error: Error): State {
        return {error}
    }


    render() {
        return this.state.error
            ? <FallbackComponent {...this.props}/>
            : this.props.children

    }
}

/**
 * This warps the given component with error boundary
 * @param Component
 * @param error
 */
export const withErrorBoundary = (Component: FC, error: String) => {
    const ComponentWithErrorWrapper: FC = () => {
        return (
            <ErrorBoundary error={error}>
                <Component/>
            </ErrorBoundary>
        );
    };
    return ComponentWithErrorWrapper
}
export default ErrorBoundary;
