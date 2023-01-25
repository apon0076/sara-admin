import currencyService from "../services/currencyService";

export const CREATE_CURRENCY_RATE = "CREATE_CURRENCY_RATE";
export const CREATE_CURRENCY_RATE_SUCCESS =
    "CREATE_CURRENCY_RATE_SUCCESS";
export const CREATE_CURRENCY_RATE_ERROR =
    "CREATE_CURRENCY_RATE_ERROR";

export const GET_CURRENCY_RATE = "GET_CURRENCY_RATE";
export const GET_CURRENCY_RATE_SUCCESS =
    "GET_CURRENCY_RATE_SUCCESS";
export const GET_CURRENCY_RATE_ERROR =
    "GET_CURRENCY_RATE_ERROR";

export function createCurrencyRateRecord(currency) {
    return async (dispatch) => {
        dispatch(createCurrencyRate());
        return await currencyService
            .createCurrencyRate(currency)
            
            .then((response) =>
                dispatch(createCurrencyRateSuccess(response.data))
            )
            .catch((error) => dispatch(createCurrencyRateError(error)));
    };
}

export function createCurrencyRate() {
    return {
        type: CREATE_CURRENCY_RATE,
    };
}

export function createCurrencyRateSuccess(success) {
    return {
        type: CREATE_CURRENCY_RATE_SUCCESS,
        payload: { success },
    };
}

export function createCurrencyRateError(error) {
    return {
        type: CREATE_CURRENCY_RATE_ERROR,
        payload: { error },
    };
}

export function getCurrencyRateRecord() {
    return async (dispatch) => {
        dispatch(getCurrencyRate());
        return await currencyService
            .getCurrencyRate()

            .then((response) =>
                dispatch(getCurrencyRateSuccess(response.data))
            )
            .catch((error) => dispatch(getCurrencyRateError(error)));
    };
}

export function getCurrencyRate() {
    return {
        type: GET_CURRENCY_RATE,
    };
}

export function getCurrencyRateSuccess(success) {
    return {
        type: GET_CURRENCY_RATE_SUCCESS,
        payload: { success },
    };
}

export function getCurrencyRateError(error) {
    return {
        type: GET_CURRENCY_RATE_ERROR,
        payload: { error },
    };
}