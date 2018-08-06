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



type AuctionListProps =
    Auctions.AuctionsListState & typeof Auctions.actionCreators
    & RouteComponentProps<{ pageIndex: string, filter: string }>; //  ... plus incoming routing parameters

interface IAuctionListState {
    hideDialog: boolean,
    name: string,
    category: Array<string>,
    description: string,
    endDate?: Date | null,
    userOffer : App.UserOffer
}

//let imageProps: IImageProps = {
//    src: "http:// placehold.it/500x500",
//    imageFit: ImageFit.cover,
//    maximizeFrame: true
//};
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


class AuctionList extends React.Component<AuctionListProps, IAuctionListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hideDialog : true,
            name: "",
            category: ["none"],
            description: "",
            endDate: null,
            userOffer: { Id: 0, offer: 0, productId: "", userId: "", endTime : null }
        };
        this._onClickHandler = this._onClickHandler.bind(this);
    }
    componentWillMount() {
        document.title = "Bacchus";
        // console.log("started testi : ");
        //  This method runs when the component is first added to the page
        let pageIndex = parseInt(this.props.match.params.pageIndex) || 1;
        let filter = this.props.match.params.filter;

        this.props.requestCompleteList();
        this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, this.state.endDate, this.props.category);

    }
    componentWillReceiveProps(nextProps: AuctionListProps) {
        //  This method runs when incoming props (e.g., route params) change
        let pageIndex = parseInt(nextProps.match.params.pageIndex) || 1;
        let filter = nextProps.match.params.filter;
    }
   
    onRowClick = (path: string) => {
        this.props.history.push(path);
    }

    endDateChangeFabric = (date: Date | null | undefined ) : void => {
        this.setState({ endDate: date });
        this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, date, this.props.category);

        //  console.log(this.state.deliverydate);
       // this.props.requestCallList(this.props.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, date, this.state.dueDate);
        // this.props.history.push(`${SERVICE_URL}/calllist/all/${this.props.filter}/1`);
    }
    formatDate = (date: Date) : string  => {
        return DayPickerStrings.shortMonths[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear();
    }

    //  history.push + pageIndex=1 is needed here to change to the 1st page after filtering to not get stuck on an out of range page
    handleFilterChange = (value : string, element : string) => {
        //  var value = e.target.value;
        switch (element) {
            case "name":
                this.setState({ name: value });
                this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, value,this.state.endDate, this.props.category);

              //  this.props.requestCallList(null, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, value, this.state.company, this.state.callDate, this.state.dueDate);
                //  this.props.history.push(`${SERVICE_URL}/deliveries/${this.props.filter}/1`);
                break;

            
                //  if (value !== "") {
              //  this.props.requestCallList(null, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, value, this.state.callDate, this.state.dueDate);
                //  this.props.history.push(`${SERVICE_URL}/deliveries/${this.props.filter}/1`);
                // }
               
            case "category":
                // this.setState({ company: value });
                if (this.props.category[0] === "none" && this.props.category.length === 1) {
                    this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, this.state.endDate, this.props.category);


                } else {
                    console.log("hit this points : " + value);
                    this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, this.state.endDate,  this.props.category);

                }
                break;
        }
    }
    onClickNewReport = () => {

        this.props.history.push(`/calllist/0`);
    }


    private renderFilters() {
        return <div>
            {this.state.name == null || this.state.name === undefined || this.state.name === "" ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Product Name : <b style={{ paddingLeft: 5 }}>{" " + this.state.name}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("name"); }} /></div>}
            {this.props.category == null || this.props.category === undefined || (this.props.category.length === 1 && this.props.category[0] === "none") ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Region : <b style={{ paddingLeft: 5 }}>{" " + (this.props.category.slice(1))}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("category"); }} /></div>}
            {this.state.endDate == null || this.state.endDate === undefined ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}End Date : <b style={{ paddingLeft: 5 }}>{" " + dateFormat(this.state.endDate, "dd/mm/yyyy")}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("enddate"); }} /></div>}

        </div>;
    }


    clearInput = (input: string = "") => {
        switch (input) {
            
            case "name":
                this.setState({ name: "" });
                this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc,"", this.state.endDate,  this.props.category);
                break;
            case "category":
                // console.log(this.state.regionList);
                this.props.changeCategory(["none"]);
                this.setState({ category: ["none"] }, () => {
                    this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, this.state.endDate,  this.props.category);
                  });
                break;
            case "enddate":
                this.setState({ endDate : null })
                this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, null, this.props.category);


            default:
                this.setState({
                    name: "", endDate: null
                });
                this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, this.state.endDate,  this.props.category);
        }
    }

    capitalizeFirstLetter = (string : string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    filterAction = ( event : any ) => {
        event.preventDefault();
        this.props.requestAuctionList(this.props.column, this.props.filter, this.props.desc, this.state.name, this.state.endDate,  this.props.category);

        // this.props.history.push(`${SERVICE_URL}/deliveries/${this.props.filter}/1`);
    }

    public render() {
        return <div className="ms-slideRightIn10">
            {this.renderOverFow()}
            <div className="ms-Grid-row" style={{ marginLeft: 0, marginRight: 10 }}>
                {this.renderFilters()}
                {/*  {this.filterActive() ? <Button bsSize="xs" style={{marginLeft: "7px"}} bsStyle="primary" onClick={this.clearInput}>Clear</Button> : ""} */} 
            </div>
            {/*  {this.renderReportsTable()}  */}
            {this.renderOfferDialog()}
            {this.renderDeliveriesList()}
        </div>;
    }
    @autobind
    private _showDialog(hideDialog: boolean) {

        this.setState({ hideDialog: false });

    }


    private _closeDialog(hideDialog: boolean) {
        this.setState({ hideDialog: true, userOffer: { Id: 0, offer: 0, productId: "", userId: "", productEndDate: null, productDescription: "", productName: "", productCategory: "", endTime : null } });
    }

    private sortColumn(column: string) {
        this.props.requestAuctionList(column, this.props.filter, this.props.desc, this.state.name, this.state.endDate,  this.props.category);

    }

    private addNewOffer = (offer: App.UserOffer) => {
        this.props.addOffer(offer);
    }

    getValidationOffer = (): string => {
        var offer = this.state.userOffer.offer;
        if (offer === undefined || offer.toString() === "") {
            return "* Field is required.";
        } else if (isNaN(offer)) {
            return "* Must be a number.";
        }
        return "";
    }

    public copyArray = (array: any[]): any[] => {
        const newArray: any[] = [];
        for (let i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        return newArray;
    }

    remDub(array : any): any[] {
        var result = array.reduce((unique : any, o : any) => {
            if (!unique.find((obj : any) => obj.text === o.text && obj.key === o.key)) {
                unique.push(o);
            }
            return unique;
        }, []);
        return result;
    }

    public onChangeMultiSelect = (item: IDropdownOption): void => {
        // const updatedSelectedItem = new Array;
        console.log(item);
        console.log(this.props.category);
        var newCategoryList = this.remDub(this.props.category);
        const updatedSelectedItem = this.props.category ? this.copyArray(this.props.category) : [];
        console.log(updatedSelectedItem);
        if (item.selected) {
            // add the option if it's checked
            updatedSelectedItem.push(item.key);
        } else {
            // remove the option if it's unchecked
            const currIndex = updatedSelectedItem.indexOf(item.key);
            if (currIndex > -1) {
                updatedSelectedItem.splice(currIndex, 1);
            }
        }
        this.props.changeCategory(updatedSelectedItem);
        this.setState({ category: updatedSelectedItem },
            () => {
                this.handleFilterChange(updatedSelectedItem.toString(), "category");
        });
    }


    renderOfferDialog() {
        return <Dialog
            //  className="dialog-width"
            hidden={this.state.hideDialog}
            onDismiss={() => { this._closeDialog(true); }}
            dialogContentProps={{
                type: DialogType.largeHeader,
                className: "dialog",
                title: "New Offer"
            }}
            modalProps={{
                isBlocking: true,
                isDarkOverlay: true,
                className: "test",
                containerClassName: "dialog"

            }}>
            <TextField
                required
                label="User"
                placeholder="User"
                // style={{ border: this.getValidationStateCommentsNote ? "" : "1px solid #a6a6a6" }}
              //  onGetErrorMessage={this.getValidationUser}
                value={this.state.userOffer.userId ? this.state.userOffer.userId.toString() : ""}
                onChanged={value => { this.setState({ userOffer: { ...this.state.userOffer, userId: value} }); }}
            />
            <TextField
                required
                label="Offer"
                placeholder="Offer"
               // style={{ border: this.getValidationStateCommentsNote ? "" : "1px solid #a6a6a6" }}
                onGetErrorMessage={this.getValidationOffer}
                value={this.state.userOffer.offer ? this.state.userOffer.offer.toString() : ""}
                onChanged={value => { this.setState({ userOffer: { ...this.state.userOffer, offer: value } }); }}
            />

            <TextField
                required
                disabled
                label="Description"
                placeholder="Description"
                // style={{ border: this.getValidationStateCommentsNote ? "" : "1px solid #a6a6a6" }}
                value={this.state.description ? this.state.description : ""}
               // onChanged={value => { this.setState({ userOffer: { ...this.state.userOffer, offer: parseInt(value) } }); }}
            />


            <DialogFooter>
                <PrimaryButton disabled={this.state.userOffer.offer && this.state.userOffer.productId && this.state.userOffer.userId && this.getValidationOffer() == "" ? false : true} onClick={() => { this.addNewOffer(this.state.userOffer); this._closeDialog(true); }} text="Add Offer" />
                <DefaultButton onClick={() => { { this.setState({ userOffer: { ...this.state.userOffer, userId: "", productId: "", offer: 0, endTime : null } }); this._closeDialog(true); } }} text="Cancel" />
            </DialogFooter>
        </Dialog>
                };

    private renderDeliveriesList() {
        return <DetailsList
            items={this.props.auctionList ? (this.props.auctionList) : []}
            compact={true}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            columns={[
                {
                    fieldName: "Name",
                    key: "Name",
                    minWidth: 0,
                    maxWidth: 250,
                    name: "Name",
                    isResizable: true,
                    onRender: (item: App.Auction) => {
                        return <p>{item.productName ? item.productName  : ""}</p>;
                    },
                    onColumnClick: () => this.sortColumn("name"),
                    isSorted: this.props.column === "name",
                    isSortedDescending: !this.props.desc
                },
                {
                    fieldName: "description",
                    key: "description",
                    minWidth: 0,
                    maxWidth: 250,
                    name: "Description",
                    isResizable: true,
                    onRender: (item: App.Auction) => {
                        return <p> {item.productDescription} </p>;
                    },
                    onColumnClick: () => this.sortColumn("description"),
                    isSorted: this.props.column === "description",
                    isSortedDescending: this.props.desc
                },
                {
                    fieldName: "category",
                    key: "cName",
                    minWidth: 0,
                    maxWidth: 160,
                    name: "Category",
                    isResizable: true,
                    onRender: (item: App.Auction) => {
                        return <p>{item.productCategory}</p>;
                    },
                    onColumnClick: () => this.sortColumn("category"),
                    isSorted: this.props.column === "category",
                    isSortedDescending: this.props.desc
                },
                {
                    fieldName: "biddingEndDate",
                    key: "biddingEndDate",
                    minWidth: 0,
                    maxWidth: 250,
                    name: "Bidding End Date",
                    isResizable: true,
                    onRender: (item: App.Auction) => {
                        return <p>{item.biddingEndDate ? dateFormat(item.biddingEndDate, "dddd, mmmm dS, yyyy, h:MM:ss TT") : ""}</p>;
                    },
                    onColumnClick: () => this.sortColumn("enddate"),
                    isSorted: this.props.column === "enddate",
                    isSortedDescending: !this.props.desc
                },
                {
                    fieldName: "makeOffer",
                    key: "makeOffer",
                    minWidth: 0,
                    maxWidth: 120,
                    name: "Make Offer",
                    isResizable: true,
                    onRender: (item: App.Auction) => {
                        return <IconButton onClick={() => { this.setState({ userOffer: { ...this.state.userOffer, userId: "", productId: item.productId, offer: 0, endTime: item.biddingEndDate }, description: item.productDescription }); this._showDialog(false); }} iconProps={{ iconName: "Money" }} />;
                    
                }
                    
                    
                }
            ]}
            />;
    }
    public renderOverFow() {

        return (
            <div>
                <CommandBar
                    className="ts"
                    items={[
                        {
                            key: "Name",
                            name: "Search Name...",
                            onRender: (item: IContextualMenuItem) => {
                                return <SearchBox
                                    ariaLabel="Search Name..."
                                    placeholder="Search Name..."
                                    className="whitebg"
                                    onSubmit={this.filterAction}
                                    value={this.state.name ? this.state.name : ""}
                                    onChanged={value => {
                                        this.handleFilterChange(value, "name");
                                    }}
                                    underlined={true}
                                />;
                            }
                        },
                        {
                            key: "filterByCategory",
                            name: "Filter by Category",
                            onRender: (item: IContextualMenuItem) => {
                                return <CommandButton
                                    iconProps={{ iconName: "DropDown" }}
                                    text="Filter by Category"
                                    menuProps={{
                                        items: item.subMenuProps!.items,
                                        // key : item.key
                                    }}
                                />;
                            },
                            subMenuProps: {
                                items: [
                                    {
                                        key: "category",
                                        name: "Category",
                                        onRender: (it: IDropdownOption) => {
                                            return <Dropdown
                                                multiSelect
                                                key={it.key}
                                                // onRenderCaretDown={this._onRenderCaretDownType}
                                                selectedKeys={this.props.category}
                                                options={this.remDub(this.props.auctionCategoryList.sort((a, b) => a.productCategory.localeCompare(b.productCategory)).map(i => ({ text: i.productCategory, key: i.productCategory })))}
                                                onChanged={value => this.onChangeMultiSelect(value)}
                                            />;
                                        }
                                    },
                                ]
                            }
                        },
                        {
                            key: "filterByDate",
                            name: "Filter by date",
                            onRender: (item: IContextualMenuItem) => {
                                return <CommandButton
                                    iconProps={{ iconName: "Calendar" }}
                                    text="Filter by date"
                                    menuProps={{
                                        items: item.subMenuProps!.items
                                    }}
                                />;
                            },
                            subMenuProps: {
                                items: [
                                    {
                                        key: "endDate",
                                        name: "endDate",
                                        onRender: () => {
                                            return <DatePicker
                                                key="1"
                                                placeholder="Bidding End Date"
                                                value={this.state.endDate!}
                                                onSelectDate={this.endDateChangeFabric}
                                               // formatDate={this.formatDate}
                                            // disableAutoFocus={this.props.deliverydate ? true : false}
                                            />;
                                        }
                                    },
                                ]
                            }
                        }
                    ]}
                />
            </div>
        );
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

//const copyStyleOfDatePickerClearButton = {
//    backgroundColor: "#eee",
//    opacity: 1,
//    color: "#555",
//    width: 32
//};

//const filterInput = {
//    width: 120
//};

export default connect(
    (state: ApplicationState) => state.auctions,
    Auctions.actionCreators
)(withRouter(AuctionList) as any) as typeof AuctionList;
