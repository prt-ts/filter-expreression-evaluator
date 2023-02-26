function debounce<F extends (...params: any[]) => void>(
    fn: F,
    delay: number
) {
    let timeoutID: number = -1;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
    } as F;
}

const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (!isNaN(date.getTime())) {
            // date is valid
            return true;
        } else {
            //Date is not valid
            return false;
        }
    } else {
        // date is not valid
        return false;
    }
};

const isValidNumber = (numberString: string): boolean => {
    return (
        numberString != null &&
        numberString !== "" &&
        !isNaN(Number(numberString?.toString()))
    );
};

export {
    debounce,
    isValidDate,
    isValidNumber
}