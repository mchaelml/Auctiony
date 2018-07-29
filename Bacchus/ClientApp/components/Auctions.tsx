import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as UserState from "../store/User";
import * as dateFormat from "dateformat";
import { DetailsList, SelectionMode, DetailsListLayoutMode, IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { DatePicker, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton, IButtonProps, IconButton } from "office-ui-fabric-react/lib/Button";
import { BaseComponent, css } from "office-ui-fabric-react/lib/Utilities";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/components/ContextualMenu";
import { CommandButton } from "office-ui-fabric-react/lib/components/Button";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Image, ImageFit, IImageProps } from "office-ui-fabric-react/lib/Image";
import { IOverflowSetItemProps, OverflowSet } from "office-ui-fabric-react/lib/OverflowSet";
import * as CallListState from "../store/CallListStore";
import * as CreditCheckStore from "../store/CreditCheckStore";
import Pagination from "../components/Pagination";

type CreditListProps =
    & CallListState.CallListState
    & UserState.UserState
    & BaseComponent
    & CreditCheckStore.ICreditCheckState
    & typeof CreditCheckStore.actionCreators
    & typeof UserState.actionCreators
    & typeof CallListState.actionCreators
    & RouteComponentProps<{ pageIndex: string, filter: string }>; //  ... plus incoming routing parameters

interface ICreditListState {
    customerName: string;
    customerCode: string;
    company: string;
    dueDate: Date;
    callDate: Date;
    pageIndex: number;
}

let imageProps: IImageProps = {
    src: "http:// placehold.it/500x500",
    imageFit: ImageFit.cover,
    maximizeFrame: true
};
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


class CreditList extends React.Component<CreditListProps, ICreditListState> {
    constructor(props : any) {
        super(props);
        this.state = {
            customerCode: "",
            customerName: "",
            company: "",
            callDate: null,
            dueDate: null,
            pageIndex: 1
        };
        this._onClickHandler = this._onClickHandler.bind(this);
    }
    componentWillMount() {
        document.title = "Credit Control Application";
        // console.log("started testi : ");
        //  This method runs when the component is first added to the page
        let pageIndex = parseInt(this.props.match.params.pageIndex) || 1;
        let filter = this.props.match.params.filter;

        this.props.requestCallList(this.props.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, this.state.callDate, this.state.dueDate);

    }
    componentWillReceiveProps(nextProps: CreditListProps) {
        //  This method runs when incoming props (e.g., route params) change
        let pageIndex = parseInt(nextProps.match.params.pageIndex) || 1;
        let filter = nextProps.match.params.filter;
    }
    filterAction = event => {
        event.preventDefault();
        this.props.requestCallList(this.props.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, this.state.callDate, this.state.dueDate);
        //  this.props.history.push(`${SERVICE_URL}/calllist/all/${this.props.filter}/1`);
    }
    onRowClick = (path: string) => {
        this.props.history.push(path);
    }

