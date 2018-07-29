import { fetch, addTask } from "domain-task";
import { Reducer } from "redux";
import { AppThunkAction } from "./";
//// -----------------
//// STATE - This defines the type of data maintained in the Redux store.
//function arrayRemoveFirstItem(array: Array<any>) {
//    if (array.length > 0) {
//        array.splice(0, 1);
//        return array;
//    } else if (array.length === 1) {
//        return array;
//    }
//    return [];
//}
export interface CallListState {
    auctionList: App.Auction[];
    column: string;
    desc: boolean;
    filter: string;

//}

//// -----------------
//// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
//// They do not themselves have any side-effects; they just describe something that is going to happen.

interface IRequestListsAction {
    type: "REQUEST_LIST";
    pageIndex: number;
    column: string;
    desc: boolean;
    filter: string;
}

interface IReceiveListAction {
    type: "RECEIVE_LIST";
//    pageIndex: number;
//    column: string;
//    desc: boolean;
//    filter: string;
//    callList: App.CallList[];
//    customerCode: string;
//    callDate: Date;
//    dueDate: Date;
//    customerName: string;
//    company: string;
}

//interface IRequestCallListOutstandingAction {
//    type: "REQUEST_CALL_LIST_OUTSTANDING";
//    outstandingPageIndex: number;
//    outstandingColumn: string;
//    outstandingDesc: boolean;
//    outstandingFilter: string;
//    outstandingRegion: Object[];
//}

//interface IReceiveCallListOutstandingAction {
//    type: "RECEIVE_CALL_LIST_OUTSTANDING";
//    outstandingList: App.OutstandingSP[];
//    outstandingPageIndex: number;
//    outstandingColumn: string;
//    outstandingDesc: boolean;
//    outstandingFilter: string;
//    outstandingRegion: any[];
//    customerCode: string;
//    callDate: Date;
//    dueDate: Date;
//    customerName: string;
//    company: string;
//}

//interface IRequestCallListOverdueAction {
//    type: "REQUEST_CALL_LIST_OVERDUE";
//    overduePageIndex: number;
//    overdueColumn: string;
//    overdueDesc: boolean;
//    overdueFilter: string;
//}

//interface IReceiveCallListOverdueAction {
//    type: "RECEIVE_CALL_LIST_OVERDUE";
//    overdueList: App.OverdueSummarySP[];
//    overduePageIndex: number;
//    overdueColumn: string;
//    overdueDesc: boolean;
//    overdueFilter: string;
//    customer: string;
//    name: string;
//    terms: string;
//    overdue_items: number;
//    overdue_days: number;
//    promise_broken: boolean;
//    gracey_days: number;
//    crdit_limit: number;
//}

//interface IReceiveCallListCompleteAction {
//    type: "RECEIVE_CALL_LIST_COMPLETE";
//    completeList: App.Complete[];
//    completePageIndex: number;
//    completeColumn: string;
//    completeDesc: boolean;
//    completeFilter: string;
//    completeRegion: any[];
//    customerCode: string;
//    callDate: Date;
//    dueDate: Date;
//    customerName: string;
//    company: string;
//}

//interface IRequestCallListCompleteAction {
//    type: "REQUEST_CALL_LIST_COMPLETE";
//    completePageIndex: number;
//    completeColumn: string;
//    completeDesc: boolean;
//    completeFilter: string;
//    completeRegion: any[];
//}

//interface IShowLoading {
//    type: "showLoading";
//}

//interface IHideLoading {
//    type: "hideLoading";
//}

//interface IRequestSettings {
//    type: "REQUEST_SETTINGS";
//}

//interface IReceiveSettings {
//    type: "RECEIVE_SETTINGS";
//    settingsList: App.Settings[];
//}

//interface IRequestO {
//    type: "REQUEST_OUTLIST";
//}

//interface IReceiveO {
//    type: "RECEIVE_OUTLIST";
//    outlist: App.OutstandingSP[];
//}

//interface IRequestC {
//    type: "REQUEST_COMPLETELIST";
//}

//interface IReceiveC {
//    type: "RECEIVE_COMPLETELIST";
//    complist: App.Complete[];
//}

//interface IPostNewSetting {
//    type: "POST_NEW_SETTING";
//    newsetting: App.Settings;
//}

//interface IChangeOutstandingPage {
//    type: "CHANGE_OUTSTANDING_PAGE";
//    outstandingPageIndex: number;
//}

//interface IChangeCompletePage {
//    type: "CHANGE_COMPLETE_PAGE";
//    completePageIndex: number;
//}

//interface IChangeOutstandingRegion {
//    type: "CHANGE_OUTSTANDING_REGION";
//    outstandingRegion: any[];
//}
//interface IChangeCompleteRegion {
//    type: "CHANGE_COMPLETE_REGION";
//    completeRegion: any[];
//}


//// Declare a "discriminated union" type. This guarantees that all references to "type" properties contain one of the
//// declared type strings (and not any other arbitrary string).
//type KnownAction = IChangeCompleteRegion | IChangeOutstandingRegion | IChangeCompletePage | IReceiveO | IRequestO | IReceiveC | IRequestC | IChangeOutstandingPage | IReceiveCallListOverdueAction | IRequestCallListOverdueAction | IPostNewSetting | IReceiveSettings | IRequestSettings | IReceiveCallListAction | IRequestCallListsAction | IReceiveCallListCompleteAction | IReceiveCallListOutstandingAction | IRequestCallListCompleteAction | IRequestCallListOutstandingAction | IShowLoading | IHideLoading;

//// ----------------
//// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
//// They don"t directly mutate state, but they can have external side-effects (such as loading data).

//export const actionCreators = {
//    changeOutstandingPage: (outstandingPageIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        dispatch({
//            type: "CHANGE_OUTSTANDING_PAGE",
//            outstandingPageIndex: outstandingPageIndex
//        });
//    },
//    changeCompletegPage: (completePageIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        dispatch({
//            type: "CHANGE_COMPLETE_PAGE",
//            completePageIndex: completePageIndex
//        });
//    },
//    changeOutstandingRegion: (region: any[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        dispatch({
//            type: "CHANGE_OUTSTANDING_REGION",
//            outstandingRegion: region
//        });
//    },
//    changeCompleteRegion: (region: any[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        dispatch({
//            type: "CHANGE_COMPLETE_REGION",
//            completeRegion: region
//        });
//    },
//    requestCallList: (pageIndex: number, column: string, filter: string = "", forceReload: boolean =
//        false, customerCode: string, customerName: string, company: string, callDate: Date = null, dueDate: Date = null):
//        AppThunkAction<KnownAction> => (dispatch, getState) => {
//            // Only load data if it"s something we don"t already have (and are not already loading)
//            // if (forceReload || pageIndex !== getState().callList.pageIndex || filter !== getState().callList.filter) {
//            let desc = getState().callList.desc;
//            if (column === getState().callList.column &&
//                pageIndex === getState().callList.pageIndex &&
//                filter === getState().callList.filter) {
//                desc = !desc;
//            }
//            let fetchTask = fetch(
//                `/api/calllist/all/${pageIndex}/${column}/${filter ? filter : "%20"}/${desc}/${customerCode ? customerCode : "%20"}/${customerName ? customerName : "%20"}/${company ? company : "%20"}/${callDate ? callDate.toISOString() : null}/${dueDate ? dueDate.toISOString() : null}`,
//                { credentials: "include" })
//                .then(response => response.json() as Promise<App.CallList[]>)
//                .then(data => {
//                    dispatch({
//                        type: "RECEIVE_CALL_LIST",
//                        pageIndex: pageIndex,
//                        filter: filter,
//                        column: column,
//                        desc: desc,
//                        callList: data,
//                        customerCode: customerCode,
//                        customerName: customerName,
//                        company: company,
//                        callDate: callDate,
//                        dueDate: dueDate

//                    });
//                    dispatch(hideLoading());
//                });

//            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//            dispatch({
//                type: "REQUEST_CALL_LIST",
//                pageIndex: pageIndex,
//                filter: filter,
//                column: column,
//                desc: desc

//            });
//            dispatch(showLoading());
//            //  }
//        },
//    requestCallListOutstanding: (pageIndex: number, column: string, filter: string, forceReload: boolean = false, customerCode: string, customerName: string, company: string, callDate: Date = null, dueDate: Date = null, regionList: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it"s something we don"t already have (and are not already loading)
//        let desc = getState().callList.outstandingDesc;
//        if (column === getState().callList.outstandingColumn && pageIndex === getState().callList.outstandingPageIndex && filter === getState().callList.outstandingFilter) {
//            desc = !desc;
//        }
//        let fetchTask = fetch(`/api/details/outstanding/${pageIndex}/${column}/${filter ? filter : "%20"}/${desc}/${customerCode ? customerCode : "%20"}/${customerName ? customerName : "%20"}/${company ? company : "%20"}/${callDate ? callDate.toISOString() : null}/${dueDate ? dueDate.toISOString() : null}/${regionList ? regionList : "%20"}`,
//            {
//                credentials: "include"
//            })
//            .then(response => response.json() as Promise<App.OutstandingSP[]>)
//            .then(data => {
//                // console.log(data);
//                dispatch({
//                    type: "RECEIVE_CALL_LIST_OUTSTANDING", outstandingPageIndex: pageIndex, outstandingFilter: filter, outstandingColumn: column, outstandingDesc: desc, outstandingList: data, outstandingRegion: regionList
//                    , customerCode: customerCode,
//                    customerName: customerName,
//                    company: company,
//                    callDate: callDate,
//                    dueDate: dueDate,

//                });
//                dispatch(hideLoading());
//            });

//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//        dispatch({
//            type: "REQUEST_CALL_LIST_OUTSTANDING", outstandingPageIndex: pageIndex, outstandingFilter: filter, outstandingColumn: column, outstandingDesc: desc, outstandingRegion: regionList

//        });
//        dispatch(showLoading());
//    },
//    requestCallComplete: (pageIndex: number, column: string, filter: string, forceReload: boolean = false, customerCode: string, customerName: string, company: string, callDate: Date = null, dueDate: Date = null, regionList: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it"s something we don"t already have (and are not already loading)
//        let desc = getState().callList.completeDesc;
//        if (column === getState().callList.completeColumn && pageIndex === getState().callList.completePageIndex && filter === getState().callList.completeFilter) {
//            desc = !desc;
//        }
//        let fetchTask = fetch(`/api/details/complete/${pageIndex}/${column}/${filter ? filter : "%20"}/${desc}/${customerCode ? customerCode : "%20"}/${customerName ? customerName : "%20"}/${company ? company : "%20"}/${callDate ? callDate.toISOString() : null}/${dueDate ? dueDate.toISOString() : null}/${regionList ? regionList : "%20"}`,
//            { credentials: "include" })
//            .then(response => response.json() as Promise<App.Complete[]>)
//            .then(data => {
//                dispatch({
//                    type: "RECEIVE_CALL_LIST_COMPLETE", completePageIndex: pageIndex, completeFilter: filter, completeColumn: column, completeDesc: desc, completeList: data, completeRegion: regionList
//                    , customerCode: customerCode,
//                    customerName: customerName,
//                    company: company,
//                    callDate: callDate,
//                    dueDate: dueDate

//                });
//                dispatch(hideLoading());
//            });

//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//        dispatch({
//            type: "REQUEST_CALL_LIST_COMPLETE", completePageIndex: pageIndex, completeFilter: filter, completeColumn: column, completeDesc: desc, completeRegion: regionList

//        });
//        dispatch(showLoading());
//    },
//    requestCallOverdue: (pageIndex: number, column: string, filter: string = "", forceReload: boolean = false, customer: string, name: string, terms: string, overdue_items: number, overdue_days: number, promise_broken: boolean, gracey_days: number, credit_limit: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it"s something we don"t already have (and are not already loading)
//        let desc = getState().callList.overdueDesc;
//        if (column === getState().callList.overdueColumn && pageIndex === getState().callList.overduePageIndex && filter === getState().callList.overdueFilter) {
//            desc = !desc;
//        }
//        let fetchTask = fetch(`/api/details/overduesummary/${pageIndex}/${column}/${filter ? filter : "%20"}/${desc}/${customer ? customer : "%20"}/${name ? name : "%20"}/${terms ? terms : "%20"}/${overdue_items ? overdue_items : null}/${overdue_days ? overdue_days : null}/${promise_broken ? promise_broken : null}/${gracey_days ? gracey_days : null}/${credit_limit ? credit_limit : null}`,
//            { credentials: "include" })
//            .then(response => response.json() as Promise<App.OverdueSummarySP[]>)
//            .then(data => {
//                dispatch({
//                    type: "RECEIVE_CALL_LIST_OVERDUE", overduePageIndex: pageIndex, overdueFilter: filter, overdueColumn: column, overdueDesc: desc, overdueList: data
//                    , customer: customer,
//                    name: name,
//                    terms: terms,
//                    overdue_days: overdue_days,
//                    overdue_items: overdue_items,
//                    promise_broken: promise_broken,
//                    gracey_days: gracey_days,
//                    crdit_limit: credit_limit

//                });
//                dispatch(hideLoading());
//            });

//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//        dispatch({
//            type: "REQUEST_CALL_LIST_OVERDUE", overduePageIndex: pageIndex, overdueFilter: filter, overdueColumn: column, overdueDesc: desc

//        });
//        dispatch(showLoading());
//    },
//    requestSettingsList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it"s something we don"t already have (and are not already loading)
//        // let desc = getState().callList.desc;
//        // if (column === getState().callList.column && pageIndex === getState().callList.pageIndex && filter === getState().callList.filter) {
//        //     desc = !desc;
//        // }
//        let fetchTask = fetch(`/api/details/settings`,
//            { credentials: "include" })
//            .then(response => response.json() as Promise<App.Settings[]>)
//            .then(data => {
//                dispatch({
//                    type: "RECEIVE_SETTINGS", settingsList: data
//                });
//                dispatch(hideLoading());
//            });

//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//        dispatch({
//            type: "REQUEST_SETTINGS"

//        });
//        dispatch(showLoading());
//    },
//    requestOutList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it"s something we don"t already have (and are not already loading)
//        // let desc = getState().callList.desc;
//        // if (column === getState().callList.column && pageIndex === getState().callList.pageIndex && filter === getState().callList.filter) {
//        //     desc = !desc;
//        // }
//        let fetchTask = fetch(`/api/details/outlist`,
//            { credentials: "include" })
//            .then(response => response.json() as Promise<App.OutstandingSP[]>)
//            .then(data => {
//                dispatch({
//                    type: "RECEIVE_OUTLIST", outlist: data
//                });
//                dispatch(hideLoading());
//            });

//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//        dispatch({
//            type: "REQUEST_OUTLIST"

//        });
//        dispatch(showLoading());
//    },
//    requestCompleteList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        // Only load data if it"s something we don"t already have (and are not already loading)
//        // let desc = getState().callList.desc;
//        // if (column === getState().callList.column && pageIndex === getState().callList.pageIndex && filter === getState().callList.filter) {
//        //     desc = !desc;
//        // }
//        let fetchTask = fetch(`/api/details/complist`,
//            { credentials: "include" })
//            .then(response => response.json() as Promise<App.Complete[]>)
//            .then(data => {
//                dispatch({
//                    type: "RECEIVE_COMPLETELIST", complist: data
//                });
//                dispatch(hideLoading());
//            });

//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
//        dispatch({
//            type: "REQUEST_COMPLETELIST"

//        });
//        dispatch(showLoading());
//    },
//    updateSetting: (setting: App.Settings): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        let fetchTask = fetch(`/api/details/settings/update`,
//            {
//                credentials: "include",
//                method: "post",
//                headers: {
//                    "Content-type": "application/json"
//                },
//                body: JSON.stringify(setting)
//            }).then(response => {
//                if (response.status !== 200) {
//                    // toastr.error(`Failed to update RM `);

//                } else {
//                    // toastr.success(`Successfully updated RM`);
//                }
//                return response.json() as Promise<App.Settings>;
//            }).then(data => {
//                // console.log(data);
//                // dispatch({ type: "REQUEST_RM_CONFIG"});
//            });
//        addTask(fetchTask);
//    },
//    AddNewSettingInDb: (setting: App.Settings): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        let fetchTask = fetch(`/api/details/settings/new`,
//            {
//                credentials: "include",
//                method: "post",
//                headers: {
//                    "Content-type": "application/json"
//                },
//                body: JSON.stringify(setting)
//            })
//            .then(response => {
//                if (response.status !== 201) {
//                    // toastr.error(`Failed to add new Section Dropdown `);

//                } else {
//                    // toastr.success(`Successfully added new Section Dropdown`);
//                }
//                return response.json() as Promise<App.Settings>;

//            })
//            .then(data => {
//                // console.log(data);
//                // dispatch({ type: "REQUEST_RM_CONFIG"});
//            });
//        addTask(fetchTask);
//        dispatch({ type: "POST_NEW_SETTING", newsetting: setting });
//    },
//    deleteSetting: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
//        let fetchTask = fetch(`/api/details/settings/delete`,
//            {
//                credentials: "include",
//                method: "delete",
//                headers: {
//                    "Content-type": "application/json"
//                },
//                body: JSON.stringify(id)
//            }).then(response => {
//                if (response.status !== 201) {
//                    //  toastr.error(`Failed to delete RM `);

//                } else {
//                    // toastr.success(`Successfully deleted RM`);
//                }
//                return response.json() as Promise<App.Settings>;
//            })
//            .then(data => {
//                //  console.log(data);
//                // dispatch({ type: "REQUEST_RM_CONFIG"});
//            });
//        addTask(fetchTask);
//    }
//};

//// ----------------
//// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

//const unloadedState: CallListState = {
//    callList: [], pageIndex: null, column: null, filter: null, desc: true, completeList: [], outstandingList: [], outstandingColumn: null,
//    outstandingDesc: true, outstandingFilter: null, outstandingPageIndex: null, outstandingPageCount: "0", outstandingRegion: ["none"], pageCount: "0", completeColumn: null, completeRegion: ["none"],
//    completeDesc: true, completeFilter: null, completePageCount: "0", completePageIndex: null, settingsList: [], overdueList: [], overdueColumn: null, overdueDesc: null, overdueFilter: null, overduePageCount: "0", overduePageIndex: null, outlist: [], complist: []
//};

//export const reducer: Reducer<CallListState> = (state: CallListState, action: KnownAction) => {
//    switch (action.type) {
//        case "CHANGE_OUTSTANDING_PAGE":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: action.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                outstandingRegion: state.outstandingRegion,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist,
//                complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "CHANGE_COMPLETE_PAGE":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: action.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                outstandingRegion: state.outstandingRegion,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist,
//                complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "CHANGE_OUTSTANDING_REGION":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                outstandingRegion: action.outstandingRegion,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "CHANGE_COMPLETE_REGION":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                outstandingRegion: state.outstandingRegion,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: action.completeRegion
//            };
//        case "REQUEST_CALL_LIST":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: action.desc,
//                filter: action.filter,
//                pageIndex: action.pageIndex,
//                column: action.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                outstandingRegion: state.outstandingRegion,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "RECEIVE_CALL_LIST":
//            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
//            // handle out-of-order responses.
//            if (action.pageIndex === state.pageIndex) {
//                var pages = action.callList[0].id.toString();
//                // get number of pages form first item of list, and delete item after
//                // delete action.callList[0];
//                arrayRemoveFirstItem(action.callList);
//                return {
//                    outstandingList: state.outstandingList,
//                    completeList: state.completeList,
//                    callList: action.callList,
//                    desc: action.desc,
//                    filter: action.filter,
//                    pageIndex: action.pageIndex,
//                    column: action.column,
//                    pageCount: pages,
//                    completePageIndex: state.completePageIndex,
//                    completePageCount: state.completePageCount,
//                    completeFilter: state.completeFilter,
//                    completeDesc: state.completeDesc,
//                    completeColumn: state.completeColumn,
//                    outstandingPageCount: state.outstandingPageCount,
//                    outstandingPageIndex: state.outstandingPageIndex,
//                    outstandingDesc: state.outstandingDesc,
//                    outstandingRegion: state.outstandingRegion,
//                    outstandingColumn: state.outstandingColumn,
//                    outstandingFilter: state.outstandingFilter,
//                    settingsList: state.settingsList,
//                    overdueColumn: state.overdueColumn,
//                    overdueList: state.overdueList,
//                    overdueDesc: state.overdueDesc,
//                    overdueFilter: state.overdueFilter,
//                    overduePageCount: state.overduePageCount,
//                    overduePageIndex: state.overduePageIndex,
//                    outlist: state.outlist, complist: state.complist,
//                    completeRegion: state.completeRegion
//                };
//            }
//            break;
//        case "RECEIVE_SETTINGS":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: action.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "REQUEST_SETTINGS":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "RECEIVE_OUTLIST":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: action.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "REQUEST_OUTLIST":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "RECEIVE_COMPLETELIST":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: action.complist,
//                completeRegion: state.completeRegion
//            };
//        case "REQUEST_COMPLETELIST":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "REQUEST_CALL_LIST_OUTSTANDING":
//            return {
//                completeList: state.completeList,
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: action.outstandingPageIndex,
//                outstandingRegion: action.outstandingRegion,
//                outstandingDesc: action.outstandingDesc,
//                outstandingColumn: action.outstandingColumn,
//                outstandingFilter: action.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "RECEIVE_CALL_LIST_OUTSTANDING":
//            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
//            // handle out-of-order responses.
//            if (action.outstandingPageIndex === state.outstandingPageIndex) {
//                var pagesOutstanding = action.outstandingList[0].customer_code;
//                // get number of pages form first item of list, and delete item after
//                // delete action.outstandingList[0];
//                arrayRemoveFirstItem(action.outstandingList);
//                return {
//                    callList: state.callList,
//                    completeList: state.completeList,
//                    outstandingList: action.outstandingList,
//                    desc: state.desc,
//                    filter: state.filter,
//                    pageIndex: state.pageIndex,
//                    column: state.column,
//                    pageCount: state.pageCount,
//                    completePageIndex: state.completePageIndex,
//                    completePageCount: state.completePageCount,
//                    completeFilter: state.completeFilter,
//                    completeDesc: state.completeDesc,
//                    completeColumn: state.completeColumn,
//                    outstandingPageCount: pagesOutstanding,
//                    outstandingPageIndex: action.outstandingPageIndex,
//                    outstandingDesc: action.outstandingDesc,
//                    outstandingColumn: action.outstandingColumn,
//                    outstandingRegion: action.outstandingRegion,
//                    outstandingFilter: action.outstandingFilter,
//                    settingsList: state.settingsList,
//                    overdueColumn: state.overdueColumn,
//                    overdueList: state.overdueList,
//                    overdueDesc: state.overdueDesc,
//                    overdueFilter: state.overdueFilter,
//                    overduePageCount: state.overduePageCount,
//                    overduePageIndex: state.overduePageIndex,
//                    outlist: state.outlist, complist: state.complist,
//                    completeRegion: state.completeRegion
//                };
//            } break;
//        case "REQUEST_CALL_LIST_COMPLETE":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: action.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: action.completeFilter,
//                completeDesc: action.completeDesc,
//                completeColumn: action.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingRegion: state.outstandingRegion,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "RECEIVE_CALL_LIST_COMPLETE":
//            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
//            // handle out-of-order responses.
//            if (action.completePageIndex === state.completePageIndex) {
//                // get number of pages form first item of list, and delete item after
//                var pagesOpen = action.completeList[0].customer_code;
//                arrayRemoveFirstItem(action.completeList);
//                // delete action.completeList[0];
//                return {
//                    callList: state.callList,
//                    outstandingList: state.outstandingList,
//                    completeList: action.completeList,
//                    desc: state.desc,
//                    filter: state.filter,
//                    pageIndex: state.pageIndex,
//                    column: state.column,
//                    pageCount: state.pageCount,
//                    completePageIndex: action.completePageIndex,
//                    completePageCount: pagesOpen,
//                    completeFilter: action.completeFilter,
//                    completeDesc: action.completeDesc,
//                    completeColumn: action.completeColumn,
//                    outstandingPageCount: state.outstandingPageCount,
//                    outstandingPageIndex: state.outstandingPageIndex,
//                    outstandingDesc: state.outstandingDesc,
//                    outstandingRegion: state.outstandingRegion,
//                    outstandingColumn: state.outstandingColumn,
//                    outstandingFilter: state.outstandingFilter,
//                    settingsList: state.settingsList,
//                    overdueColumn: state.overdueColumn,
//                    overdueList: state.overdueList,
//                    overdueDesc: state.overdueDesc,
//                    overdueFilter: state.overdueFilter,
//                    overduePageCount: state.overduePageCount,
//                    overduePageIndex: state.overduePageIndex,
//                    outlist: state.outlist, complist: state.complist,
//                    completeRegion: state.completeRegion
//                };
//            } break;
//        case "POST_NEW_SETTING":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                newsetting: action.newsetting,
//                overdueColumn: state.overdueColumn,
//                overdueList: state.overdueList,
//                overdueDesc: state.overdueDesc,
//                overdueFilter: state.overdueFilter,
//                overduePageCount: state.overduePageCount,
//                overduePageIndex: state.overduePageIndex,
//                outstandingRegion: state.outstandingRegion,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "RECEIVE_CALL_LIST_OVERDUE":
//            if (action.overduePageIndex === state.overduePageIndex) {
//                // get number of pages form first item of list, and delete item after
//                var pagesOverdue = action.overdueList[0].customer;
//                // delete action.overdueList[0];
//                arrayRemoveFirstItem(action.overdueList);
//                return {
//                    callList: state.callList,
//                    outstandingList: state.outstandingList,
//                    completeList: state.completeList,
//                    desc: state.desc,
//                    filter: state.filter,
//                    pageIndex: state.pageIndex,
//                    column: state.column,
//                    pageCount: state.pageCount,
//                    completePageIndex: state.completePageIndex,
//                    completePageCount: state.completePageCount,
//                    completeFilter: state.completeFilter,
//                    completeDesc: state.completeDesc,
//                    completeColumn: state.completeColumn,
//                    outstandingPageCount: state.outstandingPageCount,
//                    outstandingPageIndex: state.outstandingPageIndex,
//                    outstandingDesc: state.outstandingDesc,
//                    outstandingColumn: state.outstandingColumn,
//                    outstandingFilter: state.outstandingFilter,
//                    settingsList: state.settingsList,
//                    overdueColumn: action.overdueColumn,
//                    outstandingRegion: state.outstandingRegion,
//                    overdueList: action.overdueList,
//                    overdueDesc: action.overdueDesc,
//                    overdueFilter: action.overdueFilter,
//                    overduePageCount: pagesOverdue,
//                    overduePageIndex: action.overduePageIndex,
//                    outlist: state.outlist, complist: state.complist,
//                    completeRegion: state.completeRegion
//                };
//            } break;
//        case "REQUEST_CALL_LIST_OVERDUE":
//            return {
//                callList: state.callList,
//                outstandingList: state.outstandingList,
//                completeList: state.completeList,
//                desc: state.desc,
//                filter: state.filter,
//                pageIndex: state.pageIndex,
//                column: state.column,
//                pageCount: state.pageCount,
//                completePageIndex: state.completePageIndex,
//                completePageCount: state.completePageCount,
//                completeFilter: state.completeFilter,
//                completeDesc: state.completeDesc,
//                completeColumn: state.completeColumn,
//                outstandingPageCount: state.outstandingPageCount,
//                outstandingPageIndex: state.outstandingPageIndex,
//                outstandingDesc: state.outstandingDesc,
//                outstandingColumn: state.outstandingColumn,
//                outstandingFilter: state.outstandingFilter,
//                settingsList: state.settingsList,
//                overdueColumn: action.overdueColumn,
//                outstandingRegion: state.outstandingRegion,
//                overdueList: state.overdueList,
//                overdueDesc: action.overdueDesc,
//                overdueFilter: action.overdueFilter,
//                overduePageCount: state.completePageCount,
//                overduePageIndex: action.overduePageIndex,
//                outlist: state.outlist, complist: state.complist,
//                completeRegion: state.completeRegion
//            };
//        case "showLoading":
//            return;
//        case "hideLoading":
//            return;
//        default:
//            // The following line guarantees that every action in the KnownAction union has been covered by a case above
//            const exhaustiveCheck: never = action;
//    }

//    return state || unloadedState;
//};
