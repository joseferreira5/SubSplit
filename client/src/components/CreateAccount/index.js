import React from "react";

 function CreateAccount(){
    return(
    <div class="container register-form">
        <div class="form">
        <div class="form-group">
                <div class="row justify-content-center">
                    <div class="col-md"></div>
                    <div class="col-md secondcon rounded">
                            <h3 class="text-center">Please Sign up!</h3>
                    <label class="empas" for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  
                  <div class="form-group">
                    <label class="empas" for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"/>
                  </div>
                  <button type="submit" id="newuserbtn" class="btn">Submit</button>
                  </div>
                  <div class="col-md"></div>
                  </div>
                </div>
        </div>
    </div>
    )
}

export default CreateAccount