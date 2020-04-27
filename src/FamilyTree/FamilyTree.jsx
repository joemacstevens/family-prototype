import React from "react";
import {useState,useEffect,Fragment} from "react";
import {useHttp} from "../hooks/hooks";
import FamilyMember from '../FamilyMember/FamilyMember';
import MemberEditForm from "../MemberEditForm/MemberEditForm";
import "./FamilyTree.css"

const FamilyTree = props => {

    const [isLoading, fetchedData] = useHttp('http://www.mocky.io/v2/5ea5afc5320000841eac27d2',[])  
    const [immediate, setImmediate] = useState([]);
    const [extended, setExtended] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const family = !fetchedData ? [] : fetchedData
    const immediateRelationShips = ["Spouse", "Child"];
    const toggleForm = () => setFormOpen(!formOpen);

    const displayImmediate = (family) => {
        let immediateFam = []
        let extendedFam = []

        family.map(member => {
            if(immediateRelationShips.includes(member.relationship)){
                immediateFam.push(member)
            } else {
                extendedFam.push(member)
            }
        })

        setImmediate(immediateFam)
        setExtended(extendedFam)
    }

    useEffect(() => {
        if(family.length > 0){
            displayImmediate(family)
        }
    }, [family])

    return (
        <Fragment>
            <div>
            <header>
                <h1>Family Tree</h1>
            </header>
            <section className={`grid`}>
                <nav className={`col-6`}><wf-button icon="mark-plus-sm" iconSize="lg" variant="tertiary" onClick={toggleForm}>Add Family Member</wf-button></nav>
            </section>
            <section className={`grid`}>
                <header className={`col-12 family-header`}>
                    <h4 className={`family-header-headine`}>Immediate Family</h4>
                    <hr className={`divider divider-1`}/>
                    </header>
                {immediate.map((fam,index) => {
                    return <div key={index} className={`col-3`}><FamilyMember member={fam} /></div>
                })}
            </section>
            <section className={`grid`}>
                <header className={`col-12 family-header`}>
                    <h4 className={`family-header-headine`}>Extended Family</h4>
                    <hr className={`divider divider-1`}/>
                    </header>
                
                    {extended.map((fam,index)=> {
                    return <div key={index} className={`col-3`}><FamilyMember member={fam} /></div>
                })}
            </section>
            <section className={`grid`}>
                <header className={`col-12 family-header`}>
                    <h4 className={`family-header-headine`}>Groups Supported</h4>
                    <hr className={`divider divider-1`}/>
                    </header>
            
            </section>
            <section className={`grid`}>
                <header className={`col-12 family-header`}>
                    <h4 className={`family-header-headine`}>Wills & Trusts</h4>
                    <hr className={`divider divider-1`}/>
                    </header>
            
            </section>
            </div>
            <wf-drawer position="left" opened={formOpen} header={`Add Relationship`}>
            <MemberEditForm />
            </wf-drawer>
        </Fragment>
    )
}

export default FamilyTree;