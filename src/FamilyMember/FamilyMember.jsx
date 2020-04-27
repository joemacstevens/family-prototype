import React from "react";
import {Fragment,useState,useEffect} from "react";
import MemberDetails from "../MemberDetails/MemberDetails";
import MemberEditForm from "../MemberEditForm/MemberEditForm";
import './FamilyMember.css'
import man from '../images/icons/man-avatar-1.svg';
import woman from '../images/icons/woman-avatar-1.svg';

const FamilyMember = props => {
    const { member } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const toggleForm = () => setFormOpen(!formOpen);

    return (
        <Fragment> 
            <wf-flyout>
            <div className={`member`} slot="trigger">
            <div className="avatar" >
            <img src={(member.gender === "male") ? man : woman} alt=""/>
            </div>
    <h6 className={`name`}>{member.name.first} {member.name.last}</h6>
    <span className={`title`}>{member.relationship}</span>
            <a ></a>
            </div>
            <MemberDetails member={member}/>
            <a onClick={toggle}>View More</a> <a onClick={toggleForm}>Edit</a>
            </wf-flyout>

            <wf-drawer position="left" opened={isOpen} header={`${member.name.first} ${member.name.last}`}>
            <div className={`family-drawer`}>
            <MemberDetails member={member}/>
            <a onClick={toggleForm}>Edit</a>
            </div>
            </wf-drawer>
            <wf-drawer position="left" opened={formOpen} header={`${member.name.first} ${member.name.last}`}>
            <MemberEditForm />
            </wf-drawer>
        </Fragment>
    )
}

export default FamilyMember