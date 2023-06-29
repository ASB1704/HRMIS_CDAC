import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../../StateContext";
import { Graph } from './Graph';
import './EmployeeAnalytics.css'

export const EmployeeAnalytics = () => {
    const { curuser, setcuruser } = useGlobalContext();
    const [clickedRowIndex, setClickedRowIndex] = useState(null);

    useEffect(() => {
        getCurUser();
    }, []);
    const getCurUser = () => {
        try {
            const storedCurUser = JSON.parse(localStorage.getItem("curuser"));
            if (storedCurUser) {
                setcuruser(storedCurUser);
                console.log(curuser);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const extraDetails = (index) => {
        return (
            <div>
                <h2>All details</h2>
                <p>Total Score : {curuser.quarter[index].scoreOfEvaluation.totalScore}</p>
                <p>Total Score : {curuser.quarter[index].scoreOfEvaluation.totalScore}</p>
                <p>Total Score : {curuser.quarter[index].scoreOfEvaluation.totalScore}</p>
                <p>Total Score : {curuser.quarter[index].scoreOfEvaluation.totalScore}</p>
            </div>
        )
    }
    const handleRowClick = (index) => {
        if (clickedRowIndex === index) {
            setClickedRowIndex(null); 
        } else {
            setClickedRowIndex(index); 
        }
    };
    return (
        <div className='EmployeeAnalyticsContainer'>
            <div className='graph-up'>
                <Graph />
            </div>
            <div className='table-down'>
                {curuser && (
                    <div className="EAC">
                        <table className="EAC-table">
                            {/* ... */}
                            <thead>
                                <tr className="EAC-tr1">
                                    <th className="EAC-th">Quarter</th>
                                    <th className="EAC-th">From</th>
                                    <th className="EAC-th">To</th>
                                    <th className="EAC-th">Total Score</th>
                                    <th className="EAC-th">Remark</th>
                                    <th className="EAC-th">Final Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {curuser ? (
                                    curuser.quarter.map((user, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="EAC-tr" style={{ "curser": "pointer" }} onClick={() => handleRowClick(index)}>
                                                <td className="EAC-td">{index + 1}</td>
                                                <td className="EAC-td">{new Date(user.appraiselPeriodFrom).toLocaleDateString()}</td>
                                                <td className="EAC-td">{new Date(user.appraiselPeriodTo).toLocaleDateString()}</td>
                                                <td className="EAC-td">{user.scoreOfEvaluation.totalScore}</td>
                                                <td className="EAC-td">{user.remark}</td>
                                                <td className="EAC-td">{user.employeeFinalRemark}</td>
                                            </tr>
                                            {clickedRowIndex === index && (
                                                <tr className="EAC-extra-details-row">
                                                    <td colSpan="6">{extraDetails(index)}</td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
