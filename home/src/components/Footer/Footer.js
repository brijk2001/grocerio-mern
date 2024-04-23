/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Footer.css'
import { Outlet, Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function Footer() {

    const copyright = String.fromCodePoint(0x00A9);
    const year = new Date().getFullYear();
    const companyName = 'Grocerio';
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className='footer'>
            <table className='footer-table'>
                <thead className='table-head'>
                    <td>GROCERIO</td>
                    <td>USEFUL LINKS</td>
                    <td>CONTACT</td>
                </thead>
                <tbody className='table-body'>
                    <tr>
                        <td rowSpan={3}>If you are looking for a convenient<br />and reliable way to get your groceries,<br />then Grocerio is the perfect solution for you.</td>
                        <td className='left-align'><Popup trigger={<a>My Account</a>} position="top center" contentStyle={{ width: '350px' }}>
                            {isAuthenticated && (
                                <span>
                                    <img src={user.picture} alt={user.name} />
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                </span>
                            )}
                        </Popup></td>
                        <td rowSpan={3}>Goa, India<br />info@grocerio.com<br />+91 98765 43210</td>
                    </tr>
                    <tr>
                        <td className='left-align'><a href="http://localhost:3001/">Client</a></td>
                    </tr>
                    <tr>
                        <td className='left-align'><Popup trigger={<a>Help</a>} position="top center" contentStyle={{ width: '350px' }}>
                            <div className='help-div'>
                                <p>Contact on <a href='tel:+919370998226' className='phone-number'>+91 9370998226</a></p>
                            </div>
                        </Popup></td>
                    </tr>
                </tbody>
                <tfoot className='table-footer'>
                    <td colSpan={3}>{`${copyright} ${year} ${companyName}`}</td>
                </tfoot>
            </table>
        </div >
    )
}