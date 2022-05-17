/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

/**
 * @fileoverview Accordion element to contain multiple subscreens
 */

function AccordionLayout({ title, children, index, activeIndex, setActiveIndex }) {
    const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index);

    return (
        <div className="w-full">
            {/* Header */}
            <div onClick={() => handleSetIndex(index)} className="flex justify-between p-2 mt-2 rounded border-t border-gray-300 cursor-pointer">
                <div className="flex">
                    <div className="text-gray-600 font-bold">{title}</div>
                </div>
                <div className="flex items-center justify-center">
                    {
                        (activeIndex === index)
                            ? <BsChevronDown className='w-4 h-auto' />
                            : <BsChevronUp className='w-4 h-auto' />
                    }
                </div>
            </div>

            {/* Content */}
            <div className={`p-4 mb-2 ${activeIndex === index ? "" : "hidden"}`}>
                {children}
            </div>
        </div>
    );
}

function Accordion(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                {props.items.map((item, idx) => (
                    <AccordionLayout
                        title={item["title"]}
                        index={idx}
                        activeIndex={activeIndex}
                        key={idx}
                        setActiveIndex={setActiveIndex}>
                        {item["content"]}
                    </AccordionLayout>
                ))}
            </div>
        </div>
    );
}

export default Accordion;