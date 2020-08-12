import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'


export default function Sidebar() {
    let {  url } = useRouteMatch();
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to={url}>Сеты</Link>
                </li>
                <li>
                   <Link to={`${url}/form`}>Добавить</Link>
                </li>
            </ul>
        </div>
    )
}

