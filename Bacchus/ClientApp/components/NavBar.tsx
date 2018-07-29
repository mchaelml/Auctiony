import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { RouteComponentProps } from "react-router-dom";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";

type NavBarProps =
   
    & RouteComponentProps<{ filter: string }>;


class NavBar extends React.Component<{}, {}> {
    

    public render() {
        return <div className="NavBar">
                   <div className="logo ms-font-l">
                       <strong>Bacchus</strong>
            </div>
               </div>;

    }
}

export default connect((state: ApplicationState) => null, {} )(NavBar as any) as any;
