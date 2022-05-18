import React, { useState, useEffect, useRef } from 'react'

export const isValid = (val) => {
    const regexp = /^\d{0,2}?\:?\d{0,2}$/;

    const [hoursStr, minutesStr] = val.split(':');

    if (!regexp.test(val)) {
        return false;
    }

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    const isValidHour = (hour) => Number.isInteger(hour) && hour >= 0 && hour < 24;
    const isValidMinutes = (minutes) => (Number.isInteger(minutes) && hours >= 0 && hours < 24) || Number.isNaN(minutes);

    if (!isValidHour(hours) || !isValidMinutes(minutes)) {
        return false;
    }

    if (minutes < 10 && Number(minutesStr[0]) > 5) {
        return false;
    }

    const valArr = val.indexOf(':') !== -1
        ? val.split(':')
        : [val];

    // check mm and HH
    if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
        return false;
    }

    if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
        return false;
    }

    return true;
}

const TimeInput = ({ initTime, disabled, mountFocus, onTimeChange, type, onFocusHandler, placeholder, className, name, onBlurHandler }) => {

    const [time, setTime] = useState(initTime || '');

    const _input = useRef(null)

    useEffect(() => {
        if (!disabled && mountFocus) {
            setTimeout(() => {
                _input.current.focus();
            }, 0);
        }
    });

    let lastVal = '';

    const onChangeHandler = (val) => {
        if (val == time) {
            return;
        }
        if (isValid(val)) {
            if (val.length === 2 && lastVal.length !== 3 && val.indexOf(':') === -1) {
                val = val + ':';
            }

            if (val.length === 2 && lastVal.length === 3) {
                val = val.slice(0, 1);
            }

            if (val.length > 5) {
                return false;
            }

            lastVal = val;

            setTime(val);

            if (val.length === 5) {
                onTimeChange(val);
            }
        }
    }

    const getType = () => {
        if (type) {
            return type;
        }
        return 'tel'
    }

    return (
        <input
            id={name ? name : undefined}
            name={name ? name : undefined}
            className={className}
            type={getType()}
            disabled={disabled}
            placeholder={placeholder}
            value={time}
            onChange={(e) => onChangeHandler(e.target.value)}
            onFocus={(onFocusHandler) ? (e) => onFocusHandler(e) : undefined}
            onBlur={(onBlurHandler) ? (e) => onBlurHandler(e) : undefined}
            ref={_input}
        />
    );

}

TimeInput.defaultProps = {
    placeholder: ' '
}

export default TimeInput