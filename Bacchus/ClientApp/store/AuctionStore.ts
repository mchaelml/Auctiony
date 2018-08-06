import { fetch, addTask } from "domain-task";
import { Reducer, Action, ActionCreator } from "redux";
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
export interface AuctionsListState {
    auctionList: App.Auction[];
    auctionCategoryList: App.Auction[];
    winners: App.UserOffer[];
    column: string;
    desc: boolean;
    filter: string;
    category : string[]

}

//// -----------------
//// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
//// They do not themselves have any side-effects; they just describe something that is going to happen.

interface IRequestListsAction {
    type: "REQUEST_LIST";
    column: string;
    desc: boolean;
    filter: string;
    category: any[];
}

interface IReceiveListAction {
    type: "RECEIVE_LIST";
    column: string;
    desc: boolean;
    filter: string;
    category: any[];
    name: string;
    endDate: Date | null;
    auctionList: App.Auction[];
}
interface IChangeCategory {
    type: "CHANGE_CATEGORY";
    category: any[];
}
interface IRequestC {
    type: "REQUEST_C_LIST";
}
interface IAddNewOffer {
    type: "ADD_OFFER";
    newOffer: App.UserOffer;
}

interface IReceiveC {
    type: "RECEIVE_C_LIST";
    auctionCategoryList: App.Auction[];
}

interface IReceiveWinners {
    type: "RECEVE_WINNERS";
    winners: App.UserOffer[];
}

interface IRequestWinners {
    type: "REQUEST_WINNERS";
}


//// Declare a "discriminated union" type. This guarantees that all references to "type" properties contain one of the
//// declared type strings (and not any other arbitrary string).
type KnownAction = IReceiveListAction | IRequestListsAction | IChangeCategory | IReceiveC | IRequestC | IAddNewOffer | IReceiveWinners | IRequestWinners
//// ----------------
//// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
//// They don"t directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestAuctionList: (column: string, filter: string = "", forceReload: boolean = false, name: string, endDate: (Date | null) = null, category: any):
        AppThunkAction<KnownAction> => (dispatch, getState) => {
            // Only load data if it"s something we don"t already have (and are not already loading)
            // if (forceReload || pageIndex !== getState().callList.pageIndex || filter !== getState().callList.filter) {
            let desc = getState().auctions.desc;
            if (column === getState().auctions.column &&
                filter === getState().auctions.filter) {
                desc = !desc;
            }
            let fetchTask = fetch(
                `/api/auctions/${column ? column : "%20"}/${filter ? filter : "%20"}/${desc ? desc : false}/${name ? name : "%20"}/${endDate ? endDate.toISOString() :  null}/${category ? category : "%20"}`,
                { credentials: "include" }
            ).then(response => {
                    if (response.status == 200) {
                        // toastr.error(`Failed to update RM `);
                        console.log(response.body);
                    } else {
                        // toastr.success(`Successfully updated RM`);
                    }
                    return response.json() as Promise<App.Auction[]>;
                })
        
                .then(data => {
                    dispatch({
                        type: "RECEIVE_LIST",
                        filter: filter,
                        column: column,
                        desc: desc,
                        name: name,
                        endDate: endDate,
                        auctionList: data,
                        category: category

                    });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({
                type: "REQUEST_LIST",
                filter: filter,
                column: column,
                desc: desc,
                category: category

            });
        },
    addOffer: (offer: App.UserOffer): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let fetchTask = fetch(`/api/newOffer`,
            {
                method: "POST", body: JSON.stringify(offer), headers: new Headers({'Content-Type': 'application/json'})
               // headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json() as Promise<App.UserOffer>)
            .then(data => {
                console.log(data);
                dispatch({
                    type: "ADD_OFFER",
                    newOffer: offer
                });
            });
        addTask(fetchTask); 

    },
    changeCategory: (category: any[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
            dispatch({
                type: "CHANGE_CATEGORY",
                category: category
            });
    },
    requestCompleteList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it"s something we don"t already have (and are not already loading)
        // let desc = getState().callList.desc;
        // if (column === getState().callList.column && pageIndex === getState().callList.pageIndex && filter === getState().callList.filter) {
        //     desc = !desc;
        // }
        let fetchTask = fetch(`/api/clist`,
            { credentials: "include" })
            .then(response => response.json() as Promise<App.Auction[]>)
            .then(data => {
                dispatch({
                    type: "RECEIVE_C_LIST", auctionCategoryList: data
                });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({
            type: "REQUEST_C_LIST"

        });
    },

    requestWinners: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`/api/winners`,
            { credentials: "include" })
            .then(response => response.json() as Promise<App.UserOffer[]>)
            .then(data => {
                dispatch({
                    type: "RECEVE_WINNERS", winners: data
                });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({
            type: "REQUEST_WINNERS"

        });
    }
};

//// ----------------
//// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: AuctionsListState = {
    auctionList: [], column: "", desc: false, filter: "", category: ["none"], auctionCategoryList: [], winners : []
};

export const reducer: Reducer<AuctionsListState> = (state: AuctionsListState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case "REQUEST_LIST":
            return {
                auctionList: state.auctionList,
                desc: action.desc,
                filter: action.filter,
                column: action.column,
                category: state.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: state.winners
            };
        case "RECEIVE_LIST":
            return {
                auctionList: action.auctionList,
                desc: action.desc,
                filter: action.filter,
                column: action.column,
                category: state.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: state.winners
            };
        case "CHANGE_CATEGORY":
            return {
                auctionList: state.auctionList,
                desc: state.desc,
                column: state.column,
                filter: state.filter,
                category: action.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: state.winners
            }
        case "RECEIVE_C_LIST":
            return {
                auctionList: state.auctionList,
                desc: state.desc,
                column: state.column,
                filter: state.filter,
                category: state.category,
                auctionCategoryList: action.auctionCategoryList,
                winners: state.winners
            }
        case "REQUEST_C_LIST":
            return {
                auctionList: state.auctionList,
                desc: state.desc,
                column: state.column,
                filter: state.filter,
                category: state.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: state.winners
            }
         case "ADD_OFFER":
            return {
                auctionList: state.auctionList,
                desc: state.desc,
                column: state.column,
                filter: state.filter,
                category: state.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: state.winners
            }
        case "REQUEST_WINNERS":
            return {
                auctionList: state.auctionList,
                desc: state.desc,
                column: state.column,
                filter: state.filter,
                category: state.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: state.winners
            }
        case "RECEVE_WINNERS":
            return {
                auctionList: state.auctionList,
                desc: state.desc,
                column: state.column,
                filter: state.filter,
                category: state.category,
                auctionCategoryList: state.auctionCategoryList,
                winners: action.winners
            }

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
