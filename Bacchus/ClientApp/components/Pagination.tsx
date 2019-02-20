import * as React from "react";
//import * as ReactUltimatePagination from "react-ultimate-pagination";
var ReactUltimatePagination = require('react-ultimate-pagination');
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

function Page(props : any) {
    return <DefaultButton primary={props.isActive} onClick={props.onClick} text={props.value} />;
}

function Ellipsis(props: any) {
    return <DefaultButton onClick={props.onClick} text="..." />;
}

function FirstPageLink(props: any) {
    return <DefaultButton onClick={props.onClick} iconProps={{ iconName: "DoubleChevronLeft" }} />;
}

function PreviousPageLink(props: any) {
    return <DefaultButton onClick={props.onClick} iconProps={{ iconName: "ChevronLeft" }} />;
}

function NextPageLink(props: any) {
    return <DefaultButton onClick={props.onClick} iconProps={{ iconName: "ChevronRight" }} />;
}

function LastPageLink(props: any) {
    return <DefaultButton onClick={props.onClick} iconProps={{ iconName: "DoubleChevronRight" }} />;
}

function Wrapper(props: any) {
    return <div className="pagination">{props.children}</div>;
}

var itemTypeToComponent = {
    "PAGE": Page,
    "ELLIPSIS": Ellipsis,
    "FIRST_PAGE_LINK": FirstPageLink,
    "PREVIOUS_PAGE_LINK": PreviousPageLink,
    "NEXT_PAGE_LINK": NextPageLink,
    "LAST_PAGE_LINK": LastPageLink
};

var Pagination = ReactUltimatePagination.createUltimatePagination({
    itemTypeToComponent: itemTypeToComponent,
    WrapperComponent: Wrapper
});

export default Pagination;