    callDateChangeFabric = (date: Date) => {
        this.setState({ callDate: date });
        //  console.log(this.state.deliverydate);
        this.props.requestCallList(this.props.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, date, this.state.dueDate);
        // this.props.history.push(`${SERVICE_URL}/calllist/all/${this.props.filter}/1`);
    }
    formatDate(date: Date) {
        return DayPickerStrings.shortMonths[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear();
    }
    dueDateChangeFabric = (date: Date) => {
        this.setState({ dueDate: date });
        //  console.log(this.state.deliverydate);
        this.props.requestCallList(this.props.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, this.state.callDate, date);
        // this.props.history.push(`${SERVICE_URL}/calllist/all/${this.props.filter}/1`);
    }

    //  history.push + pageIndex=1 is needed here to change to the 1st page after filtering to not get stuck on an out of range page
    handleFilterChange = (value, element) => {
        //  var value = e.target.value;
        switch (element) {
            case "customerName":
                this.setState({ customerName: value });
                this.props.requestCallList(null, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, value, this.state.company, this.state.callDate, this.state.dueDate);
                //  this.props.history.push(`${SERVICE_URL}/deliveries/${this.props.filter}/1`);
                break;

            case "customerCode":
                this.setState({ customerCode: value });
                //  if (value !== "") {
                this.props.requestCallList(null, this.props.column || "customerCode", this.props.filter, this.props.desc, value, this.state.customerName, this.state.company, this.state.callDate, this.state.dueDate);
                //  this.props.history.push(`${SERVICE_URL}/deliveries/${this.props.filter}/1`);
                //  }
                break;
            case "company":
                this.setState({ company: value });
                //  if (value !== "") {
                this.props.requestCallList(null, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, value, this.state.callDate, this.state.dueDate);
                //  this.props.history.push(`${SERVICE_URL}/deliveries/${this.props.filter}/1`);
                // }
                break;
        }
    }
    onClickNewReport = () => {

        this.props.history.push(`/calllist/0`);
    }


    private renderFilters() {
        return <div>
            {this.state.customerCode == null || this.state.customerCode === undefined || this.state.customerCode === "" ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Customer Code : <b style={{ paddingLeft: 5 }}>{" " + this.state.customerCode}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("code"); }} /></div>}
            {this.state.customerName == null || this.state.customerName === undefined || this.state.customerName === "" ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Customer Name : <b style={{ paddingLeft: 5 }}>{" " + this.state.customerName}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("name"); }} /></div>}
            {this.state.company == null || this.state.company === undefined || this.state.company === "" ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Company : <b style={{ paddingLeft: 5 }}>{" " + this.state.company}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("company"); }} /></div>}
            {this.state.callDate == null || this.state.callDate === undefined ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Call Date : <b style={{ paddingLeft: 5 }}>{" " + dateFormat(this.state.callDate, "dd/mm/yyyy")}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("calldate"); }} /></div>}
            {this.state.dueDate == null || this.state.dueDate === undefined ? "" : <div className="vertical-center" style={{ paddingRight: 10 }}>{" "}Due Date : <b style={{ paddingLeft: 5 }}>{" " + dateFormat(this.state.dueDate, "dd/mm/yyyy")}</b><IconButton style={{ marginTop: 0 }} iconProps={{ iconName: "RemoveFilter" }} onClick={() => { this.clearInput("duedate"); }} /></div>}
        </div>;
    }


    clearInput = (input: string = "") => {
        switch (input) {
            case "code":
                this.setState({ customerCode: null });
                this.props.requestCallList(this.state.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, "", this.state.customerName, this.state.company, this.state.callDate, this.state.dueDate);
                break;
            case "name":
                this.setState({ customerName: null });
                this.props.requestCallList(this.state.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, "", this.state.company, this.state.callDate, this.state.dueDate);
                break;
            case "company":
                this.setState({ company: null });
                this.props.requestCallList(this.state.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, "", this.state.callDate, this.state.dueDate);
                break;


            default:
                this.setState({
                    customerCode: "", customerName: "", company: "", callDate: null, dueDate: null
                });
                this.props.requestCallList(this.state.pageIndex, this.props.column || "customerCode", this.props.filter, this.props.desc, "", "", "", null, null);
        }
    }

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public render() {
        return <div className="ms-slideRightIn10">
            {this.renderOverFow()}
            <div className="ms-Grid-row" style={{ marginLeft: 0, marginRight: 10 }}>
                {this.renderFilters()}
                {/*  {this.filterActive() ? <Button bsSize="xs" style={{marginLeft: "7px"}} bsStyle="primary" onClick={this.clearInput}>Clear</Button> : ""}  */}
            </div>
            {/*  {this.renderReportsTable()}  */}
            {this.renderDeliveriesList()}
            {this.renderPagination()}
        </div>;
    }

    private sortColumn(column: string) {
        this.props.requestCallList(this.props.pageIndex,
            column,
            this.props.filter,
            this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, this.state.callDate, this.state.dueDate
        );
    }

    arrayRemoveFirstItem(array: Array<any>) {
        if (array.length > 1) {
            array.splice(0, 1);
            return array;
        } else if (array.length === 1) {
            return array;
        }
        return [];
    }

    private renderDeliveriesList() {
        return <DetailsList
            items={this.props.callList ? (this.props.callList) : []}
            compact={true}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            columns={[
                {
                    fieldName: "callDate",
                    key: "callDate",
                    minWidth: 0,
                    maxWidth: 120,
                    name: "Call Date",
                    isResizable: true,
                    onRender: (item: App.CallList) => {
                        return <p>{item.callDate ? dateFormat(item.callDate, "dd/mm/yyyy") : ""}</p>;
                    },
                    onColumnClick: () => this.sortColumn("callDate"),
                    isSorted: this.props.column === "callDate",
                    isSortedDescending: !this.props.desc
                },
                {
                    fieldName: "customerCode",
                    key: "customerCode",
                    minWidth: 0,
                    maxWidth: 100,
                    name: "Customer Code",
                    isResizable: true,
                    onRender: (item: App.CallList) => {
                        return <p> {item.customerCode} </p>;
                    },
                    onColumnClick: () => this.sortColumn("customerCode"),
                    isSorted: this.props.column === "customerCode",
                    isSortedDescending: this.props.desc
                },
                {
                    fieldName: "cName",
                    key: "cName",
                    minWidth: 0,
                    maxWidth: 160,
                    name: "Customer Name",
                    isResizable: true,
                    onRender: (item: App.CallList) => {
                        return <p>{item.customerName}</p>;
                    },
                    onColumnClick: () => this.sortColumn("customerName"),
                    isSorted: this.props.column === "customerName",
                    isSortedDescending: this.props.desc
                },
                {
                    fieldName: "due_date",
                    key: "due_date",
                    minWidth: 0,
                    maxWidth: 120,
                    name: "Due Date",
                    isResizable: true,
                    onRender: (item: App.CallList) => {
                        return <p>{item.dueDate ? dateFormat(item.dueDate, "dd/mm/yyyy") : ""}</p>;
                    },
                    onColumnClick: () => this.sortColumn("due_date"),
                    isSorted: this.props.column === "due_date",
                    isSortedDescending: !this.props.desc
                },
                {
                    fieldName: "overdue",
                    key: "overdue",
                    minWidth: 0,
                    maxWidth: 100,
                    isResizable: true,
                    name: "Overdue",

                    onRender: (item: App.CallList) => {
                        return <p> {item.overDue} </p>;
                    },
                    onColumnClick: () => this.sortColumn("overdue"),
                    isSorted: this.props.column === "overdue",
                    isSortedDescending: !this.props.desc
                },
                {
                    fieldName: "company",
                    key: "company",
                    minWidth: 0,
                    maxWidth: 80,
                    name: "Company",
                    isResizable: true,
                    //  onRender: (item: App.Report) => {
                    //      return <p>{dateFormat(item.productionDate, "dd/mm/yyyy")}</p>;
                    //  },
                    onRender: (item: App.CallList) => {
                        return <p> {item.company} </p>;
                    },
                    onColumnClick: () => this.sortColumn("company"),
                    isSorted: this.props.column === "company",
                    isSortedDescending: this.props.desc
                }
            ]}
            onActiveItemChanged={(item, index) => {
                this.onRowClick(`/calllist/getcustomer/${item.customerCode.trim()}/${item.id}`);
            }} />;
    }
    public renderOverFow() {

        return (
            <div>
                <CommandBar
                    className="ts"
                    items={[
                        {
                            key: "Code",
                            name: "Search Customer Code...",
                            onRender: (item: IContextualMenuItem) => {
                                return <SearchBox
                                    ariaLabel="Search Customer Code..."
                                    placeholder="Search Customer Code..."
                                    className="whitebg"
                                    onSubmit={this.filterAction}
                                    value={this.state.customerCode ? this.state.customerCode : ""}
                                    onChanged={value => {
                                        this.handleFilterChange(value, "customerCode");
                                    }}
                                    underlined={true}
                                />;
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
                                        key: "calldate",
                                        name: "Call Date",
                                        onRender: () => {
                                            return <DatePicker
                                                key="1"
                                                placeholder="Call Date"
                                                value={this.state.callDate}
                                                onSelectDate={this.callDateChangeFabric}
                                                formatDate={this.formatDate}
                                            // disableAutoFocus={this.props.deliverydate ? true : false}
                                            />;
                                        }
                                    },
                                    {
                                        key: "duedate",
                                        name: "Due Date",
                                        onRender: () => {
                                            return <DatePicker
                                                key="2"
                                                placeholder="Due Date"
                                                value={this.state.dueDate}
                                                formatDate={this.formatDate}
                                                onSelectDate={this.dueDateChangeFabric}
                                            />;
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            key: "filterByText",
                            name: "Filter by",
                            onRender: (item: IContextualMenuItem) => {
                                return <CommandButton
                                    iconProps={{ iconName: "TextField" }}
                                    text="Filter by"
                                    menuProps={{
                                        items: item.subMenuProps!.items
                                    }}
                                />;
                            },
                            subMenuProps: {
                                items: [
                                    {
                                        key: "customercode",
                                        name: "Customer Code",
                                        onRender: () => {
                                            return <TextField
                                                // placeholder="Id"
                                                key="1"
                                                onSubmit={this.filterAction}
                                                value={this.state.customerCode}
                                                onChanged={value => { this.handleFilterChange(value, "customerCode"); }}
                                                placeholder="Customer Code"
                                            />;
                                        }
                                    },
                                    {
                                        key: "customername",
                                        name: "Customer Name",
                                        onRender: () => {
                                            return <TextField
                                                key="2"
                                                placeholder="Customer Name"
                                                value={this.state.customerName}
                                                onChanged={value => this.handleFilterChange(value, "customerName")}
                                                onSubmit={this.filterAction}
                                            />;
                                        }
                                    },
                                    {
                                        key: "company",
                                        name: "Company",
                                        onRender: () => {
                                            return <TextField
                                                key="3"
                                                placeholder="Company"
                                                value={this.state.company}
                                                onChanged={value => this.handleFilterChange(value, "company")}
                                                onSubmit={this.filterAction}
                                            />;
                                        }
                                    }
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

    private renderPagination() {
        return <div className="ms-clearfix" style={{ textAlign: "center", paddingTop: 15 }}>
            {parseInt(this.props.pageCount) > 1 ?
                <Pagination
                    currentPage={this.props.pageIndex ? this.props.pageIndex : 1}
                    totalPages={parseInt(this.props.pageCount) ? parseInt(this.props.pageCount) : 1}
                    onChange={eventKey => {
                        this.setState({ pageIndex: eventKey });
                        this.props.requestCallList(eventKey, this.props.column || "callDate", this.props.filter, this.props.desc, this.state.customerCode, this.state.customerName, this.state.company, this.state.callDate, this.state.dueDate);
                    }}
                /> : ""}
        </div>;
    }
}

const copyStyleOfDatePickerClearButton = {
    backgroundColor: "#eee",
    opacity: 1,
    color: "#555",
    width: 32
};

const filterInput = {
    width: 120
};

export default connect(
    (state: ApplicationState) => ({ ...state.callList, ...state.user }),
    {
        ...CallListState.actionCreators,
        ...UserState.actionCreators
    } //  Selects which action creators are merged into the component"s props
)(withRouter(CreditList) as any) as typeof CreditList;
