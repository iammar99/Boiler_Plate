import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Link to={'/dashboard/cart'}>
                Dashboard
            </Link>
        </>
    )
}
