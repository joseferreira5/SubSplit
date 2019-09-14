import React from "react";
import Navbar from "../Navbar"

function Login(){
    return(
        <React.Fragment>
        <Navbar>Sub-Split!</Navbar>
        <div class="container" id="firstcon">
        <div class="d-flex justify-content-center h-100">
            <div class="card ">
                <div class="card-header">
                    <h3>Sign In</h3>
                    </div>
                        <div class="card-body">
                            <form>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="E-mail"/>
                                    
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"></span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="Password"/>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Login" class="btn login_btn" id="signinbtn"/>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div  class="d-flex justify-content-center">
                               <p>Don't have an account?</p> <a id="signup" href="#">Create accout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        
           
    )
}

export default Login