import "./Layout.css";
import * as React from 'react';
import { NavMenu } from './NavMenu';
import NavBar from './NavBar';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <NavBar />
                        </div>
                    <div className="ms-Grid-row container">
                        <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg2">
                            <NavMenu />
                        </div>
                    <div className="ms-Grid-col ms-sm12 ms-md11 ms-lg10 main">
                        { this.props.children }
                    </div>
                    </div>
            </div>
        </div>;
    }
}
