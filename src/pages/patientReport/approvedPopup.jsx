import style from "./popupStyle"
import { useDispatch } from 'react-redux';
import { formSlice } from '../../core/state/formSlice';
import { useState } from 'react';

export let ApprovedPopup = (props) => {
    let dispatch = useDispatch()
    let [comment,setComment] = useState("")
    async function clickHandler(){
        dispatch(formSlice.actions.addApproval({
            approval:props.approval?1:-1,
            comment:comment
        }))
        props.close();
    }
    return (
        <div style={style.mainStyle}>
            <div style={style.innerStyle}>
                <div>Please comment on the {props.approval?"approval":"disapproval"} of the report ? </div>
                <textarea style={style.inputStyle} value={comment} onChange={(event)=>{
                    setComment(event.target.value)
                }}></textarea>
                <div style={style.buttonContainer}>
                    <button onClick={clickHandler}>Submit</button>
                    <button style={{background:"red"}} onClick={(e)=>{
                        props.close()
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}