import React from "react";
import {useState,useEffect,Fragment} from "react";
import "./MemberEditForm.css";

const MemberEditForm = props => {
    return (
        <form className={`member-edit-form`}>
        <div className="grid">
        <div className="col-4">
        <wf-input type="text" label="First Name" value="text"></wf-input>
        </div>
        <div className="col-4">
        <wf-input type="text" label="Last Name" value="text"></wf-input>
        </div>
        <div className="col-12">
        <wf-calendar-picker label="Birthday" range="false"></wf-calendar-picker>
        </div>
        <div className="col-12">
        <wf-input type="text" label="Occupation" value="text"></wf-input>
        </div>
        <div className="col-4">
        <wf-select label="In Relation To">
        <wf-select-option name="Option 1" value="1"></wf-select-option>
        <wf-select-option name="Option 2" value="2"></wf-select-option>
        <wf-select-option name="Option 3" value="3"></wf-select-option>
        </wf-select>
        </div>
        <div className="col-4">
        <wf-select label="Ex Relationship">
        <wf-select-option name="Option 1" value="1"></wf-select-option>
        <wf-select-option name="Option 2" value="2"></wf-select-option>
        <wf-select-option name="Option 3" value="3"></wf-select-option>
        </wf-select>
        </div>

        <div className="col-4">
        <wf-select label="Family Role">
        <wf-select-option name="Option 1" value="1"></wf-select-option>
        <wf-select-option name="Option 2" value="2"></wf-select-option>
        <wf-select-option name="Option 3" value="3"></wf-select-option>
        </wf-select>
        </div>

        <div className="col-12">
        <wf-radio label="Choose one option" inline>
        <wf-radio-option label="Female" value="female"></wf-radio-option>
        <wf-radio-option label="Male" value="male"></wf-radio-option>
        <wf-radio-option label="Not Specified" value="non-specified"></wf-radio-option>
        </wf-radio>
        </div>
        <div className="col-12">
        <wf-textarea label="Description"></wf-textarea>
        </div>

        <wf-button type="submit">Submit</wf-button>
        </div>
</form>

    )
}

export default MemberEditForm;