import React, { useState } from 'react';


const Table = () => {
    const data = [
        { Date: '21/4/25', Time: '11:00 AM', Subject: 'PH110' },
        { Date: '22/4/25', Time: '11:00 AM', Subject: 'MA105' },
        { Date: '26/4/25', Time: '1:00 PM', Subject: 'MM105' },
    ];

    return (
        <table>
            <thead>
                <tr>
                    <th> Date </th>
                    <th> Time </th>
                    <th> Subject </th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.date}>
                        <td> {row.Date}</td>
                        <td> {row.Time}</td>
                        <td> {row.Subject}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

const PopupExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTable, setShowTable] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const toggletable = () => {
        setShowTable(!showTable);
    }

    return (
        <div className="popup">
            <button className='popup-button' onClick={togglePopup}> Open popup</button>

            {isOpen && (
                <div className='Popup-Window'>
                    <h2>Midsem</h2>
                    <button className='Close-button' onClick={togglePopup}>Close</button>
                    <button className='show-table-button' onClick={toggletable}>
                        <Table />
                    </button>
                </div>
            )}

        </div>
    )
};

export default function Exam() {

    return (
        <div className='Exam'>
            <PopupExample />
        </div>
    )
}
<br />
