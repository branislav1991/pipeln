/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Component to show errors occuring with form validation
 */

function ErrorBox({ errors, icon, className, iconClassName }) {
    return (
        <div id="toast-warning" className={`${!errors.length ? "hidden" : ""} ${className} flex items-center w-full p-4 rounded-md`} role="alert">
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconClassName}`}>
                {icon}
            </div>
            <div>
                {errors.map((err, idx) => (
                    <div className="ml-4 text-sm font-normal" key={idx}>{err}</div>
                ))}
            </div>
        </div>
    );
}

export default ErrorBox;