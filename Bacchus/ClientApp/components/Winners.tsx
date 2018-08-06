import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
var dateFormat = require("dateformat");
import { DetailsList, SelectionMode, DetailsListLayoutMode, IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { DatePicker, IDatePickerStrings, IDatePickerProps } from "office-ui-fabric-react/lib/DatePicker";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton, IButtonProps, IconButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { BaseComponent, css, autobind } from "office-ui-fabric-react/lib/Utilities";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/components/ContextualMenu";
import { CommandButton, Button } from "office-ui-fabric-react/lib/components/Button";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Image, ImageFit, IImageProps } from "office-ui-fabric-react/lib/Image";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { IOverflowSetItemProps, OverflowSet } from "office-ui-fabric-react/lib/OverflowSet";
import * as Auctions from "../store/AuctionStore";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";



type WinnersListProps =
    Auctions.AuctionsListState & typeof Auctions.actionCreators
    & RouteComponentProps<{ pageIndex: string, filter: string }>; //  ... plus incoming routing parameters

interface IWinnersListState {
}

const DayPickerStrings: IDatePickerStrings = {
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],

    shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],

    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],

    shortDays: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],

    goToToday: "Go to today",
    prevMonthAriaLabel: "Go to previous month",
    nextMonthAriaLabel: "Go to next month",
    prevYearAriaLabel: "Go to previous year",
    nextYearAriaLabel: "Go to next year",

    isRequiredErrorMessage: "* Field is required.",

    invalidInputErrorMessage: "Invalid date format."
};


class Winners extends React.Component<WinnersListProps, IWinnersListState> {
    constructor(props: any) {
        super(props);
        this._onClickHandler = this._onClickHandler.bind(this);
    }
    componentWillMount() {
        document.title = "Bacchus";
        // console.log("started testi : ");
        //  This method runs when the component is first added to the page
        let pageIndex = parseInt(this.props.match.params.pageIndex) || 1;
        let filter = this.props.match.params.filter;

        this.props.requestWinners();

    }
    componentWillReceiveProps(nextProps: WinnersListProps) {
        //  This method runs when incoming props (e.g., route params) change
        let pageIndex = parseInt(nextProps.match.params.pageIndex) || 1;
        let filter = nextProps.match.params.filter;
    }
    
    formatDate = (date: Date): string => {
        return DayPickerStrings.shortMonths[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear();
    }
    

    capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    public render() {
        return <div className="ms-slideRightIn10">
            <div className="ms-Grid-row" style={{ marginLeft: 0, marginRight: 10 }}>
                </div>
            {this.renderWinnersList()}
        </div>;
    }
    private addNewOffer = (offer: App.UserOffer) => {
        this.props.addOffer(offer);
    }
    
    private renderWinnersList() {
        return <DetailsList
            items={this.props.winners ? (this.props.winners) : []}
            compact={true}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            columns={[
                {
                    fieldName: "Username",
                    key: "Username",
                    minWidth: 0,
                    maxWidth: 250,
                    name: "Name",
                    isResizable: true,
                    onRender: (item: App.UserOffer) => {
                        return <p>{item.userId ? item.userId : ""}</p>;
                    },
                },
                {
                    fieldName: "description",
                    key: "description",
                    minWidth: 0,
                    maxWidth: 250,
                    name: "Amount to be paid",
                    isResizable: true,
                    onRender: (item: App.UserOffer) => {
                        return <p> {item.offer} </p>;
                    },
                },
                {
                    fieldName: "productId",
                    key: "productId",
                    minWidth: 0,
                    maxWidth: 250,
                    name: "Product Id",
                    isResizable: true,
                    onRender: (item: App.UserOffer) => {
                        return <p>{item.productId}</p>;
                    }
                }
            ]}
        />;
    }

    private _onClickHandler(e: React.MouseEvent<HTMLElement>, url: string) {
        this.props.history.push(url);
        e.preventDefault();
        return false;
    }

    private _onRenderOverflowButton(overflowItems: any[] | undefined): JSX.Element {
        return (
            <DefaultButton
                className={css()}
                menuIconProps={{ iconName: "More" }}
                menuProps={{ items: overflowItems! }}
            />
        );
    }

    private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
        if (item.onRender) {
            return (
                item.onRender(item)
            );
        }
        return (
            <DefaultButton
                iconProps={{ iconName: item.icon }}
                menuProps={item.subMenuProps}
                text={item.name}
                onClick={item.onClick}
            />
        );
    }

}

export default connect(
    (state: ApplicationState) => state.auctions,
    Auctions.actionCreators
)(withRouter(Winners) as any) as typeof Winners;
