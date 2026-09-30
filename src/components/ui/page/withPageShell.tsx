import { createElement, type ComponentType } from "react";
import { PageShell, type PageShellVariant } from "./PageShell";

export function withPageShell<P extends object>(
  Component: ComponentType<P>,
  variant: PageShellVariant = "scroll",
) {
  function Wrapped(props: P) {
    return (
      <PageShell variant={variant}>
        <Component {...props} />
      </PageShell>
    );
  }

  Wrapped.displayName = `WithPageShell(${Component.displayName ?? Component.name})`;

  return Wrapped;
}

export function createPageShellElement(
  Component: ComponentType,
  variant: PageShellVariant = "scroll",
) {
  return createElement(withPageShell(Component, variant));
}
