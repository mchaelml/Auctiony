import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Nav } from "office-ui-fabric-react/lib/Nav";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as CounterStore from '../store/Counter';



export class NavMenu extends React.Component<any, any> {
    constructor(props : any) {
        super(props);
        this._onClickHandler = this._onClickHandler.bind(this);
    }

    private _onClickHandler(e: React.MouseEvent<HTMLElement>, url: string) {
       // this.props.history.push(url);
        e.preventDefault();
        return false;
    }

    public render() {
        return <div className="main-nav" style={{ marginTop: 100 }}>
             <Nav
                // className="nav-nav"
                groups={
                    [
                        {
                            links:
                                [
                                    {
                                        name: "Auctions",
                                        url: "/",
                                        onClick: (e: React.MouseEvent<HTMLElement> | undefined) => {
                                            this._onClickHandler(e as any , `/home`);
                                        },
                                        
                            //            // icon: "AnalyticsReport",
                            //            isExpanded: true
                                    }
                                    
                                ]
                        }
                    ]
                } // selectedKey={this.props.history.location.pathname}
            /> 
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => null, {}             // Selects which action creators are merged into the component's props
)(withRouter(NavMenu) as any) as any;
