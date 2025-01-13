import React, { ReactNode } from "react";
import { abilityFinder, Can } from "./can";

interface AuthorizerProps {
  children: ReactNode;
  resource: string; // Assuming resource is a string
  not?: boolean;
}
const Authorizer = ({ children, resource, not = false }: AuthorizerProps) => {
  return (
    <Can I={abilityFinder(resource)} a={`${resource}`} not={not}>
      {children}
    </Can>
  );
};

export default Authorizer;
