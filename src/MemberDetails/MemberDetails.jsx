import React from "react";
import {Fragment} from "react";
import "./MemberDetails.css"
import man from '../images/icons/man-avatar-1.svg';
import woman from '../images/icons/woman-avatar-1.svg';

const MemberDetails = props => {
    const { member } = props;
    console.log(member)
    return (
        <Fragment>
            <div className={`grid member-details`}>
            <div className="col-2">
            <div className="avatar">
            <img src={(member.gender === "male") ? man : woman} alt=""/>
            </div>
            </div>
            <div className="col-7">
            <h5 className={`name`}>{member.name.first} {member.name.last}</h5>
            <span className={`title`}>{member.relationship}</span><br/>
            <span className="birthday">{member.brirthday}</span><br/>
    <span className="occupation">{member.occupation}</span>
            <div className="notes">
                <strong>Notes</strong>
                <ul>
                    {member.notes.map((note,index) => {
                        return <li key={index}>{note}</li>
                    })}
                </ul>
            </div>
            </div>
            </div>
        </Fragment>
    )
}

export default MemberDetails