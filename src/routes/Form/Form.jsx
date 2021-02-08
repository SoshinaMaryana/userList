import React, {memo, useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import {connect} from "react-redux";
import {getUserInfo, saveData} from "../../utils";
import {withRouter} from 'react-router-dom';

const Wrap = styled.div`
    width: 50%;
    margin: 0 auto;
`;

const Label = styled.label`
	display: block;
	margin-top: 20px;
	font-size: 18px;
	font-weight: bold;
	& input {
        box-sizing: border-box;
        height: 30px;
	}
`;
const StyledField = styled.input`
    display: block;
    width: 100%;
    height: 30px;
    max-height: 30px;
    font-size: 16px;
`;

const CheckboxField = styled.input`
    display: inline-block;
    box-sizing: border-box;
    width: 15px;
    height: 15px;
    max-height: 15px;
`;

const ErrorMessage = styled.div`
    color: red;
`;

const EditForm = connect((state) => {
    const {
        activeUser: {id}
    } = state;

    return {
        id
    };
})(withRouter(memo(({
                        id,
                        history
                    }) => {
    const [errors, setErrors] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(async () => {
        const info = !!id ? await getUserInfo(id) : {};
        await setUserInfo(info);
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        let newInfo = {...userInfo, [name]: value};
        setUserInfo(newInfo)
    };

    const handleChangeDatePicker = (date) => {
        const year = date.getFullYear(),
              month = date.getMonth(),
              day = date.getDate();
        let newInfo = {...userInfo, birth_date: year + '.' + month + '.' +day};
        setUserInfo(newInfo)
    }

    const handleValidation = () => {
        let fields = userInfo;
        let errors = {};
        let formIsValid = true;
        const names = ['first_name', 'last_name', 'birth_date', 'job', 'biography'];

        names.map((item, i) => {
            if (!fields[`${item}`]) {
                formIsValid = false;
                errors[`${item}`] = "Cannot be empty";
            }
            if (typeof fields[`${item}`] !== "undefined" ) {
                if (item !== 'birth_date') {
                    if (!fields[`${item}`].match(/^[a-zA-Z,а-яА-Я]+$/)) {
                        formIsValid = false;
                        errors[`${item}`] = "Only letters";
                    }
                    if (item ==='biography') {
                        if (fields[`${item}`].length >1024) {
                            formIsValid = false;
                            errors[`${item}`] = "Too long";
                        }
                    } else{
                        if (fields[`${item}`].length >256) {
                            formIsValid = false;
                            errors[`${item}`] = "Too long";
                        }
                    }
                }
            }

        });

        setErrors(errors);
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        if (handleValidation()) {
            saveData(id, userInfo, !id, history.goBack);
        }
    };


    return <Wrap>
        <h1>{!id ? 'Add user info' : 'Edit user info'}</h1>
        <form onSubmit={handleSubmit}>
            <Label htmlFor="first_nae">First Name
                <StyledField name="first_name" maxlength="6" type="text" placeholder={userInfo.first_name} onChange={handleChange}/>
                <ErrorMessage name="first_name">{errors["first_name"]}</ErrorMessage>
            </Label>
            <Label htmlFor="last_name">Last Name
                <StyledField name="last_name" maxlength="256"  type="text" placeholder={userInfo.last_name} onChange={handleChange}/>
                <ErrorMessage name="last_name">{errors["last_name"]}</ErrorMessage>
            </Label>
            <Label>Date of birth
                <DatePicker selected={Date.parse(userInfo.birth_date)} onChange={(date) => {
                    handleChangeDatePicker(date)
                }}/>
                <ErrorMessage name="last_name">{errors["birth_date"]}</ErrorMessage>
            </Label>
            <Label htmlFor="gender" style={{display: 'block'}}>Gender
                <StyledField as="select"
                             name="gender"
                             onChange={handleChange}>
                    <option value="male" label="male" selected/>
                    <option value="female" label="female"/>
                </StyledField>
            </Label>
            <Label htmlFor="job">Job
                <StyledField name="job" maxlength="256" type="text" placeholder={userInfo.job}
                             onChange={handleChange}/>
                <ErrorMessage name="job">{errors["job"]}</ErrorMessage>
            </Label>
            <Label htmlFor="biography">Biography
                <StyledField name="biography"  maxlength="1024" type="text" as="textarea" placeholder={userInfo.biography}
                             onChange={handleChange} style={{height: '130px'}}/>
                <ErrorMessage name="biography">{errors["biography"]}</ErrorMessage>
            </Label>
            <Label>
                <CheckboxField type="checkbox" name="is_active" onChange={handleChange}/>
                Active
            </Label>
            <button type="submit">save</button>
            <button onClick={history.goBack} style={{marginLeft: '10px'}}>go back</button>
        </form>
    </Wrap>
})));
export default EditForm;