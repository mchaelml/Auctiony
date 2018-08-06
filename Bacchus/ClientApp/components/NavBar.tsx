import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as Auctions from "../store/AuctionStore";
import { RouteComponentProps } from "react-router-dom";

type NavBarProps =
    Auctions.AuctionsListState & typeof Auctions.actionCreators
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

export default (NavBar) as typeof NavBar;
