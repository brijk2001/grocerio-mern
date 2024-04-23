import React from 'react'
// import './Products.css'

export default function Products(props) {
    return (
        <div className="Card">
            <a href="https://grocerio.co.in"><img
                className="product--image"
                src={props.url}
                alt={props.alt}
            />
                <button>{props.name}</button>
            </a>
        </div>
    )
}