import React from 'react'

const OrderCustomizationShow = ({ title, value, currency }) => {
    return (
        <div className="input-group p-0">
            <span className="input-group-text field-title">{title}</span>

            <p className="form-control field-value"  >
                {
                    currency === true ?
                        <span >&#8377;</span> : null
                }
                {value}

            </p>
        </div>
    )
}

export default OrderCustomizationShow