type Action = {
    type: string,
    payload?: any
}

type ActionFunction<A extends Action> = {
    (payload?: A["payload"]): { type: A["type"], payload: A["payload"] },
    type: A["type"]
}

/**
 * A helper function to create 'Action creators' with strict typings.
 * @return a function that accepts payload,
 * and the function is attached the type property so that action types need not to be exported.
 *
 * Example:
 * const addToCart = createAction<AddToCart>(CartActionTypes.ADD_TO_CART)
 * Now addToCart is an action creator.
 *
 * addToCart(payload) returns action like {type: CartActionTypes.ADD_TO_CART, payload: ...}
 *
 * and addToCart can be used in reducer to get type.
 * switch (action.type) {
 *    case addToCart.type: {
 *    ...
 *    }
 *    ...
 * }
 */
export function createAction<A extends Action>(type: A["type"]): ActionFunction<A> {
    const fun = (payload) => {
        return ({type, payload});
    }
    fun.type = type
    return fun
}