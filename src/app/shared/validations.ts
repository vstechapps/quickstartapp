import { Validation } from "../shared/models";

export const Validations:Validation[]=[
    {
        "ctrl":"companyname",
        "chcks":[
            {
                "chck":"this.companyname==null || this.companyname==''",
                "msg":"Company Name is required"
            },
            {
                "chck":"this.companyname.length<3",
                "msg":"Company Name should have min 3 characters"
            }
        ]
    },{
        "ctrl":"firstname",
        "chcks":[
            {
                "chck":"this.firstname==null || this.firstname==''",
                "msg":"First Name is required"
            },
            {
                "chck":"this.firstname.length<3",
                "msg":"First Name should have min 3 characters"
            }
        ]
    },{
        "ctrl":"lastname",
        "chcks":[
            {
                "chck":"this.lastname==null || this.lastname==''",
                "msg":"Last Name is required"
            }
        ]
    },{
        "ctrl":"industry",
        "chcks":[
            {
                "chck":"this.industry==null || this.industry==''",
                "msg":"Industry is required"
            }
        ]
    },{
        "ctrl":"address",
        "chcks":[
            {
                "chck":"this.address==null || this.address==''",
                "msg":"Address is required"
            }
        ]
    },{
        "ctrl":"country",
        "chcks":[
            {
                "chck":"this.country==null || this.country==''",
                "msg":"Country is required"
            }
        ]
    },{
        "ctrl":"state",
        "chcks":[
            {
                "chck":"this.state==null || this.state==''",
                "msg":"State is required"
            }
        ]
    },{
        "ctrl":"city",
        "chcks":[
            {
                "chck":"this.city==null || this.city==''",
                "msg":"City is required"
            }
        ]
    },{
        "ctrl":"pincode",
        "chcks":[
            {
                "chck":"this.pincode==null || this.pincode==''",
                "msg":"Pincode is required"
            }
        ]
    },{
        "ctrl":"userid",
        "chcks":[
            {
                "chck":"this.userid==null || this.userid==''",
                "msg":"User ID is required"
            },{
                "chck":"!validateEmail(this.userid)",
                "msg":"Enter valid email address"
            }
        ]
    },{
        "ctrl":"contact",
        "chcks":[
            {
                "chck":"this.contact==null || this.contact==''",
                "msg":"Contact Number is required"
            },
            {
                "chck":"this.contact.length<10",
                "msg":"Enter 10 digits contact number"
            }
        ]
    },{
        "ctrl":"password",
        "chcks":[
            {
                "chck":"this.password==null || this.password==''",
                "msg":"Password is required"
            },{
                "chck":"this.password.length<8",
                "msg":"Password should be min 8 characters"
            }
        ]
    },{
        "ctrl":"cpassword",
        "chcks":[
            {
                "chck":"this.cpassword==null || this.cpassword==''",
                "msg":"Confirm password is required"
            },{
                "chck":"this.cpassword!=this.password",
                "msg":"Confirm password does not match with password"
            }
        ]
    },{
        "ctrl":"comment",
        "chcks":[
            {
                "chck":"this.comment==null || this.comment==''",
                "msg":"Please enter your message in comment"
            }
        ]
    },{
        "ctrl":"email",
        "chcks":[
            {
                "chck":"this.email==null || this.email==''",
                "msg":"Please enter your Email ID"
            },{
                "chck":"!validateEmail(this.email)",
                "msg":"Enter valid email address"
            }
        ]
    }
];
